import AuthProtection from "@/lib/Providers/AuthProtection";
import AddProduct from "@/pages/add-product/AddProduct";
import React from "react";

function page() {
  return (
    <AuthProtection>
      <AddProduct />
    </AuthProtection>
  );
}

export default page;
