'use client'

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { likePost, unlikePost } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Post } from "@/generated/prisma";

export default function PostLikes({
    post, isLiked
}:{
    post: Post;
    isLiked: boolean;
}) {
    const router = useRouter();
    return (
        <form action={async (data) => {
            if (!isLiked) {
                await likePost(data)
            }
            else {
                await unlikePost(data)
            }
            router.refresh();
        }}>
            <input type="hidden" name="postId" value={post.id} />
            <Button variant="ghost" className="cursor-pointer hover:text-ig-red transition duration-300">
                <Heart className={
                    isLiked ? "text-ig-red fill-ig-red" : ""
                } />
                {post.likes}
            </Button>
        </form>
    )
}