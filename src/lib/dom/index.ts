// type TreeWalkerFilter = (node: Node) => number

interface NodeProcessor {
    acceptNode(node: Node): number
}

import { removeEmojis } from '../../utils/utils'

export class DocumentNavigator {
    /**
     * Retrieves text nodes eligible for translation from the document
     * @returns Collection of text nodes ready for translation
     */
    static findTranslatableContent(): Text[] {
        const validator: NodeProcessor = {
            acceptNode(node: Node): number {
                if (node.nodeType !== Node.TEXT_NODE) {
                    // Log non-text nodes
                    return NodeFilter.FILTER_REJECT
                }

                const container = (node as Text).parentElement
                if (!container) {
                    return NodeFilter.FILTER_REJECT
                }

                // Skip if any ancestor has aria-hidden="true"
                if (container.closest('[aria-hidden="true"]')) {
                    return NodeFilter.FILTER_REJECT
                }

                // // check if the classname is sr-only
                if (container.classList.contains('sr-only')) {
                    return NodeFilter.FILTER_REJECT
                }


                const shouldSkip =
                    container.closest('script, style, code') !== null ||
                    container.closest('next-route-announcer') !== null ||
                    container.closest('.jigts-translation-widget') !== null ||
                    container.closest('.jigts-widget-trigger') !== null ||
                    container.closest('.jigts-widget-dropdown') !== null ||
                    container.closest('.notranslate') !== null ||
                    !node.textContent?.trim()
                return shouldSkip
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT
            }
        }

        const navigator = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            validator
        )

        const results: Text[] = []
        let currentNode: Node | null

        while ((currentNode = navigator.nextNode())) {
            if (currentNode.nodeType === Node.TEXT_NODE) {
                const text = currentNode.textContent?.trim() || ''
                /**
                 * Skip the content if 
                 * 1. the content if empty 
                 * 2. the content is only one character in length 
                 * 3. the content is only an emoji
                 */
                const textWithoutEmojis = removeEmojis(text)
                if (
                    text.length === 0 ||
                    text.length === 1 ||
                    textWithoutEmojis.length === 0
                ) {
                    continue
                }
                results.push(currentNode as Text)
            }
        }

        return results
    }

    /**
     * Divides a collection into smaller groups
     * @param items Collection to divide
     * @param groupSize Maximum size of each group
     * @returns Array of item groups
     */
    static divideIntoGroups<T>(items: T[], groupSize: number): T[][] {
        const groups: T[][] = []

        for (let i = 0; i < items.length; i += groupSize) {
            groups.push(items.slice(i, i + groupSize))
        }

        return groups
    }

    /**
     * Determines if a node contains translatable text
     * @param node Node to evaluate
     * @returns Whether the node contains translatable content
     */
    static containsTranslatableContent(node: Node): node is Text {
        if (node.nodeType !== Node.TEXT_NODE) {
            return false
        }

        const container = node.parentElement
        if (!container) {
            return false
        }
        return !(
            container.tagName === 'SCRIPT' ||
            container.tagName === 'STYLE' ||
            container.tagName === 'CODE' ||
            container.tagName === 'next-route-announcer' ||
            container.closest('.translate-widget') ||
            container.closest('.notranslate') ||
            !node.textContent?.trim()
        )
    }

    /**
     * Retrieves the containing element of a node
     * @param node Node to find container for
     * @returns Containing element or null if none exists
     */
    static getContainer(node: Node): HTMLElement | null {
        return node.parentElement
    }
}
