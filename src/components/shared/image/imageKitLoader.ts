"use client";

type ImageKitLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const imageKitLoader = ({ src, width, quality }: ImageKitLoaderProps) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }

  const paramsString = params.join(",");
  let urlEndpoint = process.env.NEXT_PUBLIC_IMAGE_KIT_LINK as string;

  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

export default imageKitLoader;
