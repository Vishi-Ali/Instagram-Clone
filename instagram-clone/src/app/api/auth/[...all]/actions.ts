"use server";

import { PrismaClient } from "@/generated/prisma";
import { auth } from "../../../../../lib/auth";
import { headers } from "next/headers";
 
export const updateDetails = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user || !session.user.email) {
        // Not logged in
        console.log("User is not logged in");
        return null;
    }

    // Logged in
    console.log("User is logged in:", session.user.email);
    // ...rest of your logic
};