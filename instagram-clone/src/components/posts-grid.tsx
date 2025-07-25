'use client'

import Masonry from "react-masonry-css";
import Link from "next/link";
import { Post } from "@/lib/generated/prisma";

export default function PostsGrid({posts}: {posts: Post[]}) {
    return (
        <Masonry
        breakpointCols={{
            default: 4,
            1100: 3,
            700: 2
        }}
        className="flex"
        columnClassName="bg-clip-padding justify-center">
                {posts.map((post, index) => (
                    <Link href={`/post/${post.id}`} key={index}>
                        <img src={post.image} alt={`Post ${index + 1}`} className="p-2 cursor-pointer hover:brightness-75 transition duration-300"/>
                    </Link>
                ))}
        </Masonry>
    )
}