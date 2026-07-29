import Image, { type ImageProps } from "next/image";
import { resolveMediaPath } from "@/lib/media";
import type { ThemeId } from "@/lib/types";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  themeId?: ThemeId;
};

export default function MediaImage({
  src,
  themeId,
  alt,
  priority,
  loading,
  fetchPriority,
  ...props
}: Props) {
  const eager = Boolean(priority);

  return (
    <Image
      src={resolveMediaPath(src, themeId)}
      alt={alt}
      priority={priority}
      loading={loading ?? (eager ? "eager" : undefined)}
      fetchPriority={fetchPriority ?? (eager ? "high" : undefined)}
      {...props}
    />
  );
}
