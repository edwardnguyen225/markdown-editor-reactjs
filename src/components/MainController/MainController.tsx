"use client";

import React, { useContext, useEffect, useState } from "react";
import { debounce } from "lodash-es";
import Editor from "./Editor";
import Preview from "./Preview";
import { MarkdownDocumentContext } from "@/lib/contexts";

const MainController: React.FC = () => {
  const [isShowingPreview, setIsShowingPreview] = useState(false);
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

  const debouncedSave = debounce(updateCurrentDocument, 1000);

  const handleMdChange = (val: string) => {
    setMd(val);
    debouncedSave(val);
  };

  return (
    <div>
      {isShowingPreview ? (
        <Preview onClickHidePreview={() => setIsShowingPreview(false)} />
      ) : (
        <Editor
          md={md}
          handleMdChange={handleMdChange}
          onClickShowPreview={() => setIsShowingPreview(true)}
        />
      )}
    </div>
  );
};

export default MainController;
