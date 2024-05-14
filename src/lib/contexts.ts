import { createContext } from "react";
import type { MarkdownDocument } from "./types";
import { MarkdownDocumentsStore, UseOverlayModal } from "./hooks";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen: boolean) => {},
});

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
  deleteDocument: (id: string) => {},
});

export const OverlayModalContext = createContext<UseOverlayModal>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});
