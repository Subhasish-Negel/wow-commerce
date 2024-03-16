import { BASE_URL } from "@/lib/constant/constant";

// Fetch user data based on the provided syntax (GET request)
export const fetchUserData = async () => {
  try {
    const response: any = await fetch(`${BASE_URL}/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.user;
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return {};
  }
};

// Check if a cookie exists by name
export function checkCookieExists(cookieName: string) {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name] = cookie.split("=");
      if (name === cookieName) {
        return true;
      }
    }
  }
  return false;
}
