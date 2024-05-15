"use client";
import { cn } from "@/lib/cn";
import { MarkdownDocumentContext, SidebarContext } from "@/lib/contexts";
import { MarkdownDocument } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React, { useContext } from "react";

interface SidebarDocumentProps {
  documentData: MarkdownDocument;
}

const SidebarDocument: React.FC<SidebarDocumentProps> = ({ documentData }) => {
  const { pickDocument } = useContext(MarkdownDocumentContext);
  const { setIsSidebarOpen } = useContext(SidebarContext);

  const handleDocumentClick = () => {
    pickDocument(documentData.id);
    setIsSidebarOpen(false);
  };

  return (
    <div
      role="button"
      className={cn(
        "p-3",
        "flex h-9 w-full shrink-0 items-center justify-start gap-4 overflow-hidden",
        "rounded",
        "hover:bg-neutral-600",
      )}
      onClick={handleDocumentClick}
    >
      <Image src="/icon-document.svg" alt="Document" width={20} height={20} />
      <div className="flex flex-1 flex-col gap-[3px] overflow-hidden">
        <p className="body-m text-neutral-500">
          {formatDate(documentData.createdAt)}
        </p>
        <h3 className="heading-m truncate">{documentData.name}</h3>
      </div>
    </div>
  );
};

export default SidebarDocument;
