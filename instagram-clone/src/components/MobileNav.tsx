import Link from "next/link";
import { CircleFadingPlus, Home, LayoutGrid, Search, User } from "lucide-react";

export default function MobileNav() {
    return (
        <div className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 text-ig-red">
          <div className="flex items-center justify-around">
            <Link href="/" className="cursor-pointer hover:text-black transition-colors duration-300">
              <Home size={24} />
            </Link>
            <Link href="/search" className="cursor-pointer hover:text-black transition-colors duration-300">
              <Search size={24} />
            </Link>
            <Link href="/create" className="cursor-pointer hover:text-black transition-colors duration-300">
              <CircleFadingPlus size={24} />
            </Link>
            <Link href="/browse" className="cursor-pointer hover:text-black transition-colors duration-300">
              <LayoutGrid size={24} />
            </Link>
            <Link href="/profile" className="cursor-pointer hover:text-black transition-colors duration-300">
              <User size={24} />
            </Link>
          </div>
        </div>
    )
}