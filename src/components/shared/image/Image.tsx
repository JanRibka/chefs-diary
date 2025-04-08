import NextImage, { ImageProps } from "next/image";

import imageKitLoader from "./imageKitLoader";

type Props = ImageProps & {};

const Image = async ({
  src,
  loading,
  sizes,
  placeholder,
  fill,
  ...restProps
}: Props) => {
  return (
    <div className="relative w-full h-full">
      <NextImage
        src={src}
        loading={loading ?? "lazy"}
        className="object-cover object-center w-full h-full"
        sizes={sizes ?? "(max-width: 900px) 100vw, 900px"}
        placeholder={placeholder ?? "blur"}
        blurDataURL={`${process.env.NEXT_PUBLIC_IMAGE_KIT_LINK}/${src}?tr=w-24,bl-30`}
        fill={fill ?? true}
        loader={imageKitLoader}
        {...restProps}
      />
    </div>
  );
};

export default Image;
