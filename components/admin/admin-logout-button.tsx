import { signOut } from "@/lib/actions/admin-auth"
import { Button } from "@/components/ui/button"

export function AdminLogoutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="outline" size="sm">
        Logout
      </Button>
    </form>
  )
}
