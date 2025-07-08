'use server'

import { headers } from "next/headers"
import { auth } from "../../../lib/auth"

export async function updateSettings() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return false
    }
    return true
}