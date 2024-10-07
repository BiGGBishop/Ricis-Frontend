"use client";

import FormLayout from "@/components/FormLayout";
import { PeopleIcon, UserIcon } from "@/svgs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  return (
    <FormLayout>
      <div className="w-full lg:w-[33rem] px-4 mx-auto mt-8 space-y-8">
        <div className="bg-white rounded-[12px] py-20 px-4 lg:px-12 border border-[#E6E8EC] mt-[1.5rem] space-y-6 ">
          <div className="space-y-2">
            <h1 className="text-gray-800 text-2xl font-semibold">Login</h1>
            <p className="text-gray-500 text-sm">
              Click on any of the button to either login as a staff or as a user
            </p>
          </div>
          <button
            onClick={() => router.push("/signin/as-staff")}
            className="flex items-center justify-center gap-4 py-4 px-4 bg-white text-blue-700 w-full rounded-md border-2 border-blue-700 hover:opacity-70"
          >
            <span className="">{PeopleIcon}</span>
            <p className="">Login as Staff member</p>
          </button>
          <button
            onClick={() => router.push("/signin/as-user")}
            className="flex items-center justify-center gap-4 py-4 px-4 bg-black text-white w-full rounded-md shadow-md hover:opacity-70"
          >
            <span className="">{UserIcon}</span>
            <p className="">Login as a user</p>
          </button>
          <div className="text-center">
            <Link href="/signup" className="text-blue-700 text-sm text-center">
              Don’t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default SignIn;
