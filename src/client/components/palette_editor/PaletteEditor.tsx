import { Button, em, Group, Modal } from "@mantine/core"
import { ChartColumn, Expand, Redo, Shrink, Undo } from "lucide-react"
import type { JSX } from "react"
import { useEffect, useState } from "react"
import type { Color } from "chroma-js"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  DragOverlay,
} from "@dnd-kit/core"
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { nanoid } from "nanoid"
import { ColorDetails } from "#components/ColorDetails.tsx"
import { useDebouncedCallback, useMediaQuery } from "@mantine/hooks"
import type { Action } from "./Action.ts"
import { useActions } from "./Action.ts"
import { Color as ColorElement } from "./Color.tsx"
import { twMerge } from "tailwind-merge"
import { ColorEditor } from "./ColorEditor.tsx"
import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"
import { getColorName } from "#utils/getColorName.ts"
import { useMeasure } from "@uidotdev/usehooks"
import { useBottomPart } from "./useBottomPart.ts"
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers"

export type PaletteElement = {
  color: Color
  id: UniqueIdentifier
}

type PaletteEditorProps = { className?: string; palette: Color[] }

export function PaletteEditor({
  className,
  palette: initialPalette,
}: PaletteEditorProps): JSX.Element {
  const [palette, setPalette] = useState(
    initialPalette.map((color) => ({ color, id: nanoid() as UniqueIdentifier }))
  )
  useEffect(() => {
    setPalette(
      initialPalette.map((color) => ({
        color,
        id: nanoid() as UniqueIdentifier,
      }))
    )
  }, [initialPalette])
  const { actions, actionIndex, addAction, redo, undo } =
    useActions(initialPalette)
  const [draggedColor, setDraggedColor] = useState<PaletteElement>()
  const [fullScreen, setFullScreen] = useState(false)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [ref, rect] = useMeasure()
  const [colorModeTab, setColorModeTab] = useState("hex")
  const {
    adjustIndex,
    bottomPart,
    getIndexAction,
    onEdit: handleEdit,
    onSelect: handleSelect,
    onTogglePaletteVisualizer: handleTogglePaletteVisualizer,
  } = useBottomPart()
  const matches = useMediaQuery(`(min-width: ${em(768)})`)

  const applyAction = (action: Action): PaletteElement[] => {
    const newPalette = addAction(action, palette)
    setPalette(newPalette)
    return newPalette
  }

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event

    const color = palette.find((item) => item.id === active.id)
    if (color) setDraggedColor(color)
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    if (over !== null && active.id !== over.id) {
      const oldIndex = palette.findIndex((item) => item.id === active.id)
      const newIndex = palette.findIndex((item) => item.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newPalette = applyAction({
          type: "swap",
          fromIndex: oldIndex,
          toIndex: newIndex,
        })

        adjustIndex(palette, newPalette)
      }
    }

    setDraggedColor(undefined)
  }

  const handleDelete = (index: number): void => {
    const newPalette = applyAction({ type: "delete", index })

    adjustIndex(palette, newPalette)
  }

  const handleDuplicate = (index: number): void => {
    const newPalette = applyAction({ type: "duplicate", index })

    adjustIndex(palette, newPalette)
  }

  const handleChangeEnd = (color: Color): void => {
    if (bottomPart?.type === "color_editor")
      applyAction({
        type: "modify",
        index: bottomPart.index,
        color: color,
      })
  }

  const handleChange = useDebouncedCallback(
    (color: Color): void => {
      if (bottomPart?.type === "color_editor")
        setPalette((palette) =>
          palette.toSpliced(bottomPart.index, 1, {
            color,
            id: nanoid(),
          })
        )
    },
    { delay: 10 }
  )

  const handleUndo = (): void => {
    const newPalette = undo()
    setPalette(newPalette)

    adjustIndex(palette, newPalette)
  }

  const handleRedo = (): void => {
    setPalette((palette) => {
      const newPalette = redo(palette)

      adjustIndex(palette, newPalette)

      return newPalette
    })
  }

  const layout = matches && palette.length <= 7 ? "horizontal" : "vertical"

  const children = (
    <DndContext
      modifiers={
        layout === "horizontal"
          ? [restrictToHorizontalAxis]
          : [restrictToVerticalAxis]
      }
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className={twMerge("flex flex-col", className)}>
        <Group className="mb-2 flex-wrap items-center">
          <Button.Group>
            <Button
              disabled={actionIndex === 0}
              leftSection={<Undo />}
              onClick={handleUndo}
              variant="outline"
            >
              Undo
            </Button>

            <Button
              disabled={actionIndex === actions.length - 1}
              leftSection={<Redo />}
              onClick={handleRedo}
              variant="outline"
            >
              Redo
            </Button>
          </Button.Group>

          <Button.Group className="lg:ml-auto">
            <Button
              className="ml-auto"
              leftSection={<ChartColumn />}
              onClick={handleTogglePaletteVisualizer}
              variant="outline"
            >
              {bottomPart?.type === "palette_visualizer"
                ? "Hide preview"
                : "Show preview"}
            </Button>

            <Button
              leftSection={fullScreen ? <Shrink /> : <Expand />}
              onClick={() => setFullScreen(!fullScreen)}
              variant="outline"
            >
              {fullScreen ? "Minimize" : "Maximize"}
            </Button>
          </Button.Group>
        </Group>

        <SortableContext
          items={palette}
          strategy={
            layout === "horizontal"
              ? horizontalListSortingStrategy
              : verticalListSortingStrategy
          }
        >
          <div
            className={twMerge(
              "flex mb-auto min-h-[40vh]",
              layout === "horizontal" ? "flex-row flex-wrap" : "flex-col"
            )}
            ref={ref}
          >
            {palette.map((color, index) => (
              <ColorElement
                action={getIndexAction(index)}
                color={color.color}
                id={color.id}
                key={color.id}
                onDelete={
                  palette.length <= 1 ? undefined : () => handleDelete(index)
                }
                onDuplicate={
                  palette.length <= 6 ? () => handleDuplicate(index) : undefined
                }
                onEdit={() => handleEdit(index)}
                onSelect={() => handleSelect(index)}
                parentLayout={layout}
              />
            ))}

            <DragOverlay>
              {draggedColor ? (
                <ColorElement
                  color={draggedColor.color}
                  id={draggedColor.id}
                  isOverlay={true}
                  parentHeight={rect.height ?? undefined}
                  parentLayout={layout}
                />
              ) : null}
            </DragOverlay>
          </div>

          {bottomPart?.type === "color_details" && (
            <ColorDetails
              className="mt-4 mb-auto grow"
              color={palette[bottomPart.index].color}
            />
          )}

          {bottomPart?.type === "palette_visualizer" && (
            <PaletteVisualizer
              palette={palette.map(({ color, id }, index) => ({
                color,
                id: id as string,
                weight: index * 50,
                name: getColorName(color)?.name ?? color.hex(),
              }))}
            />
          )}

          {bottomPart?.type === "color_editor" && (
            <ColorEditor
              className="mt-4 mb-auto grow"
              color={palette[bottomPart.index].color}
              onChange={handleChange}
              onChangeEnd={handleChangeEnd}
              onTabChange={setColorModeTab}
              tab={colorModeTab}
            />
          )}
        </SortableContext>
      </div>
    </DndContext>
  )

  return fullScreen ? (
    <Modal
      classNames={{ body: "flex flex-col h-lvh" }}
      fullScreen={true}
      opened={true}
      onClose={() => setFullScreen(false)}
      withCloseButton={false}
    >
      {children}
    </Modal>
  ) : (
    children
  )
}
