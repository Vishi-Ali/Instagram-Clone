import { Dot } from "lucide-react";
import { User } from "../../generated/prisma"

export default function Comment({
    profile, text
}:{
    profile?: User;
    text: string;
}) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center jusitfy-center bg-gray-100 p-5">
                <img src={profile?.avatar || ''} alt="Avatar" 
                    className="max-w-12 rounded-full aspect-square overflow-hidden"
                />
                <h1 className="flex font-semibold ml-2 items-center">
                    {profile?.name} <Dot />
                </h1>
                <p className="text-gray-500">
                    @{profile?.username}
                </p>
            </div>
            <p className="p-2 border-2 rounded-b-md">
                {text}
            </p>
        </div>
    )
}