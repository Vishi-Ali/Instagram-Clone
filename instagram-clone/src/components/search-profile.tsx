import { User } from "@/generated/prisma";
import Link from "next/link"

export default function SearchProfile({
    profile
}:{
    profile: User
}) {
    return (
        <Link href={`/users/${profile.username}`}
            className="flex gap-3 items-center bg-gray-100 px-8 py-3 rounded-xl cursor-pointer hover:bg-gray-200 duration-300"        
        >
            <div className="">
                <img src={profile.avatar || ''} className="size-18 rounded-full" />
            </div>
            <div className="flex flex-col">
                <div className="text-lg">
                    {profile.name}
                </div>
                <div className="text-gray-500 text-sm">
                    @{profile.username}
                </div>
            </div>
        </Link>
    )
}