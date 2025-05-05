import { AdminPage } from "#components/page/AdminPage.tsx"
import { Card, Group } from "@mantine/core"
import { Link } from "@tanstack/react-router"
import { Palette, User } from "lucide-react"
import type { JSX } from "react"

export function DashboardPage(): JSX.Element {
  return (
    <AdminPage>
      <Group className="gap-5 justify-center">
        <Card
          withBorder
          className="hover:bg-gray-100 text-[var(--primary-color)] flex flex-col gap-3 p-2"
          component={Link}
          to="/admin/users"
        >
          <User className="text-7xl" size={96} />
          Manage users
        </Card>

        <Card
          withBorder
          className="hover:bg-gray-100 text-[var(--primary-color)] flex flex-col gap-3 p-2"
          component={Link}
          to="/admin/public-palettes"
        >
          <Palette className="text-7xl" size={96} />
          Manage palettes
        </Card>
      </Group>
    </AdminPage>
  )
}
