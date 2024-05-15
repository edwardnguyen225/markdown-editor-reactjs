"use client";

import { useEffect, useState } from "react";
import { MarkdownDocument } from "@/lib/types";
import mockData from "./data.json";
import { generateUUID } from "./utils";
import {
  createDocument,
  getDocuments,
  saveDocument as saveDocumentIntoLocalStorage,
  deleteDocument as deleteDocumentFromLocalStorage,
  setCurrentOpenDocument,
  getPreviousOpenDocument,
} from "./localStorage";

export const useMarkdownDocumentsStore = () => {
  const [markdownDocuments, setMarkdownDocuments] = useState<
    Record<string, MarkdownDocument>
  >({});

  const [currentDocument, setCurrentDocument] = useState<MarkdownDocument>();

  const setDocumentName = (id: string, name: string) => {
    const document = markdownDocuments[id];
    if (!document) return;

    const newDocument = { ...document, name };
    setMarkdownDocuments((prev) => ({
      ...prev,
      [id]: newDocument,
    }));

    if (currentDocument?.id === id) {
      setCurrentDocument(newDocument);
    }
    saveDocumentIntoLocalStorage(newDocument);
  };

  const updateCurrentDocument = (content: string) => {
    if (!currentDocument) return;

    const newDocument = { ...currentDocument, content };
    setCurrentDocument(newDocument);
  };

  const saveIntoLocalStorage = () => {
    if (!currentDocument) return;
    saveDocumentIntoLocalStorage(currentDocument);
    setMarkdownDocuments((prev) => ({
      ...prev,
      [currentDocument.id]: currentDocument,
    }));
  };

  const pickDocument = (id: string) => {
    const document = markdownDocuments[id];
    if (!document) return;

    setCurrentDocument(document);
    setCurrentOpenDocument(id);
  };

  const createNewDocument = () => {
    const id = generateUUID();
    const newDocument: MarkdownDocument = {
      id,
      name: "untitled-document.md",
      content: "",
      createdAt: new Date().toISOString(),
    };

    setMarkdownDocuments((prev) => ({
      ...prev,
      [id]: newDocument,
    }));
    setCurrentDocument(newDocument);
    createDocument(newDocument);
  };

  const deleteDocument = (id: string) => {
    const newDocuments = { ...markdownDocuments };
    delete newDocuments[id];
    setMarkdownDocuments(newDocuments);
    deleteDocumentFromLocalStorage(id);

    let nextDocument = Object.values(newDocuments)[0];
    if (!nextDocument) {
      createNewDocument();
      return;
    }

    setCurrentDocument(nextDocument);
  };

  const loadDefaultDocuments = () => {
    const newMarkdownDocuments = mockData.reduce(
      (acc, doc) => {
        acc[doc.id] = doc;
        return acc;
      },
      {} as Record<string, MarkdownDocument>,
    );
    setMarkdownDocuments(newMarkdownDocuments);
    setCurrentDocument(mockData[0]);
    for (const doc of mockData) {
      createDocument(doc);
    }
  };

  const loadMarkdownDocuments = () => {
    const documents = getDocuments();
    if (documents.length === 0) {
      loadDefaultDocuments();
      return;
    }

    const newMarkdownDocuments = documents.reduce(
      (acc, doc) => {
        acc[doc.id] = doc;
        return acc;
      },
      {} as Record<string, MarkdownDocument>,
    );
    setMarkdownDocuments(newMarkdownDocuments);
    setCurrentDocument(getPreviousOpenDocument());
  };

  useEffect(() => {
    loadMarkdownDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    markdownDocuments,
    currentDocument,
    setDocumentName,
    pickDocument,
    createNewDocument,
    deleteDocument,
    updateCurrentDocument,
    saveIntoLocalStorage,
  };
};

export type MarkdownDocumentsStore = ReturnType<
  typeof useMarkdownDocumentsStore
>;

export const useOverlayModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export type UseOverlayModal = ReturnType<typeof useOverlayModal>;
