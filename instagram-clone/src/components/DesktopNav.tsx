import Link from "next/link";
import { CircleFadingPlus, Home, LayoutGrid, Search, User } from "lucide-react";
import logo from "../components/Not IG Logo.png"
import Image from "next/image";

export default function DesktopNav() {
    return (
        
    <div className="hidden lg:block top-0 left-0 sticky h-screen p-5 w-xl shadow-lg bg-white">
        <div className="flex flex-col items-center justify-around h-full text-ig-red">
            <div className="flex items-center justify-center gap-2 text-black font-semibold text-xl -mt-10">
                <Image src={logo} alt="Logo" className="size-15" />
                Not Instagram
            </div>
            <Link href="/" className="flex items-center gap-4 cursor-pointer hover:text-black transition-colors duration-300">
                <Home size={24} />
                Home
            </Link>
            <Link href="/search" className="flex items-center gap-4 cursor-pointer hover:text-black transition-colors duration-300">
                <Search size={24} />
                Search
            </Link>
            <Link href="/create" className="flex items-center gap-4 cursor-pointer hover:text-black transition-colors duration-300">
                <CircleFadingPlus size={24} />
                Create
            </Link>
            <Link href="/browse" className="flex items-center gap-4 cursor-pointer hover:text-black transition-colors duration-300">
                <LayoutGrid size={24} />
                Browse
            </Link>
            <Link href="/profile" className="flex items-center gap-4 cursor-pointer hover:text-black transition-colors duration-300">
                <User size={24} />
                Profile
            </Link>
        </div>
    </div>
    )
}