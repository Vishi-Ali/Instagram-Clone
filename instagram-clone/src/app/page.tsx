import { auth } from "@/auth";
import { Button } from "@/components/ui/button"
import { Heart, LogInIcon } from "lucide-react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen flex items-center justify-around flex-col gap-4">
      <div></div>
      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold mb-4 text-center">
          Welcome to the Instagram Clone!
        </div>
        <Button className="curor-pointer">
          {!session && (
            <a href="/login" className="flex gap-2 items-center">
              <LogInIcon />
              Login
            </a>
          )}
          {session && (
            <a href="/profile" className="flex gap-2 items-center">
              <LogInIcon />
              Continue
            </a>
          )}
        </Button>
      </div>
      <div className="flex">
        Made with <Heart className="fill-ig-red mr-1 ml-1" /> by Vishesh Vigh
      </div>
    </div>
  );
}