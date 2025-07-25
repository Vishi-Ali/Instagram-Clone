import { Dot } from "lucide-react";
import PostLikes from "./post-likes";
import Link from "next/link";
import BookmarkButton from "./bookmark-button";
import { Post, User } from "@/lib/generated/prisma";

export default function PostInstance({
    post, profile, isLiked, isBooked
}:{
    post: Post;
    profile: User;
    isLiked: boolean;
    isBooked: boolean;
}) {
    return (
        <div className="w-md">
            <a href={`/post/${post.id}`}>
                <img src={post.image} className="min-w-md rounded-t-lg shadow-md" />
            </a>
            <div className="flex gap-2 flex-col bg-gray-200 rounded-b-lg p-4">
                <div className="flex justify-between">
                    <Link href={`/users/${profile.username}`} className="flex items-center gap-2">
                        <img src={profile.avatar || ''} className="size-10 rounded-full" />
                        <div className="flex items-center">
                            {profile.name}
                            <Dot className="-mr-1 -ml-1" />
                            <span className="text-sm text-gray-500">
                                {profile.username}
                            </span>
                        </div>
                    </Link>
                    <div className="flex">
                        <PostLikes post={post} isLiked={isLiked} />
                        <BookmarkButton post={post} isBooked={isBooked} />
                    </div>                
                </div>
                <div className="ml-2">
                    {post.description}
                </div>
            </div>
        </div>
    )
}