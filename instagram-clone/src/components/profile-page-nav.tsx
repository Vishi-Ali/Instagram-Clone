'use client'

import { usePathname } from "next/navigation";

export default function ProfileNav({
    ourProfile
}:{
    ourProfile: boolean;
}) {
    const path = usePathname();
    const bookmarkAcive = path.includes("/bookmarks");
    const postActive = !bookmarkAcive;
    const active = "cursor-pointer bg-gradient-to-t from-gray-200 to-white px-10 py-2 rounded-lg hover:text-ig-red transition-colors duration-300";
    const inactive = "cursor-pointer px-10 py-2 hover:text-ig-red transition-colors duration-300";
    return (
        <section>
                {ourProfile && (
                <div className="flex items-center justify-center gap-5 mt-5">
                        <a href="/profile" className="text-lg">
                            <button className={postActive ? active : inactive}>
                                Posts
                            </button>
                        </a>
                    <a href="/profile/bookmarks" className="text-lg">
                        <button className={bookmarkAcive ? active : inactive}>
                            Bookmarks
                        </button>
                    </a>
                </div>
                )}
        </section>
    )
}