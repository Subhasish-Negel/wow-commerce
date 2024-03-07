import { BASE_URL } from "@/lib/constant/constant";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import toast from "react-hot-toast";

const logoutUser = async () => {
  try {
    // Send a POST request to the logout endpoint
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // Include cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Logout successful");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast.error("Logout failed");
    }
  } catch (error: any) {
    // Handle network or other errors

    console.error("Logout failed:", error.message);
  }
};

export default function ProfileDropdown() {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        // onAction={(key) => alert(key)}
      >
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem
          onClick={handleLogout}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
