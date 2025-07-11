import { Button } from "@/components/ui/button";
import { doLogout } from "../actions";
import { ArrowLeftToLine, Check, Settings } from "lucide-react";
import PostsGrid from "@/components/posts-grid";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "../prisma-client";
import { redirect } from "next/navigation";

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
    <main>
      <section className="flex items-center justify-between p-4 shadow-md">
        <button className="cursor-pointer">
          <ArrowLeftToLine />
        </button>
        <div className="flex items-center justify center gap-2 -mr-20">
          <h1 className="text-xl">
            {profile.username}
          </h1>
          <div className="flex items-center justify-center bg-ig-red rounded-full text-white p-1">
            <Check size={15} />
          </div>
        </div>
        <div className="flex items-center gap-10">
          <form action={doLogout}>
            <Button variant="destructive" type="submit" className="cursor-pointer">
              Logout
            </Button>
          </form>

          <Link href='/settings' className="cursor-pointer">
            <Settings />
          </Link>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mt-10">
        <div className="p-3 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
          <div className="bg-white p-2 rounded-full">
            <div className="aspect-square overflow-hidden w-60 rounded-full">
              <img src={profile.avatar || ''} alt="Profile" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-2xl font-semibold">
            {profile.name}
          </h1>
          <p className="text-gray-500">
            {profile.bio}
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-center gap-5 mt-10">
          <button className="cursor-pointer bg-gradient-to-t from-gray-200 to-white px-10 py-2 rounded-lg hover:text-ig-red transition-colors duration-300">
            <a href="/profile" className="text-lg">Posts</a>
          </button>
          <button className="cursor-pointer px-10 py-2 hover:text-ig-red transition-colors duration-300">
            <a href="/highlights" className="text-lg">Highlights</a>
          </button>
        </div>
      </section>

      <section className="flex items-center justify-center mt-5">
        <PostsGrid />
      </section>
    </main>
  );
}