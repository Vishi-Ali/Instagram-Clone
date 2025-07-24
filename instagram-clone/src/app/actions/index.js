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

export async function postComment(data) {
    const session = await auth();
    await prisma.comment.create({
        data: {
            email: session.user.email,
            comment: data.get('comment'),
            postId: data.get('postId')
        }
    })
}

export async function likePost(data) {
    const postId = data.get('postId')
    const session = await auth();
    await prisma.like.create({
        data: {
            email: session.user.email,
            postId: postId
        }
    })
    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likes: await prisma.like.count({
                where: {
                    postId: postId
                }
            })
        }
    })
}

export async function unlikePost(data) {
    const postId = data.get('postId');
    const session = await auth()
    await prisma.like.deleteMany({
        where: {
            email: session.user.email,
            postId: postId
        }
    })
    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likes: await prisma.like.count({
                where: {
                    postId: postId
                }
            })
        }
    })
}

export async function followUser(data) {
    const session = await auth();
    await prisma.follow.create({
        data: {
            followerProfile: session.user.email,
            followedProfile: data.get("profile")
        }
    })
}

export async function unfollowUser(data) {
    const session = await auth();
    await prisma.follow.deleteMany({
        where: {
            followerProfile: session.user.email,
            followedProfile: data.get("profile")
        }
    })
}