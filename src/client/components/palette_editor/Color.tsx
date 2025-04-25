import { getColorName } from "#utils/getColorName.ts"
import { UnstyledButton } from "@mantine/core"
import { CirclePlus, Edit, Grip, Info, Trash } from "lucide-react"
import type { JSX } from "react"
import chroma from "chroma-js"
import type { Color } from "chroma-js"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { getContrastingColor } from "#utils/getContrastingColor.ts"
import clsx from "clsx"
import { ColorIcon } from "./ColorIcon.tsx"

type ColorProps = {
  action?: "color_editor" | "color_details"
  color: Color
  id: UniqueIdentifier
  isOverlay?: boolean
  onDelete?: () => void
  onDuplicate?: () => void
  onEdit?: () => void
  onSelect?: () => void
  parentHeight?: number
  parentLayout: "horizontal" | "vertical"
}

export function Color({
  action,
  color,
  id,
  isOverlay,
  onDelete: handleDelete,
  onDuplicate: handleDuplicate,
  onEdit: handleEdit,
  onSelect: handleSelect,
  parentHeight,
  parentLayout,
}: ColorProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const textColor = getContrastingColor(color)

  return (
    <div
      {...attributes}
      className={clsx(
        "grow flex flex-col justify-end gap-3 stroke-[current] relative gap-3 overflow-hidden",
        parentLayout === "horizontal" ? "basis-0 p-2" : "p-4"
      )}
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: isOverlay ? `${color.hex()}D0` : color.hex(),
        color: textColor,
        height: parentLayout === "horizontal" ? parentHeight : undefined,
      }}
    >
      <UnstyledButton
        {...listeners}
        className="cursor-pointer absolute -right-10 -top-10 rounded-full size-20 flex flex-col"
        style={{ backgroundColor: textColor }}
      >
        <Grip
          className="ml-3 mb-3 mt-auto mr-auto size-6"
          color={getContrastingColor(color, { revert: true })}
        />
      </UnstyledButton>

      <div className="flex flex-row justify-center my-auto gap-x-2">
        <ColorIcon
          tooltip="Duplicate"
          onClick={handleDuplicate}
          Icon={CirclePlus}
        />

        <ColorIcon tooltip="Delete" onClick={handleDelete} Icon={Trash} />

        <ColorIcon
          active={action === "color_editor"}
          tooltip="Edit"
          onClick={handleEdit}
          Icon={Edit}
        />

        <ColorIcon
          active={action === "color_details"}
          tooltip="Details"
          onClick={handleSelect}
          Icon={Info}
        />
      </div>

      <p className="text-center bold uppercase">{chroma(color).hex()}</p>

      <p className="text-center">
        {getColorName(chroma(color))?.name ?? color.hex()}
      </p>
    </div>
  )
}
