import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function ProfileDropdown() {
  function deleteCookie(name: any) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  // Function to handle logout
  function handleLogout() {
    // Remove the 'jwtoken' cookie
    deleteCookie("jwtoken");

    // Redirect the user to the logout page or perform any other necessary actions
    window.location.href = "/"; // Redirect to the logout page
  }

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
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
