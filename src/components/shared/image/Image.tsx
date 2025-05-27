import NextImage, { ImageProps } from "next/image";

import imageKitLoader from "./imageKitLoader";

type Props = ImageProps & {};
//TODO: Pro nahrani obrazku pouzit file manager. M;6u pri nahrani obrazku zkontrolovat, zda je obrazek v2t3i ne6 full hd a apokud ano, tak ho o59znu na full hd a origin8l zahodim, at se mi nezasira disk. Zva6it jestli neud2lat pri nahravani vice velikosti obr8zku a ty podle velikosti okna a pokud jsem na mobilu zobrazovat
//TODO: Na gourmet můžu nahrát fotku, ale zobrazí se až po schválení. Já nechám nahrat fotky pouze přihlaseným uživatelům. Schavlovat budu i recpetpy. PO nahrani se zobrazí informace, ze se recept/fotka zobrazí po achválení "Fotografie úspěšně nahrána, čeká na schválení"
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
