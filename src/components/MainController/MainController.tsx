"use client";

import React, { useContext, useEffect, useState } from "react";
import { debounce } from "lodash-es";
import Editor from "./Editor";
import Preview from "./Preview";
import { MarkdownDocumentContext } from "@/lib/contexts";
import { cn } from "@/lib/cn";

const MainController: React.FC = () => {
  const [isOnMobile, setIsOnMobile] = useState(false);
  const handleScreenResize = () => {
    setIsOnMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);
  useEffect(() => {
    if (!isOnMobile) {
      setIsShowingPreview(false);
    }
  }, [isOnMobile]);

  const [isShowingPreview, setIsShowingPreview] = useState(true);
  const { currentDocument, updateCurrentDocument } = useContext(
    MarkdownDocumentContext,
  );

  const [md, setMd] = useState<string>("");
  useEffect(() => {
    if (currentDocument) {
      setMd(currentDocument.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDocument?.id]);

  const debouncedSave = debounce(updateCurrentDocument, 5000);

  const handleMdChange = (val: string) => {
    setMd(val);
    debouncedSave(val);
  };

  return (
    <div className={cn("flex", "main-controller")}>
      <Editor
        md={md}
        handleMdChange={handleMdChange}
        onClickShowPreview={() => setIsShowingPreview(true)}
        className={
          isOnMobile
            ? cn(isShowingPreview ? "hidden" : "")
            : cn(isShowingPreview ? "hidden" : "md:w-1/2")
        }
      />
      <Preview
        md={md}
        isShowingPreview={isShowingPreview}
        togglePreview={() => setIsShowingPreview((val) => !val)}
        className={
          isOnMobile
            ? cn(!isShowingPreview ? "hidden" : "")
            : cn(isShowingPreview ? "md:w-full" : "md:w-1/2")
        }
      />
    </div>
  );
};

export default MainController;
