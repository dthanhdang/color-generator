import { Select } from "@mantine/core"
import { HarmonyType } from "../utils/colorHarmony"

type HarmonySelectorProps = {
  value: HarmonyType
  onChange: (value: HarmonyType) => void
}

export function HarmonySelector({ value, onChange }: HarmonySelectorProps) {
  const handleChange = (newValue: string | null) => {
    if (newValue) onChange(newValue as HarmonyType)
  }

  return (
    <div className="mb-4">
      <Select
        label={"Colors Harmony"}
        value={value}
        onChange={handleChange}
        data={[
          { value: "monochromatic", label: "Monochromatic" },
          { value: "complementary", label: "Complementary" },
          { value: "analogous", label: "Analogous" },
          { value: "triadic", label: "Triadic" },
          { value: "tetradic", label: "Tetradic" },
        ]}
      />
    </div>
  )
}
