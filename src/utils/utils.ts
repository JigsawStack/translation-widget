import { languages } from "../constants/languages";
function generateHashForContent(nodes: Node[]): string {
	const content = nodes
		.map((node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				const parent = node.parentElement as HTMLElement | null;
				// Use original text if available, else current text
				if (parent && parent.hasAttribute("data-original-text")) {
					return parent
						.getAttribute("data-original-text")
						?.replace(/\s+/g, " ")
						.trim();
				}
				return node.textContent
					?.replace(/\s+/g, " ")
					.trim()
					.toLocaleLowerCase();
			}
		})
		.join(" ")
		.trim();

	const hash = murmurhash3_32_gc(content.toLowerCase(), 42).toString(16);
	return hash;
}

function murmurhash3_32_gc(key: string, seed: number) {
	let remainder = key.length & 3,
		bytes = key.length - remainder;
	let h1 = seed,
		c1 = 0xcc9e2d51,
		c2 = 0x1b873593;
	let i = 0;

	while (i < bytes) {
		let k1 =
			(key.charCodeAt(i) & 0xff) |
			((key.charCodeAt(++i) & 0xff) << 8) |
			((key.charCodeAt(++i) & 0xff) << 16) |
			((key.charCodeAt(++i) & 0xff) << 24);
		++i;

		k1 =
			((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 =
			((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;

		h1 ^= k1;
		h1 = (h1 << 13) | (h1 >>> 19);
		const h1b =
			((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
		h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
	}

	let k1 = 0;

	switch (remainder) {
		//@ts-expect-error - this is a valid case
		case 3:
			k1 ^= key.charCodeAt(i + 2) << 16;
		//@ts-expect-error - this is a valid case
		case 2:
			k1 ^= key.charCodeAt(i + 1) << 8;
		case 1:
			k1 ^= key.charCodeAt(i);
			k1 =
				((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
				0xffffffff;
			k1 = (k1 << 15) | (k1 >>> 17);
			k1 =
				((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
				0xffffffff;
			h1 ^= k1;
	}

	h1 ^= key.length;
	h1 ^= h1 >>> 16;
	h1 =
		((h1 & 0xffff) * 0x85ebca6b +
			((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) &
		0xffffffff;
	h1 ^= h1 >>> 13;
	h1 =
		((h1 & 0xffff) * 0xc2b2ae35 +
			((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) &
		0xffffffff;
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}

function getVisibleTextContent(element: HTMLElement): string {
	// Get all child text nodes that are not inside .sr-only or [aria-hidden="true"]
	let text = "";
	element.childNodes.forEach((node) => {
		if (
			node.nodeType === Node.TEXT_NODE &&
			!(
				element.classList.contains("sr-only") ||
				element.getAttribute("aria-hidden") === "true"
			)
		) {
			text += node.textContent;
		}
		if (
			node.nodeType === Node.ELEMENT_NODE &&
			!(node as HTMLElement).classList.contains("sr-only") &&
			(node as HTMLElement).getAttribute("aria-hidden") !== "true"
		) {
			text += getVisibleTextContent(node as HTMLElement);
		}
	});
	return text.trim();
}

const removeEmojis = (text: string) =>
	text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");

const getUserLanguage = () => {
	const userLanguages = window.navigator.languages;
	const userLanguage = languages.find((lang) =>
		userLanguages.includes(lang.code),
	);
	return userLanguage?.code || "en";
};

export {
	generateHashForContent,
	getVisibleTextContent,
	removeEmojis,
	getUserLanguage,
};
