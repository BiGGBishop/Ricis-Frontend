"use client";
import { useRouter } from "next/navigation";

const Avatar = ({ currentUser, role }) => {

  const firstNameAcr =
    role !== "USER" ? "A" : currentUser?.first_name?.charAt(0);
  const secondNameAcr =
    role !== "USER" ? "" : currentUser?.last_name?.charAt(0);
  const router = useRouter();

  const navigateToProfilePage = () => {
    if (role === "USER") {
      router.push("/user/profile");
    }
    if (role === "ADMIN" || role === "STAFF") {
      router.push("/admin/profile");
    }
  };
  return (
    <div
      onClick={navigateToProfilePage}
      className="flex items-center justify-center cursor-pointer text-md bg-[rgba(85,147,232)] text-white text-sm px-3 py-1 rounded-full w-[2.2rem] h-[2.1rem]"
    >
      <span className="">{firstNameAcr?.toUpperCase()}</span>
      <span className="">{secondNameAcr?.toUpperCase()}</span>
    </div>
  );
};

export default Avatar;
