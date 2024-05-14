"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/cn";
import { MarkdownDocumentContext, SidebarContext } from "@/lib/contexts";
import { useMarkdownDocumentsStore } from "@/lib/hooks";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const markdownDocumentsStore = useMarkdownDocumentsStore();

  return (
    <MarkdownDocumentContext.Provider value={markdownDocumentsStore}>
      <SidebarContext.Provider
        value={{
          isSidebarOpen,
          setIsSidebarOpen,
        }}
      >
        <div className="h-screen w-full overflow-hidden">
          <Sidebar />
          <main
            className={cn(
              "relative top-0 size-full",
              isSidebarOpen ? "left-[250px]" : "left-0",
              "transition-all",
            )}
          >
            <Header />
            <section className="content">
              <h1>My Page</h1>
              <p>Welcome to my page!</p>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </section>
          </main>
        </div>
      </SidebarContext.Provider>
    </MarkdownDocumentContext.Provider>
  );
}
