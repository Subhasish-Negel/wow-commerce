import { Nav } from "@/components/Navbar/Navbar";
import { UserProfilePage } from "@/components/User/UserProfile";
import FetchUserProvider from "@/lib/Providers/FetchUserProvider";
import React from "react";
import { Toaster } from "react-hot-toast";

const Page = () => {
  return (
    <>
      <FetchUserProvider isProtected>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={20}
          toastOptions={{
            duration: 4000,
          }}
        />
        <Nav />
        <UserProfilePage />
      </FetchUserProvider>
    </>
  );
};

export default Page;
