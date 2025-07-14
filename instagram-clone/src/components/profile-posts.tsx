import { prisma } from "@/app/prisma-client";
import PostsGrid from "./posts-grid";

export default async function ProfilePosts({ email }: { email: string }) {
    const posts = await prisma.post.findMany({
        where: {
            email: email
        }
    })
    return (
        <PostsGrid posts={posts} />
    )
}