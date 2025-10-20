"use client";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";

const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
];

export function MultiStepLoader({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader
        loadingStates={loadingStates}
        loading={loading}
        duration={500}
        loop={false}
      />

      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
