"use client";

import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <main>
      <Button onClick={handleClick}>
        <Image
          src="/icon-save.svg"
          alt="Save Icon"
          className="dark:invert"
          width={16}
          height={16}
        />
        Save changes
      </Button>
    </main>
  );
}
