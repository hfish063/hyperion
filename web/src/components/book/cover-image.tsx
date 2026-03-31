"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

export default function CoverImage({
  coverImageUrl,
  title,
  width,
  height,
}: CoverImageProps) {
  const [error, setError] = useState(false);

  const isValidUrl = (() => {
    try {
      new URL(coverImageUrl);
      return true;
    } catch {
      return false;
    }
  })();

  const hasValidSrc = !error && isValidUrl;

  return (
    <>
      {hasValidSrc ? (
        <Image
          src={coverImageUrl}
          alt={title}
          width={width}
          height={height}
          className="object-cover rounded-xl"
          style={{ width: `${width}px`, height: `${height}px` }}
          onError={() => setError(true)}
        />
      ) : (
        <CoverImagePlaceholder width={width} height={height} />
      )}
    </>
  );
}

type CoverImageProps = {
  coverImageUrl: string;
  title: string;
  width: number;
  height: number;
};

function CoverImagePlaceholder({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div
      className="flex items-center justify-center border rounded-xl bg-muted"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <ImageOff />
    </div>
  );
}
