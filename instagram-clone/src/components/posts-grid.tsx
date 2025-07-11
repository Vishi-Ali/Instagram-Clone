'use client'

import Masonry from "react-masonry-css";

let images: string[] = [];
for (let i = 0; i < 20; i++) {
    images.push(`https://picsum.photos/1024/786?random=${i}`);
    images.push(`https://picsum.photos/786/1024?random=${i}`);
}

export default function PostsGrid() {
    return (
        <Masonry
        breakpointCols={{
            default: 4,
            1100: 3,
            700: 2
        }}
        className="flex"
        columnClassName="bg-clip-padding">
                {images.map((image, index) => (
                    <img src={image} alt={`Post ${index + 1}`} key={index} className="p-2"/>
                ))}
        </Masonry>
    )
}