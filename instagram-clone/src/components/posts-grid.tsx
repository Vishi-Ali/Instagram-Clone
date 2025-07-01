'use client'

import Masonry from 'react-masonry-css'

let images: string[] = [];
for (let i = 0; i < 10; i++) {
    images.push(`https://picsum.photos/1024/786?random=${i}`);
    images.push(`https://picsum.photos/786/1024?random=${i}`);
}


export default function PostsGrid() {
    return (
        <div className='mt-4'>
            <Masonry
                breakpointCols={{
                    default: 4,
                    1024: 3,
                    768: 2
                }}
                className="flex">
                    {images.map((image, index) => (
                        <div className='flex justify-center items-center p-2' key={index}>
                            <img src={image} alt="post" />
                        </div>
                    ))}
            </Masonry>
        </div>
    );
}