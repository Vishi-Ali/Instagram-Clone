'use server'

import { auth } from "@/auth";
import { prisma } from "../prisma-client";
import SettingsPage from "./settingsPage";

export default async function Settings() {
    const session = await auth();
    const profile = await prisma.user.findFirst({
        where: {email: session?.user?.email as string}
    })
    return (
        <SettingsPage profile={profile} email={session?.user?.email} />
    )
}