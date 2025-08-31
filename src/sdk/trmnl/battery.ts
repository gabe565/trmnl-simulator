export const MinBatteryVoltage = 3.0;
export const MaxBatteryVoltage = 4.08;

export const percentageToVoltage = (percentage: number): number => {
  // Clamp obvious edge cases
  if (percentage >= 100) return MaxBatteryVoltage; // defined "full charge"
  if (percentage >= 95) return 4.06; // midpoint of 85..88% block
  if (percentage >= 90) return 4.02; // midpoint of 83..85% block
  if (percentage <= 1) return MinBatteryVoltage; // defined "empty"

  // Linear band: 1–83%
  // Ruby: pct = (V - 3.0) / 0.012  =>  V = 3.0 + pct * 0.012
  if (percentage > 1 && percentage <= 83) {
    return MinBatteryVoltage + percentage * 0.012;
  }

  // Fallback (shouldn’t really hit)
  return MinBatteryVoltage;
};
