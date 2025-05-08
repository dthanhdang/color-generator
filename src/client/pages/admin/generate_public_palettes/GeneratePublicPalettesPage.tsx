import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import {
  SegmentedControl,
  Button,
  Stack,
  Group,
  ActionIcon,
  Checkbox,
} from "@mantine/core"
import type { JSX } from "react"
import { useState } from "react"
import chroma, { Color } from "chroma-js"
import { getCountForHarmonyType } from "#utils/getCountForHarmonyType.ts"
import { CloudUpload, Shuffle, Trash } from "lucide-react"
import { useImportPublicPalettesMutation } from "./useImportPublicPalettesMutation.ts"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"
import { shuffleArray } from "#utils/shuffleArray.ts"
import { AdminPage } from "#components/page/AdminPage.tsx"
import { nanoid } from "nanoid"

type GeneratedPalette = {
  id: string
  colors: Color[]
}

const countData = [10, 20, 50].map((count) => ({
  label: `${count} palettes`,
  value: count.toString(),
}))

const harmonyData: { label: string; value: HarmonyType }[] = [
  { label: "Monochromatic", value: "monochromatic" },
  {
    label: "Complementary",
    value: "complementary",
  },
  { label: "Split-complementary", value: "split-complementary" },
  { label: "Triadic", value: "triadic" },
  { label: "Analogous", value: "analogous" },
  {
    label: "Tetradic",
    value: "tetradic",
  },
]

export function GeneratePublicPalettesPage(): JSX.Element {
  const [count, setCount] = useState(50)
  const [harmonyTypes, setHarmonyTypes] = useState<HarmonyType[]>(() =>
    harmonyData.map(({ value }) => value)
  )
  const [palettes, setPalettes] = useState<GeneratedPalette[]>([])
  const importPalettes = useImportPublicPalettesMutation()

  const handleDelete = (id: string): void => {
    setPalettes((palettes) => palettes.filter((palette) => palette.id !== id))
  }

  const handleGenerate = (): void => {
    if (harmonyTypes.length === 0) return

    const countByHarmonyType = Math.floor(count / harmonyTypes.length)
    const palettes: GeneratedPalette[] = []
    for (const harmonyType of harmonyTypes) {
      const generationCount =
        harmonyType === harmonyTypes[harmonyTypes.length - 1]
          ? count - palettes.length
          : countByHarmonyType
      palettes.push(
        ...new Array(generationCount).fill(null).map(() => ({
          colors: getHarmonyColor(
            chroma.random(),
            harmonyType,
            getCountForHarmonyType(harmonyType)
          ),
          id: nanoid(),
        }))
      )
    }

    setPalettes(shuffleArray(palettes))
  }

  const handleCountChange = (value: string): void => {
    setCount(Number.parseInt(value))
  }

  const handleHarmonyTypesChange = (value: string[]): void => {
    setHarmonyTypes(value as HarmonyType[])
  }

  const handleSelectAllHarmonyTypes = (): void => {
    setHarmonyTypes(harmonyData.map(({ value }) => value))
  }

  const handleClearHarmonyTypes = (): void => {
    setHarmonyTypes([])
  }

  const handleImport = (): void => {
    importPalettes.mutate(
      palettes.map(({ colors }) => stringifyChromaPalette(colors))
    )
  }

  return (
    <AdminPage>
      <Stack className="gap-5">
        <fieldset className="p-5 border radius-sm">
          <legend>Parameters</legend>
          <Stack className="flex flex-col gap-5">
            <SegmentedControl
              className="w-min"
              data={countData}
              onChange={handleCountChange}
              value={count.toString()}
            />

            <Checkbox.Group
              label="Harmony type"
              onChange={handleHarmonyTypesChange}
              value={harmonyTypes}
              withAsterisk
            >
              <Group mt="xs" className="items-center gap-5">
                {harmonyData.map((data) => (
                  <Checkbox {...data} />
                ))}

                <Button
                  className="ml-20"
                  onClick={handleSelectAllHarmonyTypes}
                  variant="transparent"
                >
                  Select all
                </Button>

                <Button onClick={handleClearHarmonyTypes} variant="transparent">
                  Clear
                </Button>
              </Group>
            </Checkbox.Group>

            <Button.Group className="ml-auto">
              <Button
                leftSection={<Shuffle />}
                onClick={handleGenerate}
                variant="secondary"
              >
                Generate
              </Button>
            </Button.Group>
          </Stack>
        </fieldset>

        <div className="grid grid-cols-4 gap-x-6 gap-y-10">
          {palettes.map((palette) => (
            <div className="h-16 flex flex-row relative group">
              {palette.colors.map((color, index) => (
                <div
                  className="grow"
                  key={index}
                  style={{ backgroundColor: color.hex() }}
                />
              ))}
              <ActionIcon
                className="absolute right-5 top-1/2 -translate-y-1/2 hidden group-hover:inline"
                onClick={() => handleDelete(palette.id)}
                variant="transparent"
              >
                <Trash />
              </ActionIcon>
            </div>
          ))}
        </div>

        {palettes.length > 0 && (
          <Button.Group className="ml-auto">
            <Button
              leftSection={<CloudUpload />}
              loading={importPalettes.isPending}
              onClick={handleImport}
            >
              Import
            </Button>
          </Button.Group>
        )}
      </Stack>
    </AdminPage>
  )
}
