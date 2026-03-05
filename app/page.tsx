import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Teal Gradient Background via Tailwind */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2197A1] via-[#1b7a82] to-[#125960] -z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent -z-10" />

        {/* Content */}
        <div className="z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md">
            Empower Your Business With ProdBiz
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl drop-shadow">
            We deliver scalable IT solutions and data-driven digital marketing
            strategies to help your business grow and thrive online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              href="/get-proposal"
              variant="primary"
              size="md"
            >
              Get Started
            </Button>
            <Button
              href="/solutions"
              variant="secondary"
              size="md"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
