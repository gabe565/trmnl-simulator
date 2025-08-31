export type Label = "Excellent" | "Good" | "Fair" | "Poor" | "Very Poor";

export interface Option {
  label: Label;
  value: string;
}

export const Options: Readonly<Option[]> = Object.freeze([
  { label: "Excellent", value: "-40" },
  { label: "Good", value: "-50" },
  { label: "Fair", value: "-60" },
  { label: "Poor", value: "-70" },
  { label: "Very Poor", value: "-80" },
]);
