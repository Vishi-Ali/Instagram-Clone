import PostsGrid from "@/components/posts-grid";
import { ArrowLeftIcon, Check, SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div>
            <div className="flex justify-between items-center p-5">
                <Link href={'/'} className="cursor-pointer">
                    <ArrowLeftIcon className="size-6" />
                </Link>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    Username
                    <Check className="size-6 bg-ig-red text-white rounded-full p-1" />
                </h1>
                <Link href={'/settings'} className="cursor-pointer">
                    <SettingsIcon className="size-6" />
                </Link>
            </div>

            <div className="mt-10 flex items-center justify-center flex-col gap-2">
                <div className="p-2 rounded-full bg-gradient-to-tr from-ig-red to-ig-orange">
                    <div className="p-2 bg-white rounded-full">
                        <div className="aspect-square rounded-full overflow-hidden">
                            <img src="https://picsum.photos/200/300" alt="profile" />
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-bold">
                    Your Name
                </h1>
                <p className="text-sm text-gray-500 text-center">
                    Paint the town blue <br />
                    NIT Allahabad '27
                </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-10 font-bold">
                <Link href="/dashboard" className="text-gray-500 hover:text-ig-red bg-gradient-to-t from-gray-200 to-white px-5 py-2 rounded-sm">
                    Posts
                </Link>
                <Link href="/highlights" className="hover:text-ig-red">
                    Highlights
                </Link>
            </div>

            <PostsGrid />
        </div>
    );
}