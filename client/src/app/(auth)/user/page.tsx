import { Nav } from "@/components/Navbar/Navbar";
import { UserProfilePage } from "@/components/User/UserProfile";
import AuthProtection from "@/lib/Providers/AuthProtection";
import React from "react";
import { Toaster } from "react-hot-toast";

const Page = () => {
  return (
    <>
      <AuthProtection isProtected>
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
      </AuthProtection>
    </>
  );
};

export default Page;
