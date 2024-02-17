import useSWR from "swr";

 export const UsePostSWR = (url: any, data: any) => {
  const fetcher = async (url: any, data: any) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: any = new Error(
        "An error occurred while registering the user"
      );
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }

    return response.json();
  };

  return useSWR([url, data], fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
};
