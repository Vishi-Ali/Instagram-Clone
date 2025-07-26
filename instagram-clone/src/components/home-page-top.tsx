import { User } from "@/lib/generated/prisma";
import { CirclePlus } from "lucide-react";

export default function HomePageStories({
    followProfile
}:{
    followProfile: User[];
}) {
    return (
        <div className="flex items-center w-full gap-4">
            {!followProfile.length && (
                <div>
                    Follow your friends to get started!
                </div>
            )}
            {followProfile.map(follow => (
                <div className="flex flex-col items-center" key={follow.id}>
                    <div className="p-1 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red size-24">
                        <div className="bg-white p-1 rounded-full">
                            <div className="aspect-square overflow-hidden rounded-full">
                                <img src={follow.avatar || 'https://demofree.sirv.com/nope-not-here.jpg'} alt="Profile" className="size-24" />
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-1">
                        {follow.username}
                    </p>
                </div>
                ))}
        </div>
    )
}