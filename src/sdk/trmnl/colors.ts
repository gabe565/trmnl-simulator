export type Label = "White" | "Black" | "Clear" | "Sage" | "Gray" | "Wood";

export interface Option {
  label: Label;
  color: string;
  text?: string;
}

export const Colors: Readonly<Option[]> = Object.freeze([
  { label: "White", color: "#f7f7f7" },
  { label: "Black", color: "#2a2a2a" },
  // { label: "Clear", color: "#dfdfdf" },
  { label: "Sage", color: "#b1c7a7" },
  { label: "Gray", color: "#808080", text: "#fff" },
  { label: "Wood", color: "#cbb294" },
]);
