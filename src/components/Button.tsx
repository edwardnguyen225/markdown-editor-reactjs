"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "ghost";
  className?: string;
}

const ColorDictionary = {
  primary:
    "bg-orange hover:bg-orange-hover active:bg-orange-hover text-neutral-100",
  ghost: "hover:bg-neutral-700 text-white",
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "primary",
  className,
  children,
}) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded px-4 py-[10px]",
        "heading-m",
        ColorDictionary[type],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
