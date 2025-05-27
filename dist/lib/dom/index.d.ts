export declare class DocumentNavigator {
    /**
     * Retrieves text nodes eligible for translation from the document
     * @returns Collection of text nodes ready for translation
     */
    static findTranslatableContent(): Text[];
    /**
     * Divides a collection into smaller groups
     * @param items Collection to divide
     * @param groupSize Maximum size of each group
     * @returns Array of item groups
     */
    static divideIntoGroups<T>(items: T[], groupSize: number): T[][];
    /**
     * Determines if a node contains translatable text
     * @param node Node to evaluate
     * @returns Whether the node contains translatable content
     */
    static containsTranslatableContent(node: Node): node is Text;
    /**
     * Retrieves the containing element of a node
     * @param node Node to find container for
     * @returns Containing element or null if none exists
     */
    static getContainer(node: Node): HTMLElement | null;
}
