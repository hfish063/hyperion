"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function ExpandableText({
  text,
  maxLength,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canBeTruncated = text.length > maxLength;

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <p>
      {canBeTruncated && !isExpanded ? `${text.slice(0, maxLength)}...` : text}
      {canBeTruncated && (
        <span>
          <Button className="p-0" variant={"link"} onClick={toggleExpanded}>
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        </span>
      )}
    </p>
  );
}

type ExpandableTextProps = {
  text: string;
  maxLength: number;
};
