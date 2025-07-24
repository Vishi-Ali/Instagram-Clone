import { prisma } from "@/app/prisma-client";
import PostInstance from "./home-post-single";
import { auth } from "@/auth";
import { User } from "@/generated/prisma";

export default async function HomePagePosts({
    followProfile
}:{
    followProfile: User[];
}) {
    const session = await auth();
    const posts = await prisma.post.findMany({
        where: {
            email: {in: followProfile.map(p => p.email)}
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 100
    })
    const followMap = Object.fromEntries(
        followProfile.map(p => [p.email, p])
    )
    const likes = await prisma.like.findMany({
        where: {
            email: session?.user?.email as string,
            id: {in: posts.map(p => p.id)}
        }
    })
    return (
        <div className="flex flex-col items-center gap-8">
            {posts.map(async post => {
                const isLiked = await prisma.like.findFirst({
                    where: {
                        email: session?.user?.email as string,
                        postId: post.id
                    }
                })
                const isBooked = await prisma.bookmark.findFirst({
                    where: {
                        email: session?.user?.email as string,
                        postId: post.id
                    }
                })
                return (
                    <PostInstance key={post.id} post={post} profile={followMap[post.email]} isLiked={isLiked ? true : false} isBooked={isBooked ? true : false} />
                )
            })}
        </div>
    )
}