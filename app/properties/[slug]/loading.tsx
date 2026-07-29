export default function Loading() {
  return (
    <div className="min-h-[50vh] bg-white px-4 py-16 md:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-3 w-40 rounded bg-[#141414]/10" />
        <div className="mt-6 aspect-[16/9] rounded-2xl bg-[#f3efe8]" />
        <div className="mt-8 max-w-3xl space-y-3">
          <div className="h-3 w-28 rounded bg-[#c44536]/20" />
          <div className="h-8 w-3/4 rounded bg-[#141414]/10" />
          <div className="h-4 w-full rounded bg-[#141414]/8" />
          <div className="h-4 w-5/6 rounded bg-[#141414]/8" />
        </div>
      </div>
    </div>
  );
}
