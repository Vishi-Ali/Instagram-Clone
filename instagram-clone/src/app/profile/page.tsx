import { auth } from "@/auth";
import { prisma } from "../prisma-client";
import { redirect } from "next/navigation";
import ProfilePageContent from "@/components/profile-page";

export default async function ProfilePage() {
  const session = await auth();
  let profile;
  try {
    profile = await prisma.user.findFirst({
      where: {email: session?.user?.email as string}
    });
  } catch (error) {
    profile = null;
  }
  if (!profile) {
    redirect('/settings');
  }

  return (
    <ProfilePageContent profile={profile} />
  );
}