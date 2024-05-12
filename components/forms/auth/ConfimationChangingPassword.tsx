import Thanks from "@/components/forms/auth/Thanks"
import Link from "next/link"

const ConfirmationChangingPassword = () => {
  return (
    <>
      <Thanks text="Dziękujemy! Twoje hasło zostało zmienione." />
      <Link href="/sign-in" className="px-2 hover:text-primary-500">
        Przejdź do logowania!
      </Link>
    </>
  )
}

export default ConfirmationChangingPassword
