import { ensureTrailingSlash } from "@/sdk/trmnl/utils.ts";

export interface SetupParams {
  server: string;
  mac: string;
}

export interface SetupResponse {
  status?: number;
  api_key?: string;
  image_url?: string;
  message?: string;
  friendly_id?: string;
}

export const getSetup = async (params: SetupParams): Promise<SetupResponse> => {
  if (!params.server) throw new Error("Server is required.");
  if (!params.mac) throw new Error("MAC Address is required.");

  console.log("Setting up device");
  const url = new URL("api/setup", ensureTrailingSlash(params.server));
  const res = await fetch(url, {
    headers: { ID: params.mac },
  });

  if (res.status !== 200) throw new Error(`Server sent an error response: ${res.status}.`);

  const json = await res.json();
  if (json.status !== 200)
    throw new Error(json.message ?? `API send an error response: ${json["status"]}.`);

  return json as SetupResponse;
};
