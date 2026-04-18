import CanvasScrollSequence from "@/components/CanvasScrollSequence";

export const metadata = {
  title: "iPhone 17 Pro Max | Scrollytelling Design",
  description: "A high-end scroll-linked product disassembly experience.",
};

export default function PhonePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <CanvasScrollSequence />
    </main>
  );
}
