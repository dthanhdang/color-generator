import type { UserSummary } from "#client/types"
import { JSX } from "react"
import { Button, Stack, Text, Title } from "@mantine/core"
import { UsersList } from "./UsersList.tsx"
import { PlusCircle } from "lucide-react"
import { modals } from "@mantine/modals"
import { RegistrationForm } from "#components/registration_form/RegistrationForm.jsx"
import type { RegistrationFormData } from "#components/registration_form/RegistrationForm.jsx"
import { useCreateAdministratorMutation } from "./useCreateAdministratorMutation.ts"
import { AdminPage } from "#components/page/AdminPage.tsx"

type ListUsersPageProps = {
  users: UserSummary[]
}

export function ListUsersPage({ users }: ListUsersPageProps): JSX.Element {
  const registeredUsers = users.filter(({ role }) => role === "registered_user")
  const administrators = users.filter(({ role }) => role === "administrator")
  const createAdministratorMutation = useCreateAdministratorMutation()

  const handleOpenAddAdministratorForm = (): undefined => {
    const handleSubmit = async (
      formData: RegistrationFormData
    ): Promise<undefined> => {
      const output = await createAdministratorMutation.mutateAsync(formData)
      if ("user" in output) modals.closeAll()
    }

    modals.open({
      children: (
        <RegistrationForm
          buttonLabel="Create administrator"
          onSubmit={handleSubmit}
        />
      ),
    })
  }

  return (
    <AdminPage>
      <Stack className="gap-5">
        <Title order={2}>Administrators</Title>

        <UsersList displayTimeStamps={false} users={administrators} />

        <Button.Group className="ml-auto">
          <Button
            leftSection={<PlusCircle />}
            onClick={handleOpenAddAdministratorForm}
            variant="light"
          >
            Add an administrator
          </Button>
        </Button.Group>
      </Stack>

      <Stack className="gap-5">
        <Title order={2}>Registered users</Title>

        {registeredUsers.length === 0 ? (
          <Text c="dimmed">No user</Text>
        ) : (
          <UsersList users={registeredUsers} />
        )}
      </Stack>
    </AdminPage>
  )
}
