import type { JSX } from "react"
import { FormOklch } from "#components/FormOklch.tsx"
import { FormHsl } from "#components/FormHsl.jsx"
import { Form } from "#components/Form.tsx"
import { Tabs } from "@mantine/core"
import type { Color } from "chroma-js"
import { twMerge } from "tailwind-merge"

type ColorEditorProps = {
  className?: string
  color: Color
  onChange: (color: Color) => void
  onChangeEnd: (color: Color) => void
  onTabChange: (tab: string) => void
  tab: string
}

export function ColorEditor({
  className,
  onTabChange,
  tab,
  ...formProps
}: ColorEditorProps): JSX.Element {
  const handleTabChange = (value: string | null): void => {
    if (value) onTabChange(value)
  }

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="hex">Hex</Tabs.Tab>
          <Tabs.Tab value="hsl">HSL</Tabs.Tab>
          <Tabs.Tab value="oklch">OKLCH</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="hex">
          <Form {...formProps} />
        </Tabs.Panel>

        <Tabs.Panel value="hsl">
          <FormHsl {...formProps} />
        </Tabs.Panel>

        <Tabs.Panel value="oklch">
          <FormOklch {...formProps} />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
