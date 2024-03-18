"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { authStore } from "@/lib/Zustand/store";
import { IUser } from "@/lib/Zustand/constant";
import { Button } from "@/components/ui/button";
import toast, { useToasterStore } from "react-hot-toast";

export const UserProfilePage = () => {
  const { toasts } = useToasterStore();
  const { userData } = authStore();
  const initialName = (userData as IUser)?.name || "";
  const [name, setName] = useState<string>(initialName);
  const [profilePicture, setProfilePicture] = useState<string | File>(
    (userData as IUser)?.image || ""
  );
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    setIsDirty(
      name !== initialName || profilePicture !== (userData as IUser)?.image
    );

    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 1) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [name, profilePicture, initialName, userData, toasts]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setIsDirty(true);
      toast.success("Click on Save Changes to update the profile picture");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDirty(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center h-screen w-full pt-10"
    >
      <div className="w-1/4 flex justify-center">
        <div className="relative w-32 h-32">
          {(userData as IUser)?.image ? (
            <Image
              src={
                profilePicture instanceof File
                  ? URL.createObjectURL(profilePicture)
                  : profilePicture
              }
              alt="Profile"
              className="w-full h-full rounded-full"
              height={100}
              width={100}
              priority
            />
          ) : (
            <div>
              <FaRegUserCircle className="flex items-center justify-center w-full h-full bg-stone-800 p-4 rounded-full" />
            </div>
          )}
          <label
            htmlFor="profilePictureInput"
            className="absolute bottom-0 right-0 z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full cursor-pointer hover:bg-gray-500"
          >
            <MdOutlineAddAPhoto />
            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col px-20 bg-black/40 backdrop-blur rounded-xl h-fit py-8 gap-8">
          <div className="">
            <label htmlFor="name" className="block text-gray-400 font-medium">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block text-gray-400 font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={(userData as IUser)?.email}
              disabled
            />
          </div>
        </div>
        <Button
          variant={"default"}
          className="mt-4 font-semibold"
          type="submit"
          disabled={!isDirty}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};
