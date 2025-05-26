// type TreeWalkerFilter = (node: Node) => number

interface NodeFilterCallback {
    acceptNode(node: Node): number
}

export class DOMUtils {
    /**
     * Gets all translatable text nodes from the document body
     * @returns Array of Text nodes that can be translated
     */
    static getTranslatableNodes(): Text[] {
        const filter: NodeFilterCallback = {
            acceptNode(node: Node): number {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return NodeFilter.FILTER_REJECT
                }

                const parent = (node as Text).parentElement
                if (!parent) {
                    return NodeFilter.FILTER_REJECT
                }

                const isExcluded =
                    parent.tagName === 'SCRIPT' ||
                    parent.tagName === 'STYLE' ||
                    parent.tagName === 'CODE' ||
                    parent.closest('.translate-widget') !== null ||
                    parent.closest('.notranslate') !== null ||
                    !node.textContent?.trim()

                return isExcluded
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT
            },
        }

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            filter
        )

        const nodes: Text[] = []
        let node: Node | null

        while ((node = walker.nextNode())) {
            if (node.nodeType === Node.TEXT_NODE) {
                nodes.push(node as Text)
            }
        }

        return nodes
    }

    /**
     * Creates batches of nodes for processing
     * @param nodes Array of nodes to batch
     * @param batchSize Size of each batch
     * @returns Array of node batches
     */
    static createBatches<T>(nodes: T[], batchSize: number): T[][] {
        const batches: T[][] = []

        for (let i = 0; i < nodes.length; i += batchSize) {
            batches.push(nodes.slice(i, i + batchSize))
        }

        return batches
    }

    /**
     * Checks if a node is a text node that can be translated
     * @param node Node to check
     * @returns Whether the node is translatable
     */
    static isTranslatableNode(node: Node): node is Text {
        if (node.nodeType !== Node.TEXT_NODE) {
            return false
        }

        const parent = node.parentElement
        if (!parent) {
            return false
        }

        return !(
            parent.tagName === 'SCRIPT' ||
            parent.tagName === 'STYLE' ||
            parent.tagName === 'CODE' ||
            parent.closest('.translate-widget') ||
            parent.closest('.notranslate') ||
            !node.textContent?.trim()
        )
    }

    /**
     * Gets the parent element of a node, with type checking
     * @param node Node to get parent of
     * @returns Parent element or null if none exists
     */
    static getParentElement(node: Node): HTMLElement | null {
        return node.parentElement
    }
}