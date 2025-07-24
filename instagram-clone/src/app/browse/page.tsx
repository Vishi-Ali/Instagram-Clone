import PostsGrid from "@/components/posts-grid"
import { prisma } from "../prisma-client"

export default async function BrowsePage() {
    const posts = await prisma.post.findMany({
        orderBy: {likes: "desc"},
        take: 100
    })
    return (
        <div>
            <PostsGrid posts={posts} />
        </div>
    )
}