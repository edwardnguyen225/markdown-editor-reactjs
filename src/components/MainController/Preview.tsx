"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface PreviewProps {
  onClickHidePreview: () => void;
}

const Preview: React.FC<PreviewProps> = ({ onClickHidePreview }) => {
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
        <p className="heading-s uppercase text-neutral-500">Preview</p>
        <button
          onClick={onClickHidePreview}
          className={cn(
            "flex size-8 items-center justify-center",
            "rounded hover:bg-neutral-400",
          )}
        >
          <Image
            src="/icon-hide-preview.svg"
            alt="Preview"
            width={16}
            height={11}
          />
        </button>
      </div>
      <div>Preview here</div>
    </section>
  );
};

export default Preview;
