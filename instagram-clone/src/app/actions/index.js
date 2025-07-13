'use server'

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "../prisma-client";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/profile" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function updateSettings(data) {
  const session = await auth();
  await prisma.user.upsert({
      where: {
          email: session?.user?.email || '',
      },
      update: {
          username: data.get('username'),
          name: data.get('name'),
          bio: data.get('bio'),
          avatar: data.get('avatar'),
      },
      create: {
          email: session?.user?.email || '',
          username: data.get('username'),
          name: data.get('name'),
          bio: data.get('bio'),
          avatar: data.get('avatar'),
      }
  })
}

export async function postImage(data) {
    const session = await auth();
    const post = await prisma.post.create({
        data: {
            email: session?.user?.email,
            image: data.get("image"),
            description: data.get("description"),
        }
    })
    return post.id;
}