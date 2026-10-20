import type { Metadata } from "next";
import { MathWarsGame } from "@/components/math-wars/MathWarsGame";

export const metadata: Metadata = {
  title: "Math Wars",
  description:
    "Roblox math arena I shipped on a new account. 10M+ views in under a week. Type a function, fire the curve, and be last standing — play on Roblox or in the browser.",
};

export default function MathWarsPage() {
  return (
    <main className="px-4 pb-10 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <MathWarsGame />
      </div>
    </main>
  );
}
