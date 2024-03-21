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