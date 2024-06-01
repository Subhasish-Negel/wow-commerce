import AuthProtection from "@/lib/Providers/AuthProtection";
import EditProducts from "@/pages/products/Edit-Products";
import React from "react";

function page() {
  return (
    <AuthProtection>
      <EditProducts />
    </AuthProtection>
  );
}

export default page;
