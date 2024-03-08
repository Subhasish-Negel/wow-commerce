import { TokenValidator } from "@/lib/Token-Validator";
import { BASE_URL } from "@/lib/constant/constant";

const token = TokenValidator();

// Fetch user data based on the provided syntax (GET request)
export const fetchUserData = async () => {
  try {
    const response: any = await fetch(`${BASE_URL}/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
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
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    if (name === cookieName) {
      return true;
    }
  }
  return false;
}
