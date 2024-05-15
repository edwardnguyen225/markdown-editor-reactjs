"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/cn";
import { marked } from "@/lib/marked";
import { IconEye, IconEyeSlash } from "../icons";

interface PreviewProps {
  md: string;
  togglePreview: () => void;
  className?: string;
  isShowingPreview: boolean;
}

const Preview: React.FC<PreviewProps> = ({
  md,
  togglePreview,
  className,
  isShowingPreview,
}) => {
  const rawMarkup = useMemo(
    () => ({
      __html: marked(md),
    }),
    [md],
  );

  return (
    <section
      className={cn("size-full", "relative ", "flex flex-col", className)}
    >
      <div
        className={cn(
          "pl-4 pr-2",
          "h-[var(--controller-header-height)] w-full",
          "flex items-center justify-between",
          "bg-neutral-200 text-neutral-500",
          "dark:bg-neutral-900 dark:text-neutral-400",
        )}
      >
        <p className="heading-s uppercase">Preview</p>
        <button
          onClick={togglePreview}
          className={cn(
            "flex size-8 items-center justify-center",
            "rounded hover:bg-neutral-400",
            "dark:hover:bg-neutral-700",
          )}
        >
          {isShowingPreview ? <IconEyeSlash /> : <IconEye />}
        </button>
      </div>
      <div
        className={cn("p-4", "overflow-y-scroll")}
        style={{ height: "var(--editor-height)" }}
      >
        <div
          className="preview mx-auto xl:max-w-2xl"
          dangerouslySetInnerHTML={rawMarkup}
        />
      </div>
    </section>
  );
};

export default Preview;
