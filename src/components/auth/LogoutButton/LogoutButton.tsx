import { logoutUser } from "@/api/requests/user";
import { redirect } from "next/navigation";

export const LogoutButton = () => {
  return (
    <span
      className="text-red-400 ml-4 cursor-pointer"
      onClick={async () => {
        await logoutUser();
        redirect("/login");
      }}
    >
      Logout
    </span>
  );
};
