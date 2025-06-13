"use client";
import { AuthApi, BASE_PATH, Configuration, ResponseError } from '@/client-sdk';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

export default function GoogleLoginComponent() {
    const router = useRouter();

    const onSuccess = async (credentialResponse: CredentialResponse) => {

        if (!credentialResponse.credential) {
            console.error("No credential received");
            return;
        }
        const authApi = new AuthApi(new Configuration({ basePath: BASE_PATH }));
        try {
            await authApi.signupApiV1AuthSignupPost({
                oAuth2Request: {
                    accessToken: credentialResponse.credential
                }
            });
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
