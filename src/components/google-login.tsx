"use client";
import { AuthApi, BASE_PATH, Configuration, ResponseError } from '@/client-sdk';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const googleClientId = "205743657377-gg1iilbm7fcq4q1o7smi7c10bdhlnco0.apps.googleusercontent.com";

export default function GoogleLoginComponent() {
    const router = useRouter();

    const onSuccess = async (credentialResponse: CredentialResponse) => {

        if (!credentialResponse.credential) {
            console.error("No credential received");
            return;
        }
        const authApi = new AuthApi(new Configuration({ basePath: BASE_PATH }));
        try {
            console.log("Credential response:", credentialResponse);
            console.log("Credential response credential:", credentialResponse.credential);
            const signupResponse = await authApi.signupApiV1AuthSignupPost({
                oAuth2Request: {
                    accessToken: credentialResponse.credential
                }
            });
            console.log("Signup successful - Status:", 200);
            console.log("Signup response:", signupResponse);
        } catch (error: unknown) {
            if (error instanceof ResponseError) {
                console.log("Signup status code:", error.response.status);
                console.log("Signup error response:", error.response);
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

        console.log("Login response:", loginResponse);
        
        // Save token and agent data to localStorage
        localStorage.setItem('accessToken', loginResponse.accessToken);
        localStorage.setItem('agentData', JSON.stringify(loginResponse.agentController));
        
        router.push('/alert-requests');
    }

    const onError = () => {
        console.log("Login failed");
    }

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </GoogleOAuthProvider>
    );
}
