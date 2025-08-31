import { percentageToVoltage } from "@/sdk/trmnl/battery.ts";
import { ensureTrailingSlash } from "@/sdk/trmnl/utils.ts";
import { type Label as WifiLabel, Options as WifiOptions } from "@/sdk/trmnl/wifi.ts";

type HeaderKey =
  | "ID"
  | "Access-Token"
  | "Refresh-Rate"
  | "FW-Version"
  | "Battery-Voltage"
  | "RSSI"
  | "Model";

export interface DisplayParams {
  server: string;
  api_key: string;
  device_id?: string;
  intervalMs?: number;
  mirror?: boolean;
  firmware?: string;
  battery?: number;
  wifi?: WifiLabel;
  model?: string;
}

export interface DisplayResponse {
  status?: number;
  error?: string;
  refresh_rate?: number;
  next_update?: Date;
  filename?: string;
  image_url?: string;
  image_name?: string;
  update_firmware?: boolean;
  firmware_url?: string;
  reset_firmware?: boolean;
}

export const getDisplay = async (params: DisplayParams): Promise<DisplayResponse> => {
  if (!params.server) throw new Error("Server is required.");
  if (!params.device_id && !params.mirror) throw new Error("MAC Address is required.");
  if (!params.api_key) throw new Error("API Key is required.");

  let path = "api/display";
  let wantStatus = 0;
  if (params.mirror) {
    path = "api/current_screen";
    wantStatus = 200;
  }

  const headers: Partial<Record<HeaderKey, string>> = {
    "Access-Token": params.api_key,
  };

  if (params.device_id) headers["ID"] = params.device_id;
  if (params.model) headers["Model"] = params.model;
  if (params.intervalMs) headers["Refresh-Rate"] = (params.intervalMs / 1000).toFixed();
  if (params.firmware) headers["FW-Version"] = params.firmware;
  if (params.battery) headers["Battery-Voltage"] = percentageToVoltage(params.battery).toString();
  if (params.wifi) {
    const match = WifiOptions.find(({ label }) => label === params.wifi);
    if (match) {
      headers["RSSI"] = match.value;
    }
  }

  const url = new URL(path, ensureTrailingSlash(params.server));
  const res = await fetch(url, { headers });
  if (res.status !== 200) throw new Error(`Server sent an error response: ${res.status}.`);

  const json = await res.json();
  if (json.status !== wantStatus)
    throw new Error(json.error ?? `API sent an error response: ${json.status}.`);

  if (json.refresh_rate) {
    json.refresh_rate = +json.refresh_rate;
    const next = new Date();
    next.setSeconds(next.getSeconds() + json.refresh_rate);
    json.next_update = next;
  }

  return json as DisplayResponse;
};
