import ChairCanvasScrollSequence from "@/components/ChairCanvasScrollSequence";

export const metadata = {
  title: "Pro Gaming Chair | Scrollytelling Design",
  description: "A high-end scroll-linked ergonomic chair disassembly experience.",
};

export default function ChairPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <ChairCanvasScrollSequence />
    </main>
  );
}
