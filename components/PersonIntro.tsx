import {
  personLine,
  personName,
  personWorkSummary,
} from "@/lib/profile";

export function PersonIntro() {
  return (
    <div className="sr-only">
      <h1>{personName}</h1>
      <p>{personLine}</p>
      <p>{personWorkSummary}</p>
    </div>
  );
}
