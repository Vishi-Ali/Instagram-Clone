'use client'

import { UserRoundMinus, UserRoundPlus } from "lucide-react";
import { Button } from "./ui/button";
import { followUser, unfollowUser } from "@/app/actions";
import { useRouter } from "next/navigation";
import { User } from "@/lib/generated/prisma";

export default function FollowProfile({
    profile, alreadyFollow
}:{
    profile: User;
    alreadyFollow: boolean
}) {
    const router = useRouter();
    return (
        <form action={async (formData) => {
            if (!alreadyFollow) {
                await followUser(formData)
            }
            else {
                await unfollowUser(formData)
            }
            router.refresh();
        }}>
            <input type="hidden" name="profile" value={profile.email} />
            <Button className="cursor-pointer bg-gradient-to-tr from-ig-orange to-ig-red hover:brightness-90 duration-300">
                {alreadyFollow && (
                    <div className="flex gap-1 items-center">
                        <UserRoundMinus />
                        Unfollow
                    </div>
                )}
                {!alreadyFollow && (
                    <div className="flex gap-1 items-center">
                        <UserRoundPlus />
                        Follow
                    </div>
                )}
            </Button>
        </form>
    )
}