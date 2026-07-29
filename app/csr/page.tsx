import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

/** Legacy /csr → /community */
export default async function CsrRedirect({ searchParams }: Props) {
  const params = await searchParams;
  const q = new URLSearchParams();
  if (params.theme) q.set("theme", params.theme);
  if (params.category) q.set("category", params.category);
  const qs = q.toString();
  redirect(qs ? `/community?${qs}` : "/community");
}
