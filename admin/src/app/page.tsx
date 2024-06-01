import AuthProtection from "@/lib/Providers/AuthProtection";
import Dashboard from "@/pages/dashboard/Dashboard";
import React from "react";

const page = () => {
  return (
    <AuthProtection>
      <Dashboard />
    </AuthProtection>
  );
};

export default page;
