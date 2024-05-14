"use client";

import { cn } from "@/lib/cn";
import React, { useContext } from "react";
import Image from "next/image";
import Button from "./Button";

import SidebarDocument from "./SidebarDocument";
import { MarkdownDocumentContext, SidebarContext } from "@/lib/contexts";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const { markdownDocuments, createNewDocument } = useContext(
    MarkdownDocumentContext,
  );

  const handleNewDocumentClick = () => {
    createNewDocument();
  };

  return (
    <aside
      className={cn(
        "w-[250px] py-7",
        "fixed h-full bg-neutral-900 text-neutral-100",
        isSidebarOpen ? "left-0" : "-left-[250px]",
        "transition-all",
      )}
    >
      <div className="mx-6">
        <Image src="/logo.svg" alt="Markdown" width={131} height={18} />
        <h2 className="heading-s mt-[27px] uppercase text-neutral-500">
          My document
        </h2>
        <Button onClick={handleNewDocumentClick} className="mt-[29px] w-full">
          <span>+</span>
          <span>New Document</span>
        </Button>
      </div>
      <div className="mx-3 mt-6 flex flex-col gap-5">
        {Object.values(markdownDocuments).map((doc) => (
          <SidebarDocument key={doc.id} documentData={doc} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
