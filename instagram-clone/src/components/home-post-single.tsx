import { Post, User } from "../../generated/prisma"
import { Bookmark, Dot } from "lucide-react";
import PostLikes from "./post-likes";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PostInstance({
    post, profile, isLiked
}:{
    post: Post;
    profile: User;
    isLiked: boolean;
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
                        <Button variant="ghost" className="cursor-pointer hover:text-ig-red transition duration-300">
                            <Bookmark />
                        </Button>
                    </div>                
                </div>
                <div className="ml-2">
                    {post.description}
                </div>
            </div>
        </div>
    )
}