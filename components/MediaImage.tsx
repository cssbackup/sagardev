import Image, { type ImageProps } from "next/image";
import { resolveMediaPath } from "@/lib/media";
import type { ThemeId } from "@/lib/types";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  themeId?: ThemeId;
};

export default function MediaImage({ src, themeId, alt, ...props }: Props) {
  return <Image src={resolveMediaPath(src, themeId)} alt={alt} {...props} />;
}
