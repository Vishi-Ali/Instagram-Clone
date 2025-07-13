'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftToLine, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { updateSettings } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface SettingsClientProps {
  profile: {
    id: string;
    avatar: string | null;
    username: string | null;
    name: string | null;
    bio: string | null;
  } | null;
}


export default function SettingsPage({ profile }: SettingsClientProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File>();
    const [avatar, setAvatar] = useState(profile?.avatar || '');

    useEffect(() => {
        if (file) {
            const data = new FormData();
            data.set("file", file);
            fetch("/api/files", {
                method: "POST",
                body: data,
            }).then(response => {
                response.json().then(url => setAvatar(url))
            })
        }
    }, [file])

    async function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setLoading(true);
        try {
            await updateSettings(formData);
            toast.success("Settings updated successfully!");
            router.push('/profile');
        }
        catch (error) {
            console.error("Error updating settings:", error);
            toast.error("Failed to update settings. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between text-3xl font-semibold w-screen p-4 shadow-md">
                <Link href="/profile" className="cursor-pointer">
                    <ArrowLeftToLine />
                </Link>
                Settings
                <div></div>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
                <form className="flex flex-col gap-4 w-xl bg-white p-6 rounded-lg shadow-md" onSubmit={handleUpdate}>
                    <input type="hidden" name="avatar" value={avatar} />
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="picture">Avatar</Label>
                        <Input 
                            type="file" id="picture" className="cursor-pointer"
                            onChange={ev => setFile(ev.target.files?.[0])}
                        />
                    </div>
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username"/>
                    </div>
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" />
                    </div>
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="bio">Bio</Label>
                        <Input type="text" id="bio" name="bio" className="min-h-25" />
                    </div>
                    <Button type="submit" variant="outline" className="w-full cursor-pointer transition-colors duration-300"> 
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save Changes"}
                    </Button>
                </form>
            </div>
        </div>
    )
}