import { prisma } from "@/app/prisma-client"
import ProfilePageContent from "@/components/profile-page";

export default async function ProfilePage({
    params
}:{
    params: {username: string}
}) {
    const { username } = await params;
    const profile = await prisma.user.findFirstOrThrow({
        where: {
            username: username
        }
    })
    return (
        <ProfilePageContent profile={profile} />
    )
}