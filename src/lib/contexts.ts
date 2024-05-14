import { createContext } from "react";
import type { MarkdownDocument } from "./types";
import { MarkdownDocumentsStore } from "./hooks";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen: boolean) => {},
});

interface MarkdownDocumentContextProps extends MarkdownDocument {
  setMarkdownDocument: (doc: MarkdownDocument) => void;
}

export const MarkdownDocumentContext = createContext<MarkdownDocumentsStore>({
  markdownDocuments: {},
  currentDocument: {
    id: "",
    name: "",
    content: "",
    createdAt: "",
  },
  setDocumentName: (name: string) => {},
  pickDocument: (id: string) => {},
  createNewDocument: () => {},
});
