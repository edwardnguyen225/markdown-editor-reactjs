"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface EditorProps {
  md: string;
  handleMdChange: (value: string) => void;
  onClickShowPreview: () => void;
}

const Editor: React.FC<EditorProps> = ({
  md,
  handleMdChange,
  onClickShowPreview,
}) => {
  return (
    <section className={cn("size-full", "relative top-14", "flex flex-col")}>
      <div
        className={cn(
          "pl-4 pr-2",
          "h-[42px] w-full",
          "flex items-center justify-between",
          "bg-neutral-200",
        )}
      >
        <p className="heading-s uppercase text-neutral-500">Markdown</p>
        <button
          onClick={onClickShowPreview}
          className={cn(
            "flex size-8 items-center justify-center",
            "rounded hover:bg-neutral-400",
          )}
        >
          <Image
            src="/icon-show-preview.svg"
            alt="Preview"
            width={16}
            height={11}
          />
        </button>
      </div>
      <textarea
        value={md}
        onChange={(e) => handleMdChange(e.target.value)}
        style={{
          height: "var(--editor-height)",
          minHeight: "var(--editor-height)",
        }}
        className={cn(
          "flex-1",
          "p-4",
          "resize-none",
          "outline-none",
          "border-none",
        )}
      />
    </section>
  );
};

export default Editor;
