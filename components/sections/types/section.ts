/** Shared block/section primitives used by the template type system. */

import type { CSSProperties, ReactNode } from "react";

export type SectionType =
  | "topbar"
  | "header"
  | "banner"
  | "about"
  | "product"
  | "whyChooseUs"
  | "gallery"
  | "formDetail"
  | "faq"
  | "testimonial"
  | "footer"
  | string;

export type TextBlock = {
  type: "text";
  id?: string;
  content?: string;
  [key: string]: unknown;
};

export type ImageBlock = {
  type: "image";
  id?: string;
  src?: string;
  alt?: string;
  [key: string]: unknown;
};

export type VideoBlock = {
  type: "video";
  id?: string;
  src?: string;
  [key: string]: unknown;
};

export type ButtonBlock = {
  type: "button";
  id?: string;
  label?: string;
  href?: string;
  [key: string]: unknown;
};

export type SliderBlock = {
  type: "slider";
  id?: string;
  items?: unknown[];
  [key: string]: unknown;
};

export type CarouselBlock = {
  type: "carousel";
  id?: string;
  items?: unknown[];
  [key: string]: unknown;
};

export type CardBlock = {
  type: "card";
  id?: string;
  [key: string]: unknown;
};

export type ListBlock = {
  type: "list";
  id?: string;
  items?: unknown[];
  [key: string]: unknown;
};

export type MenuBlock = {
  type: "menu";
  id?: string;
  items?: unknown[];
  [key: string]: unknown;
};

export type LogoBlock = {
  type: "logo";
  id?: string;
  src?: string;
  [key: string]: unknown;
};

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | ButtonBlock
  | SliderBlock
  | CarouselBlock
  | CardBlock
  | ListBlock
  | MenuBlock
  | LogoBlock
  | {
      type: string;
      id?: string;
      [key: string]: unknown;
    };

export type BlockSection = {
  id?: string;
  type?: SectionType;
  variant?: string;
  blocks?: Block[];
  data?: Record<string, unknown>;
  [key: string]: unknown;
};

/** Layout wrapper props used by section components in the shared system. */
export type LayoutComponentProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
};
