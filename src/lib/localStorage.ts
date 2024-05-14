import { MarkdownDocument } from "./types";

const KEY_PREFIX = "markdown-editor";
const DOCUMENT_IDS_KEY = "documentIds";

const getLocalStorageKey = (key: string) => `${KEY_PREFIX}:${key}`;
const getLocalStorageValue = (key: string) => {
  const value = localStorage.getItem(getLocalStorageKey(key));
  return value ? JSON.parse(value) : null;
};
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(getLocalStorageKey(key), JSON.stringify(value));
};

const getDocumentIds: () => string[] = () =>
  getLocalStorageValue(DOCUMENT_IDS_KEY) || [];

export const getDocuments = () => {
  const ids = getDocumentIds();
  return ids.map((id) => {
    const doc = getLocalStorageValue(id);
    return doc as MarkdownDocument;
  });
};

export const saveDocument = (doc: MarkdownDocument) => {
  const ids = getDocumentIds();
  if (!ids.includes(doc.id)) {
    saveToLocalStorage(DOCUMENT_IDS_KEY, [...ids, doc.id]);
  }
  saveToLocalStorage(doc.id, doc);
};

export const createDocument = (doc: MarkdownDocument) => {
  saveDocument(doc);
};

export const deleteDocument = (id: string) => {
  const ids = getDocumentIds();
  const newIds = ids.filter((docId) => docId !== id);
  saveToLocalStorage(DOCUMENT_IDS_KEY, newIds);
  localStorage.removeItem(getLocalStorageKey(id));
};

export const updateDocument = (doc: MarkdownDocument) => {
  saveToLocalStorage(doc.id, doc);
};
