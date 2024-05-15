"use client";

import { cn } from "@/lib/cn";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Button from "./Button";

import SidebarDocument from "./SidebarDocument";
import { MarkdownDocumentContext, SidebarContext } from "@/lib/contexts";
import { IconMoon, IconSun } from "./icons";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const { markdownDocuments, createNewDocument } = useContext(
    MarkdownDocumentContext,
  );

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleNewDocumentClick = () => {
    createNewDocument();
  };

  return (
    <aside
      className={cn(
        "flex h-screen max-h-screen flex-col",
        "w-[250px] py-7",
        "fixed h-full bg-neutral-900 text-neutral-100",
        isSidebarOpen ? "left-0" : "-left-[250px]",
        "transition-all",
      )}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
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
        <div className="mt-6 flex flex-col gap-3 overflow-y-scroll px-3">
          {Object.values(markdownDocuments).map((doc) => (
            <SidebarDocument key={doc.id} documentData={doc} />
          ))}
        </div>
      </div>

      <div className="ml-6 mt-3 shrink-0">
        <button
          className={cn(
            "h-12 text-neutral-500 hover:text-neutral-400",
            "flex items-center justify-center gap-2",
          )}
          onClick={toggleDarkMode}
        >
          <IconMoon className={cn(isDarkMode ? "fill-neutral-100" : "")} />
          <div
            className={cn(
              "h-6 w-12 px-[6px]",
              "relative",
              "flex items-center",
              "bg-neutral-600",
              "rounded-full",
            )}
          >
            <div
              className={cn(
                "transition-transform",
                "size-3 rounded-full bg-neutral-100",
                !isDarkMode ? "translate-x-6" : "",
              )}
            />
          </div>
          <IconSun className={cn(!isDarkMode ? "fill-neutral-100" : "")} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
