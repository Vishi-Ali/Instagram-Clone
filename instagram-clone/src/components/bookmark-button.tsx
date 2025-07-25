'use client'

import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { bookmarkPost, unbookmarkPost } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/generated/prisma";

export default function BookmarkButton({
    post, isBooked
}:{
    post: Post;
    isBooked: boolean;
}) {
    const router = useRouter();
    return (
        <form action={async (formData: FormData) => {
            if (isBooked) {
                await unbookmarkPost(formData)
            }
            else {
                await bookmarkPost(formData)
            }
            router.refresh();
        }}>
            <input type="hidden" name="postId" value={post.id} />
            <Button variant="ghost" className="cursor-pointer hover:text-ig-red transition duration-300">
                <Bookmark className={isBooked ? "text-ig-red fill-ig-red" : ""} />
            </Button>
        </form>
    )
}