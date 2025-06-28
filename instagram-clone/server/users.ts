'use server';

import { authClient } from "../lib/auth-client";
 
export const signIn = async (email: string, password: string) => {
    try {
        const response = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        }, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.error(error)
            }
        })
        return { success: true, data: response }
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error };
    }
}

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const response = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard"
    }, {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error(error)
        }
    });
    return { success: true, data: response }
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error: error };
    }
}