import type { UserSummary } from "#client/types"
import type { JSX } from "react"

type UsersListProps = {
  displayTimeStamps?: boolean
  users: UserSummary[]
}

export function UsersList({
  displayTimeStamps = true,
  users,
}: UsersListProps): JSX.Element {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="bg-[var(--primary-color)] text-white px-4 py-2">Id</th>
          <th className="bg-[var(--primary-color)] text-white px-4 py-2">
            First name
          </th>
          <th className="bg-[var(--primary-color)] text-white px-4 py-2">
            Last name
          </th>
          <th className="bg-[var(--primary-color)] text-white px-4 py-2">
            Email address
          </th>
          {displayTimeStamps && (
            <>
              <th className="bg-[var(--primary-color)] text-white px-4 py-2">
                Registration
              </th>
              <th className="bg-[var(--primary-color)] text-white px-4 py-2">
                Last login
              </th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border border-[var(--primary-color)] px-4 py-2">
              {user.id.toString()}
            </td>
            <td className="border border-[var(--primary-color)] px-4 py-2">
              {user.identity.firstName}
            </td>
            <td className="border border-[var(--primary-color)] px-4 py-2">
              {user.identity.lastName}
            </td>
            <td className="border border-[var(--primary-color)] px-4 py-2">
              {user.email}
            </td>
            {displayTimeStamps && (
              <>
                <td className="border border-[var(--primary-color)] px-4 py-2">
                  {user.signUpDate.toDateString()}
                </td>
                <td className="border border-[var(--primary-color)] px-4 py-2">
                  {user.lastSignInDate.toDateString()}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
