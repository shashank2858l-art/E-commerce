import CycleCanvasScrollSequence from "@/components/CycleCanvasScrollSequence";

export const metadata = {
  title: "Mountain Bike | Scrollytelling Design",
  description: "A high-end scroll-linked product disassembly experience.",
};

export default function CyclePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <CycleCanvasScrollSequence />
    </main>
  );
}
