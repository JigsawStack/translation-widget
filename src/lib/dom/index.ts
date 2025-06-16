interface NodeProcessor {
  acceptNode(node: Node): number;
}

import { removeEmojis } from "../../utils/utils";

export type TranslatableContent = {
  element: HTMLElement;
  text: string;
}[];
export class DocumentNavigator {
  /**
   * Retrieves text nodes eligible for translation from the document
   * @returns Collection of text nodes ready for translation
   */
  static findTranslatableContent(): TranslatableContent {
    if (typeof window === "undefined") return [];

    const validator: NodeProcessor = {
      acceptNode(node: Node): number {
        if (node.nodeType !== Node.TEXT_NODE) return NodeFilter.FILTER_REJECT;

        const container = (node as Text).parentElement;
        if (!container) return NodeFilter.FILTER_REJECT;

        if (container.closest('[aria-hidden="true"]')) return NodeFilter.FILTER_REJECT;
        if (container.classList.contains("sr-only")) return NodeFilter.FILTER_REJECT;

        const shouldSkip =
          container.closest(
            "script, style, code, noscript, next-route-announcer, .jigts-translation-widget, .jigts-widget-trigger, .jigts-widget-dropdown, .notranslate"
          ) !== null || !node.textContent?.trim();

        return shouldSkip ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    };

    const navigator = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, validator);
    const groupedText = new Map<HTMLElement, Text[]>();

    let currentNode: Node | null;
    while ((currentNode = navigator.nextNode())) {
      const parentElement = (currentNode as Text).parentElement;
      if (!parentElement) continue;

      if (!groupedText.has(parentElement)) {
        groupedText.set(parentElement, []);
      }
      groupedText.get(parentElement)!.push(currentNode as Text);
    }

    const results: { element: HTMLElement; text: string }[] = [];

    for (const [element, textNodes] of groupedText.entries()) {
      let combinedText = "";

      for (const node of textNodes) {
        let text = node.textContent?.trim() || "";
        const originalText = element.getAttribute("data-original-text");
        if (originalText) text = originalText;

        const textWithoutEmojis = removeEmojis(text);
        if (text.length === 0 || text.length === 1 || textWithoutEmojis.length === 0) continue;

        combinedText += (combinedText ? " " : "") + text;
      }

      if (combinedText.length > 0) {
        results.push({ element, text: combinedText });
      }
    }

    return results;
  }

  /**
   * Divides a collection into smaller groups
   * @param items Collection to divide
   * @param groupSize Maximum size of each group
   * @returns Array of item groups
   */
  static divideIntoGroups<T>(items: T[], groupSize: number): T[][] {
    const groups: T[][] = [];

    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }

    return groups;
  }
}
