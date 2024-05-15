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
  const { saveIntoLocalStorage } = useContext(MarkdownDocumentContext);

  return (
    <Button onClick={saveIntoLocalStorage}>
      <Image src="/icon-save.svg" alt="Save" width={14} height={14} />
      <span className="hidden sm:inline">Save Changes</span>
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
    <header
      className={cn(
        "h-[var(--header-height)] w-full",
        "flex flex-1",
        "bg-neutral-800",
        "fixed top-0",
      )}
    >
      <button
        onClick={toggleSidebar}
        className={cn(
          "size-[var(--header-height)]",
          "flex shrink-0 items-center justify-center",
          "bg-neutral-700",
        )}
      >
        {isSidebarOpen ? (
          <Image src="/icon-close.svg" alt="Menu" width={18} height={18} />
        ) : (
          <Image src="/icon-menu.svg" alt="Menu" width={23} height={14} />
        )}
      </button>
      <div className="hidden w-[184px] flex-none items-center justify-center 2xl:flex">
        <div>
          <Image
            src="/logo.svg"
            alt="Markdown"
            width={131}
            height={18}
            className="h-auto w-[131px]"
          />
        </div>
      </div>
      <div
        className={cn(
          "size-full p-2",
          "text-neutral-100",
          "flex justify-between",
        )}
      >
        <div
          className={cn("ml-4", "flex flex-1 items-center justify-start gap-4")}
        >
          <div className="h-10 w-0 bg-neutral-600 2xl:w-[1px]" />
          <Image
            src="/icon-document.svg"
            alt="Markdown"
            width={13}
            height={16}
            className="h-4 w-auto"
          />
          <div>
            <p className="body-m mb-1 hidden text-neutral-500 md:block">
              Document Name
            </p>
            <h1 className="heading-m truncate">{currentDocument?.name}</h1>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DeleteDocumentButton />
          <SaveDocumentButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
