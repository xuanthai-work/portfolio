"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const fallback = "/images/hero/ai-system-architecture.png";

export function SafeImage({ src, alt, ...props }: ImageProps) {
  const [imageSrc, setImageSrc] = useState(src || fallback);

  return (
    <Image
      {...props}
      alt={alt}
      onError={() => setImageSrc(fallback)}
      src={imageSrc}
    />
  );
}
