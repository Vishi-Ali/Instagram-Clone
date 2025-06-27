'use server';

import { auth } from "../lib/auth"; 
 
export const signIn = async (email: string, password: string) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password
            },
            asResponse: true 
        });
        
        return { success: true, data: response };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error };
    }
}