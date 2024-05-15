"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { IconEye } from "../icons";

interface EditorProps {
  md: string;
  handleMdChange: (value: string) => void;
  onClickShowPreview: () => void;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({
  md,
  handleMdChange,
  onClickShowPreview,
  className,
}) => {
  return (
    <section
      className={cn("size-full", "relative top-14", "flex flex-col", className)}
    >
      <div
        className={cn(
          "pl-4 pr-2",
          "h-[42px] w-full",
          "flex items-center justify-between",
          "bg-neutral-200 text-neutral-500",
          "dark:bg-neutral-900 dark:text-neutral-400",
        )}
      >
        <p className="heading-s uppercase ">Markdown</p>
        <button
          onClick={onClickShowPreview}
          className={cn(
            "flex size-8 items-center justify-center",
            "rounded hover:bg-neutral-400",
            "dark:hover:bg-neutral-700",
            "md:hidden",
          )}
        >
          <IconEye />
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
          "dark:bg-neutral-1000 dark:text-neutral-400",
        )}
      />
    </section>
  );
};

export default Editor;
