'use client'

import { Search } from "lucide-react";
import { useRouter } from "next/navigation"
import { Input } from "./ui/input";

export default function SearchForm() {
    const router = useRouter();
    return (
        <form className="flex items-center p-4 gap-4"
            action={data => {
                router.push("/search?query=" + data.get("query"))
            }}            
        >
            <Search className="cursor-pointer" />
            <Input className="w-lg" placeholder="Search..." name="query" />
        </form>
    )
}