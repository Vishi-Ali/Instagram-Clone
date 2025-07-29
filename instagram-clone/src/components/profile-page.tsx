import ProfilePosts from "@/components/profile-posts";
import { auth } from "@/auth";
import { prisma } from "@/app/prisma-client";
import ProfileTop from "./profile-page-top";
import ProfileNav from "./profile-page-nav";
import { User } from "@/lib/generated/prisma";

export default async function ProfilePageContent({
    profile
}:{
    profile: User
}) {
    const session = await auth();
    const ourProfile = session?.user?.email === profile.email;
    const follow = await prisma.follow.findFirstOrThrow({
      where: {
        followerProfile: session?.user?.email as string
      }
    })
    const alreadyFollow = follow && follow.followedProfiles.includes(profile.email)

    return (
    <main className="w-full">
      <ProfileTop profile={profile} ourProfile={ourProfile} alreadyFollow={alreadyFollow} />

      <ProfileNav ourProfile={ourProfile} />

      <section className="flex items-center justify-center mt-5">
        <ProfilePosts email={profile.email} />
      </section>
    </main>
    )
}