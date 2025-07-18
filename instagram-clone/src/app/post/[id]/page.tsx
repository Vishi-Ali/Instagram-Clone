import { prisma } from "@/app/prisma-client"
import CommentsForm from "@/components/comments-form";
import Comment from "@/components/post-comment";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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
    return (
        <div className="grid lg:grid-cols-[3fr_1fr] gap-10 p-5">
            <div className="flex items-center">
                <img src={post.image} alt="Image Post" className="rounded-md" />
            </div>
            <div className="flex flex-col gap-5">
                <Comment text={post.description} profile={profile} />
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