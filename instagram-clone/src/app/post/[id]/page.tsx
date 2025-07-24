import { prisma } from "@/app/prisma-client"
import { auth } from "@/auth";
import BookmarkButton from "@/components/bookmark-button";
import CommentsForm from "@/components/comments-form";
import Comment from "@/components/post-comment";
import PostLikes from "@/components/post-likes";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    const post = await prisma.post.findFirstOrThrow({
        where: { id }
    });
    const profile = await prisma.user.findFirstOrThrow({
        where: {
            email: post.email
        }
    })
    const comments = await prisma.comment.findMany({
        where: {
            postId: id
        }
    })
    const commentProfiles = await prisma.user.findMany({
        where: {
            email: {in: Array.from(new Set(comments.map(c => c.email)))}
        },
        distinct: ['email']
    })
    const isLiked = await prisma.like.findFirst({
        where: {
            email: session?.user?.email as string,
            postId: id
        }
    })
    const isBooked = await prisma.bookmark.findFirst({
        where: {
            email: session?.user?.email as string,
            postId: id
        }
    })
    return (
        <div className="grid lg:grid-cols-[3fr_1fr] gap-10 p-5">
            <div className="flex items-center justify-center">
                <img src={post.image} alt="Image Post" className="rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
                <Comment text={post.description} profile={profile} />
                <div className="flex gap-2 items-center justify-around">
                    <PostLikes post={post} isLiked={isLiked ? true : false} />
                    <BookmarkButton post={post} isBooked={isBooked ? true : false} />
                </div>
                <div className="flex flex-col items-center border-t-2 pt-5 gap-4">
                    <CommentsForm postId={id} />
                    {
                    comments.map(comment => (
                        <div key={comment.id}>
                            <Comment text={comment.comment} profile={
                                commentProfiles.find(p => p.email === comment.email)
                            } />
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}