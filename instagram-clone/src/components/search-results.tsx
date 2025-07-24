import { prisma } from "@/app/prisma-client"
import SearchProfile from "./search-profile"
import PostsGrid from "./posts-grid"

export default async function SearchResults({
    query
}:{
    query: string
}) {
    const profiles = await prisma.user.findMany({
        where: {
            OR: [
                {username: {contains: query}},
                {name: {contains: query}}
            ]
        },
        take: 10
    })
    
    const posts = await prisma.post.findMany({
        where: {
            description: {contains: query}
        },
        take: 20
    })

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-semibold">
                Profiles
            </h1>
            {!profiles.length && (
                <div className="text-gray-500">
                    No profiles found
                </div>
            )}
            <div className="grid grid-cols-2 gap-5">
                {profiles.map(profile => (
                    <SearchProfile profile={profile} key={profile.id} />
                ))}
            </div>

            <h1 className="text-2xl font-semibold">
                Posts
            </h1>
            {!posts.length && (
                <div className="text-gray-500">
                    No posts found
                </div>
            )}
            <PostsGrid posts={posts} />
        </div>
    )
}