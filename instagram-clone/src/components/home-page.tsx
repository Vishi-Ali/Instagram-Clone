import { prisma } from "@/app/prisma-client";
import { auth } from "@/auth";
import HomePageStories from "./home-page-top";
import HomePagePosts from "./home-page-posts";

export default async function HomePage() {
    const session = await auth();
    const follows = await prisma.follow.findMany({
        where: {
            followerProfile: session?.user?.email as string
        }
    })
    const followProfile = await prisma.user.findMany({
        where: {
            email: {in: follows.map(f => f.followedProfile)}
        }
    })
    return (
        <div className="flex flex-col w-full p-4 gap-8">
            <HomePageStories followProfile={followProfile} />
            <HomePagePosts followProfile={followProfile} />
        </div>
    )
}