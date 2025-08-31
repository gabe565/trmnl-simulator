export interface Model {
  name: string;
  label: string;
  description: string;
  width: number;
  height: number;
  colors: number;
  bit_depth: number;
  scale_factor: number;
  rotation: number;
  mime_type: string;
  offset_x: number;
  offset_y: number;
  published_at: string; // ISO 8601 datetime string
}

export const getModels = async (): Promise<Model[]> => {
  const res = await fetch("https://usetrmnl.com/api/models");
  if (res.status !== 200) throw new Error(`Server sent an error response: ${res.status}.`);

  const json = await res.json();
  if (!json.data) throw new Error("Response did not include data.");

  return json.data as Model[];
};
