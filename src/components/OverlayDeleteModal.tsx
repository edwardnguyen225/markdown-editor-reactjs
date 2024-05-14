import { cn } from "@/lib/cn";
import { MarkdownDocumentContext, OverlayModalContext } from "@/lib/contexts";
import React, { useContext } from "react";
import Button from "./Button";

const OverlayDeleteModal = () => {
  const { isOpen, closeModal } = useContext(OverlayModalContext);
  const { currentDocument, deleteDocument } = useContext(
    MarkdownDocumentContext,
  );

  if (!isOpen || !currentDocument) return null;

  return (
    <div
      className={cn(
        "bg-neutral-1000/50 fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center",
      )}
      onClick={closeModal}
    >
      <div
        className={cn(
          "mx-4",
          "rounded-lg bg-neutral-100 p-6",
          "flex flex-col gap-4",
        )}
      >
        <h1 className="preview-h4">Delete this document?</h1>
        <p className="preview-p text-neutral-500">
          Are you sure you want to delete the ‘{currentDocument.name}’ document
          and its contents? This action cannot be reversed.
        </p>
        <Button onClick={() => deleteDocument(currentDocument.id)}>
          Confirm & Delete
        </Button>
      </div>
    </div>
  );
};

export default OverlayDeleteModal;
