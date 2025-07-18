import { auth } from "@/auth";
import { Button } from "@/components/ui/button"
import { LogInIcon } from "lucide-react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
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
  );
}