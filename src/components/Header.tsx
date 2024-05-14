"use client";

import { cn } from "@/lib/cn";
import {
  MarkdownDocumentContext,
  OverlayModalContext,
  SidebarContext,
} from "@/lib/contexts";
import Image from "next/image";
import React, { useContext } from "react";
import Button from "./Button";

interface HeaderProps {}

const DeleteDocumentButton: React.FC = () => {
  const { openModal } = useContext(OverlayModalContext);

  const handleClick = () => {
    openModal();
  };

  return (
    <Button onClick={handleClick} type="ghost">
      <Image src="/icon-delete.svg" alt="Delete" width={14} height={14} />
    </Button>
  );
};

const SaveDocumentButton: React.FC = () => {
  const { saveCurrentDocument } = useContext(MarkdownDocumentContext);

  return (
    <Button onClick={saveCurrentDocument}>
      <Image src="/icon-save.svg" alt="Save" width={14} height={14} />
    </Button>
  );
};

const Header: React.FC<HeaderProps> = ({}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const { currentDocument } = useContext(MarkdownDocumentContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={cn("h-14", "flex", "bg-neutral-800")}>
      <button
        onClick={toggleSidebar}
        className={cn(
          "h-full w-14",
          "flex items-center justify-center",
          "bg-neutral-700",
        )}
      >
        {isSidebarOpen ? (
          <Image src="/icon-close.svg" alt="Menu" width={18} height={18} />
        ) : (
          <Image src="/icon-menu.svg" alt="Menu" width={23} height={14} />
        )}
      </button>
      <div
        className={cn(
          "size-full p-2",
          "text-neutral-100",
          "flex justify-between",
        )}
      >
        <div className={cn("ml-4", "flex items-center justify-center gap-4")}>
          <Image
            src="/icon-document.svg"
            alt="Markdown"
            width={13}
            height={16}
            className="h-4 w-auto"
          />
          <h1 className="heading-m truncate">{currentDocument?.name}</h1>
        </div>
        <div className="flex shrink-0 gap-2">
          <DeleteDocumentButton />
          <SaveDocumentButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
