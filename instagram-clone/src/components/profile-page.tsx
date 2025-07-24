import { doLogout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, Check, Settings } from "lucide-react";
import Link from "next/link";
import ProfilePosts from "@/components/profile-posts";
import { User } from "../../generated/prisma";
import { auth } from "@/auth";
import FollowProfile from "./profile-follow";
import { prisma } from "@/app/prisma-client";

export default async function ProfilePageContent({
    profile
}:{
    profile: User
}) {
    const session = await auth();
    const ourProfile = session?.user?.email === profile.email;
    const alreadyFollow = await prisma.follow.findFirst({
      where: {
        followerProfile: session?.user?.email || '',
        followedProfile: profile.email
      }
    })

    return (
    <main className="w-full">
      <section className="flex items-center justify-between w-full p-4 shadow-md">
        <button className="cursor-pointer">
          <ArrowLeftToLine />
        </button>
        <div className="flex items-center justify center gap-2 -mr-20">
          <h1 className="text-xl">
            {profile.username}
          </h1>
          <div className="flex items-center justify-center bg-ig-red rounded-full text-white p-1">
            <Check size={15} />
          </div>
        </div>
        {ourProfile && (
            <div className="flex items-center gap-10">
            <form action={doLogout}>
                <Button variant="destructive" type="submit" className="cursor-pointer">
                Logout
                </Button>
            </form>

            <Link href='/settings' className="cursor-pointer">
                <Settings />
            </Link>
            </div>
        )}
        {!ourProfile && (
            <div></div>
        )}
      </section>

      <section className="flex flex-col items-center justify-center mt-10">
        <div className="p-3 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
          <div className="bg-white p-2 rounded-full">
            <div className="aspect-square overflow-hidden w-60 rounded-full">
              <img src={profile.avatar || 'https://demofree.sirv.com/nope-not-here.jpg'} alt="Profile" className="size-60" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-2xl font-semibold">
            {profile.name}
          </h1>
          <p className="text-gray-500">
            {profile.bio}
          </p>
        </div>
      </section>

      {!ourProfile && (
        <section className="flex justify-center mt-3 mb-5">
            <FollowProfile profile={profile} alreadyFollow={alreadyFollow ? true : false} />
        </section>
      )}

      <section>
        <div className="flex items-center justify-center gap-5 mt-5">
          <button className="cursor-pointer bg-gradient-to-t from-gray-200 to-white px-10 py-2 rounded-lg hover:text-ig-red transition-colors duration-300">
            <a href="/profile" className="text-lg">Posts</a>
          </button>
          <button className="cursor-pointer px-10 py-2 hover:text-ig-red transition-colors duration-300">
            <a href="/highlights" className="text-lg">Highlights</a>
          </button>
        </div>
      </section>

      <section className="flex items-center justify-center mt-5">
        <ProfilePosts email={profile.email} />
      </section>
    </main>
    )
}