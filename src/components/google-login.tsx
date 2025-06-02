"use client";
import { Configuration } from '@/client-sdk';
import { AuthApi } from '@/client-sdk';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { CredentialResponse } from '@react-oauth/google';
import { ResponseError } from '@/client-sdk/runtime';
import { useRouter } from 'next/navigation';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

export default function GoogleLoginComponent() {
    const router = useRouter();

    console.log(clientId);

    const onSuccess = async (credentialResponse: CredentialResponse) => {
        console.log("Login successful", credentialResponse);

        if (!credentialResponse.credential) {
            console.error("No credential received");
            return;
        }
        console.log("first")
        const authApi = new AuthApi(new Configuration({ basePath: "http://127.0.0.1:8000" }));
        try {
            const signupResponse = await authApi.signupApiV1AuthSignupPost({
                oAuth2Request: {
                    accessToken: credentialResponse.credential
                }
            });
            console.log("second")
            console.log("Signup successful - new user created");
            console.log("Response is:", signupResponse != null);
            console.log("Signup response", signupResponse);
        } catch (error: unknown) {
            if (error instanceof ResponseError && error.response.status === 409) {
                console.log("User already exists - proceeding with login");
            } else {
                console.error("Signup failed:", error);
                return;
            }
        }

        const loginResponse = await authApi.loginApiV1AuthLoginPost({
            oAuth2Request: {
                accessToken: credentialResponse.credential,
            },
        });
        
        // Save token and agent data to localStorage
        localStorage.setItem('accessToken', loginResponse.accessToken);
        localStorage.setItem('agentData', JSON.stringify(loginResponse.agentController));
        
        console.log("Login response", loginResponse);
        router.push('/alert-requests');
    }

    const onError = () => {
        console.log("Login failed");
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </GoogleOAuthProvider>
    );
}
