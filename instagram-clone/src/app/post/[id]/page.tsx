import { prisma } from "@/app/prisma-client"

export default async function Post({ params }: { params: { id: string } }) {
    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: params.id
        }
    })
    return (
        <div>
            {post.description}
        </div>
    )
}