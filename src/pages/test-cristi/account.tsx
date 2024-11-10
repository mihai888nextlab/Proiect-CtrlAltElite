import AppHeader from "@/components/appHeader";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/router";
import { Community, User } from "@/type";
import { GetServerSideProps } from "next";
import * as cookieModule from "cookie";
import { useState } from "react";
import Error from "@/components/error";
import Loading from "@/components/loading";
import { CiCirclePlus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

export const getServerSideProps = (async (context) => {
  const cookies = context.req.headers.cookie
    ? cookieModule.parse(context.req.headers.cookie || "")
    : {};

  const token = cookies.token || null;

  let response = await fetch("http://localhost:3000/api/auth/getUserData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tokenData: token }),
  });

  if (!response.ok) {
    context.req.headers.cookie = "";
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let userData = await response.json();

  if (!userData) {
    context.req.headers.cookie = "";
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  response = await fetch("http://localhost:3000/api/getCommunities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      props: { user: userData, communities: [] },
    };
  }

  let communitiesData = await response.json();

  return {
    props: { user: userData, communities: communitiesData },
  };
}) satisfies GetServerSideProps<{ user: User; communities: Community[] }>;


export default function Account({
  user,
  communities,
}: {
  user: User;
  communities: Community[];
}){
    const router = useRouter();
  return (
    <div>
      <AppHeader  name={user.username} />
      <main className="bg-background">
        <div className="h-96">
            <div className="bg-primary rounded-full absolute left-[3rem] top-[6.75rem] h-60 w-60"></div>
            <div className="rounded-xl absolute left-[20rem] top-[9rem]">
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[1rem] font-bold text-5xl w-[30rem]">{user.username}</div>
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[4rem] font-semibold text-3xl w-52">
                  {user.communities.length} Communities
                  <button className="flex flex-col items-center justify-center h-[3rem] w-[3rem]" onClick={() => router.push("/settings")}>
                    <CiCirclePlus className="h-[3rem] w-[3rem]"/>
                  </button>
                  
                </div>
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[8rem] font-semibold text-3xl w-52">points:{user.points}</div>
                <div className="bg-gradient-to-r  from-header via-secondary to-header text-transparent bg-clip-text absolute top-[6rem] font-semibold text-3xl w-40">0 Friends</div>
            </div>
            <button className="absolute right-[5rem] top-[12rem] h-[3rem] w-[3rem] hover:animate-spin" onClick={() => router.push("/settings")}>
                <IoMdSettings className="h-[3rem] w-[3rem]"/>
            </button>
        </div>

        <div className="bg-gradient-to-r  from-header via-primary to-header text-transparent absolute top-[24rem] w-full h-2"></div>

        <div className="bg-primary h-[40rem]">

        </div>
      </main>
    </div>
  );
}
