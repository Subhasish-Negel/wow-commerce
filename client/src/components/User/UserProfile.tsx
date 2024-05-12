"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { authStore } from "@/lib/Zustand/store";
import { IUser } from "@/lib/Zustand/constant";
import { Button } from "@/components/ui/button";
import toast, { useToasterStore } from "react-hot-toast";
import { BASE_URL } from "@/lib/constant/constant";
import { CgSpinnerTwoAlt } from "react-icons/cg";


export const UserProfilePage = () => {
  const router = useRouter();
  const { toasts } = useToasterStore();
  const { userData, fetchUserData } = authStore();
  const initialName = (userData as IUser)?.name;
  const [name, setName] = useState<string>((userData as IUser)?.name);
  console.log(name);
  const [profilePicture, setProfilePicture] = useState<string | File>(
    (userData as IUser)?.image || ""
  );
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  let formData = new FormData();
  formData.append("name", name);
  formData.append("profile", profilePicture);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    setName((userData as IUser)?.name);
    setIsDirty(
      name !== initialName || profilePicture !== (userData as IUser)?.image
    );

    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 1) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [initialName, name, profilePicture, toasts, userData]);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setIsDirty(false);
    const fetcher = async (
      url: string,

      payload: FormData
    ) => {
      const response: any = await fetch(url, {
        method: "PUT",
        credentials: "include",
        body: payload,
      });

      if (!response.ok) {
        const error: any = new Error(
          "An error occurred while registering the user"
        );

        // Attach extra info to the error object.
        error.info = await response.json();
        error.status = response.status;
        error.message = "An error occurred while registering the user";
        throw error;
      }
      return response.json();
    };

    try {
      const data = await fetcher(
        `${BASE_URL}/profile/update/${(userData as IUser).id}`,
        formData
      );
      toast.success(data.message);
      setLoading(false);
      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error: any) {
      setLoading(false);
      if (error.status === 400) {
        toast.error(error.info.message);
      } else {
        toast.error("Server is Broken. Please Try Again");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center h-screen w-full pt-10"
    >
      <div className="w-1/4 flex justify-center">
        <div className="relative w-32 h-32">
          {(userData as IUser)?.image ? (
            <Image
              src={
                profilePicture instanceof File
                  ? URL.createObjectURL(profilePicture)
                  : (userData as IUser)?.image
              }
              alt="Profile"
              className="w-full h-full rounded-full"
              height={100}
              width={100}
              priority
            />
          ) : profilePicture instanceof File ? (
            <Image
              src={URL.createObjectURL(profilePicture)}
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
          disabled={!isDirty || loading}
        >
          {loading ? (
            <p className="flex items-center gap-2">
              <CgSpinnerTwoAlt className="animate-spin size-4" />
              Saving
            </p>
          ) : (
            <p>Save Changes</p>
          )}
        </Button>
      </div>
    </form>
  );
};
