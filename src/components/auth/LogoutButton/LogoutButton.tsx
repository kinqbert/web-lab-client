import { logoutUser } from "@/api/requests/user";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const LogoutButton = () => {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await logoutUser();
        redirect("/login");
      }}
    >
      Logout
    </Button>
  );
};
