export const TABS = ["strike", "void", "vampirism"] as const;
export type Tab = (typeof TABS)[number];
