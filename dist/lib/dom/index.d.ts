export declare class DOMUtils {
    /**
     * Gets all translatable text nodes from the document body
     * @returns Array of Text nodes that can be translated
     */
    static getTranslatableNodes(): Text[];
    /**
     * Creates batches of nodes for processing
     * @param nodes Array of nodes to batch
     * @param batchSize Size of each batch
     * @returns Array of node batches
     */
    static createBatches<T>(nodes: T[], batchSize: number): T[][];
    /**
     * Checks if a node is a text node that can be translated
     * @param node Node to check
     * @returns Whether the node is translatable
     */
    static isTranslatableNode(node: Node): node is Text;
    /**
     * Gets the parent element of a node, with type checking
     * @param node Node to get parent of
     * @returns Parent element or null if none exists
     */
    static getParentElement(node: Node): HTMLElement | null;
}
