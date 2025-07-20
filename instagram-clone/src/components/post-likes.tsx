'use client'

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Like, Post } from "../../generated/prisma";
import { likePost, unlikePost } from "@/app/actions";
import { useRouter } from "next/navigation";

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