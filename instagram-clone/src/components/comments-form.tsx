'use client'

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { postComment } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function CommentsForm({postId}:{postId: string}) {
    const router = useRouter();

    return (
        <div>
            <form className="flex gap-2 items-center" action={async (formData: FormData) => {
                await postComment(formData)
                router.refresh()
            }}>
                <input type="hidden" name="postId" value={postId} />
                <div className="w-full">
                    <Input name="comment" placeholder="Leave a comment..." />
                </div>
                <Button type="submit" className="cursor-pointer">
                    Post
                </Button>
            </form>
        </div>
    )
}