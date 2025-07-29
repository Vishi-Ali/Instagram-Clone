import { prisma } from "@/app/prisma-client";
import { auth } from "@/auth";
import PostsGrid from "@/components/posts-grid";
import ProfileNav from "@/components/profile-page-nav";
import ProfileTop from "@/components/profile-page-top";

export default async function Bookmarks() {
    const session = await auth();
    const profile = await prisma.user.findFirstOrThrow({
        where: {email: session?.user?.email as string}
    });
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            email: session?.user?.email as string
        }
    })
    const posts = await prisma.post.findMany({
        where: {
            id: {in: bookmarks.map(b => b.postId)}
        }
    })
    return (
        <main className="w-full">
            <ProfileTop profile={profile} ourProfile={true} alreadyFollow={false} />
    
            <ProfileNav ourProfile={true} />
    
            <section className="flex items-center justify-center mt-5">
                <PostsGrid posts={posts} />
            </section>
        </main>
    )
}