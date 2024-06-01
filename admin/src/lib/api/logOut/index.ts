import { BASE_URL } from "@/lib/constant/constant";
import toast from "react-hot-toast";

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Logout successful");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      toast.error("Logout failed");
    }
  } catch (error: any) {
    toast.error("Logout failed:", error.message);
  }
};
