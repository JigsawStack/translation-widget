interface NodeProcessor {
  acceptNode(node: Node): number;
}

import { removeEmojis } from "../../utils/utils";

export type TranslatableContent = {
  element: HTMLElement;
  text: string;
  isNested: boolean;
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
    
        const skipBySelector = container.closest(
          "script, style, code, noscript, next-route-announcer, \
           .jigts-translation-widget, .jigts-widget-trigger, \
           .jigts-widget-dropdown, .notranslate"
        );
        if (skipBySelector) return NodeFilter.FILTER_REJECT;
    
        // ✅ If the text is inside a clean wrapper like <span> → allow
        const isInSpanWrapper =
          container.tagName === "SPAN" &&
          Array.from(container.childNodes).every((n) => n.nodeType === Node.TEXT_NODE);
    
        const interactiveAncestor = container.closest(
          "button, input, select, textarea, [role='button'], [role='link']"
        ) as HTMLElement | null;
    
        if (interactiveAncestor && !isInSpanWrapper) {
          const isTextSiblingToElement = Array.from(container.childNodes).some(
            (n) =>
              n.nodeType === Node.ELEMENT_NODE &&
              node.parentNode === container // sibling to another element in same container
          );
    
          const isDirectChildOfInteractive =
            interactiveAncestor === container;
    
          if (isTextSiblingToElement && isDirectChildOfInteractive) {
            // ⚠️ Text node is a sibling to other element nodes inside the button — unsafe
            return NodeFilter.FILTER_REJECT;
          }
        }
    
        if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
    
        return NodeFilter.FILTER_ACCEPT;
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

    const results: TranslatableContent = [];

    // so for the elemnt for which the isNested is true, can we like copy the whole html strucuture down to its last child >
    let isNested = false;
    const processedNestedElements = new Set<HTMLElement>();

    for (const [element, textNodes] of groupedText.entries()) {
      isNested = false; // Reset flag for each element
      let combinedText = "";

      // Skip if this element is a descendant of a nested element that was already processed
      let isDescendantOfNested = false;
      for (const nestedElement of processedNestedElements) {
        if (nestedElement.contains(element)) {
          isDescendantOfNested = true;
          break;
        }
      }

      if (isDescendantOfNested) continue;

      const childNodes = Array.from(element.childNodes);
      const hasText = childNodes.some(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
      );
      const hasInteractiveElements = childNodes.some(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE &&
          ["BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(
            (n as HTMLElement).tagName
          )
      );

      const isTextMixedWithInteractivity = hasText && hasInteractiveElements;

      console.log("isTextMixedWithInteractivity", isTextMixedWithInteractivity)

      if (isTextMixedWithInteractivity) {
          continue;
      }

      for (const node of textNodes) {
        let text = node.textContent?.trim() || "";
        const originalText = element.getAttribute("data-original-text");
        if (originalText) text = originalText;

        const textWithoutEmojis = removeEmojis(text);
        if (text.length === 0 || text.length === 1 || textWithoutEmojis.length === 0) continue;

        combinedText += (combinedText ? " " : "") + text;

        // if(isTextMixedWithInteractivity) {
        //   continue;
        // }
        const hasMixedContent = Array.from(element.childNodes).some(
          (child) => child.nodeType !== Node.TEXT_NODE
        );


        if (hasMixedContent) {
          isNested = true;
        }
        // if (element.children.length > 0) {
        //   isNested = true;
        // }
      }

      if (combinedText.length > 0) {
        // If element is nested, include the full HTML structure
        if (isNested) {
          const fullHtml = element.outerHTML;
          results.push({ element, text: fullHtml, isNested });
          processedNestedElements.add(element);
        } else {
          results.push({ element, text: combinedText, isNested });
        }
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
