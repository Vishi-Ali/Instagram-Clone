'use client'

import Masonry from "react-masonry-css";
import { Post } from "../../generated/prisma";
import Link from "next/link";

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