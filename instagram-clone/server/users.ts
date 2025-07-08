'use server';

import { authClient } from "../lib/auth-client";
 
export const signIn = async (email: string, password: string) => {
    let errorOccurred = false;

    try {
        const response = await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                errorOccurred = true;
                console.log(error);
            }
        });

        if (errorOccurred) {
            return { success: false };
        }
        return { success: true };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false };
    }
}

export const signUp = async (name: string, email: string, password: string) => {
    let errorOccurred = false;

    try {
        const response = await authClient.signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                errorOccurred = true;
                console.log(error);
            }
        });

        if (errorOccurred) {
            return { success: false };
        }
        return { success: true };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false };
    }
}