import { BASE_URL } from "@/lib/constant/constant";

// Fetch user data based on the provided syntax (GET request)
export const fetchUserData = async () => {
  try {
    const response: any = await fetch(`${BASE_URL}/profile`, {
      method: "GET", // Change to GET
      credentials: "include", // Include cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Handle successful logout (e.g., redirect to login page)
      window.location.href = "/"; // Redirect to the login page
    } else {
      // Handle unsuccessful logout
      console.error("Logout failed");
    }

    // Assuming the response contains user data
    const data = await response.json();
    return data; // Save the data in a variable or handle it as needed
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    // Handle other errors if needed
    return null; // Return null or an appropriate default value
  }
};


// Check if a cookie exists by name
export function checkCookieExists(cookieName: string) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    if (name === cookieName) {
      return true; // Cookie exists
    }
  }
  return false; // Cookie does not exist
}
