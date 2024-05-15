"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/cn";
import {
  MarkdownDocumentContext,
  OverlayModalContext,
  SidebarContext,
} from "@/lib/contexts";
import { useMarkdownDocumentsStore, useOverlayModal } from "@/lib/hooks";
import OverlayDeleteModal from "@/components/OverlayDeleteModal";
import MainController from "@/components/MainController";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const markdownDocumentsStore = useMarkdownDocumentsStore();
  const overlayModalStore = useOverlayModal();

  return (
    <MarkdownDocumentContext.Provider value={markdownDocumentsStore}>
      <OverlayModalContext.Provider value={overlayModalStore}>
        <SidebarContext.Provider
          value={{
            isSidebarOpen,
            setIsSidebarOpen,
          }}
        >
          <OverlayDeleteModal />
          <div className="h-screen w-full overflow-hidden">
            <Sidebar />
            <main
              className={cn(
                "relative size-full",
                isSidebarOpen ? "left-[250px]" : "left-0",
                "transition-all",
              )}
            >
              <Header />
              <MainController />
            </main>
          </div>
        </SidebarContext.Provider>
      </OverlayModalContext.Provider>
    </MarkdownDocumentContext.Provider>
  );
}
