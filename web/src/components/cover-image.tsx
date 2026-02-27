import Image from "next/image";
import { ImageOff } from "lucide-react";

export default function CoverImage({
  coverImageUrl,
  title,
  width,
  height,
}: CoverImageProps) {
  const hasValidSrc = coverImageUrl && coverImageUrl.trim() !== "";

  return (
    <>
      {hasValidSrc ? (
        <Image
          src={coverImageUrl}
          alt={title}
          width={width}
          height={height}
          className="object-cover rounded"
          style={{ width: `${width}px`, height: `${height}px` }}
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
      className="flex items-center justify-center border rounded bg-muted}"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <ImageOff />
    </div>
  );
}
