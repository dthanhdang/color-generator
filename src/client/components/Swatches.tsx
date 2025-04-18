import type { JSX } from "react"
import { ColorPaletteItem } from "./PaletteVisualizer.jsx"
import { Flex, Menu, Text, useMantineTheme } from "@mantine/core"
import clsx from "clsx"

const allRoles = ["primary", "secondary", "tertiary"] as const
export type Role = (typeof allRoles)[number]
export type Roles = Record<Role, ColorPaletteItem>

const roleLabel = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
}

type SwatchesProps = {
  onRolesChange: (roles: Roles) => void
  palette: ColorPaletteItem[]
  roles: Roles
}

export function Swatches({
  onRolesChange,
  palette,
  roles,
}: SwatchesProps): JSX.Element {
  const theme = useMantineTheme()

  const setRole = (role: Role, item: ColorPaletteItem): void => {
    const updates = { [role]: item }
    const currentItemRole = getRole(item.id)
    if (currentItemRole) {
      const otherItem = palette.find(
        (currentItem) => getRole(currentItem.id) === role
      )
      if (otherItem) updates[currentItemRole] = otherItem
    }

    onRolesChange({ ...roles, ...updates })
  }

  const getRole = (id: string): Role | undefined => {
    return allRoles.find((role) => roles[role].id === id)
  }

  return (
    <Flex gap="md" mb="md" wrap="wrap">
      {palette.map((item) => {
        const itemRole = getRole(item.id)

        return (
          <Menu>
            <Menu.Target>
              <button
                className={clsx("cursor-pointer", {
                  "border-2 border-[#404040]": itemRole !== undefined,
                  "border-solid": itemRole === "primary",
                  "border-dashed": itemRole === "secondary",
                  "border-dotted": itemRole === "tertiary",
                })}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: item.color.hex(),
                  borderRadius: theme.radius.sm,
                  color: item.color.luminance() > 0.5 ? "#000" : "#fff",
                  fontSize: "10px",
                  textAlign: "center",
                }}
              >
                {item.weight && (
                  <Text className="my-auto" size="xs">
                    {item.weight}
                  </Text>
                )}
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              {allRoles.map((role) => (
                <Menu.Item
                  className={itemRole === role ? "font-bold" : ""}
                  key={role}
                  onClick={() => setRole(role, item)}
                >
                  {roleLabel[role]}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )
      })}
    </Flex>
  )
}
