// type TreeWalkerFilter = (node: Node) => number

interface NodeProcessor {
    acceptNode(node: Node): number
}

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

                const shouldSkip =
                    container.closest('script, style, code') !== null ||
                    container.closest('.translate-widget') !== null ||
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
