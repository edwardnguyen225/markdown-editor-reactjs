"use client";

import { useEffect, useState } from "react";
import { MarkdownDocument } from "@/lib/types";
import mockData from "./data.json";
import { generateUUID } from "./utils";
import {
  createDocument,
  getDocuments,
  saveDocument,
  deleteDocument as deleteDocumentFromLocalStorage,
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
    saveDocument(newDocument);
  };

  const pickDocument = (id: string) => {
    const document = markdownDocuments[id];
    if (!document) return;

    setCurrentDocument(document);
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

  const loadMarkdownDocuments = async () => {
    const documents = getDocuments();
    if (documents.length === 0) {
      documents.push(...mockData);
    }

    const newMarkdownDocuments = documents.reduce(
      (acc, doc) => {
        acc[doc.id] = doc;
        return acc;
      },
      {} as Record<string, MarkdownDocument>,
    );
    setMarkdownDocuments(newMarkdownDocuments);
    setCurrentDocument(documents[0]);
  };

  useEffect(() => {
    loadMarkdownDocuments();
  }, []);

  return {
    markdownDocuments,
    currentDocument,
    setDocumentName,
    pickDocument,
    createNewDocument,
    deleteDocument,
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
