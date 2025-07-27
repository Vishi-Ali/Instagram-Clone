import { prisma } from "@/app/prisma-client"
import ProfilePageContent from "@/components/profile-page";

export default async function ProfilePage({
    params
}:{
    params: Promise<{username: string}>
}) {
    const { username: raw } = await params;
    const username = decodeURIComponent(raw)
    const profile = await prisma.user.findFirstOrThrow({
        where: {
            username: username
        }
    })
    return (
        <ProfilePageContent profile={profile} />
    )
}