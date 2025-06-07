declare function generateHashForContent(nodes: Node[]): string;
declare function getVisibleTextContent(element: HTMLElement): string;
declare const removeEmojis: (text: string) => string;
declare const getUserLanguage: () => string;
export { generateHashForContent, getVisibleTextContent, removeEmojis, getUserLanguage, };
