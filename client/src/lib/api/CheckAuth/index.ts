import { BASE_URL } from "@/lib/constant/constant";

export const fetcher = async () => {
  const response: any = await fetch(`${BASE_URL}/checkauth`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: any = new Error(
      "An error occurred while registering the user"
    );

    // Attach extra info to the error object.
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  //   if (!response.ok) {
  //     // Handle non-ok responses
  //     const error: any = new Error(`Error: ${response.status}`);
  //     error.info = await response.json(); // Attach extra info from response
  //     throw error;
  //   }

  return response.json();
};

// try {
//   await fetcher();
//   setTimeout(() => {
//     window.location.href = "/";
//   }, 2000);
// } catch (error: any) {
//   if (error.status === 401) {
//   } else {
//   }
// }
