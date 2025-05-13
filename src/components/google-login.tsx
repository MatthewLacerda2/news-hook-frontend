"use client";
import { Configuration } from '@/client-sdk';
import { AuthApi } from '@/client-sdk';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { CredentialResponse } from '@react-oauth/google';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

export default function GoogleLoginComponent() {

    console.log(clientId);

    const onSuccess = async (credentialResponse: CredentialResponse) => {
        console.log("Login successful", credentialResponse);

        if (!credentialResponse.credential) {
            console.error("No credential received");
            return;
        }

        const authApi = new AuthApi(new Configuration({ basePath: "http://127.0.0.1:8000" }));
        const signupResponse = await authApi.signupApiV1AuthSignupPost({
            oAuth2Request: {
                accessToken: credentialResponse.credential
            }
        });

        //TODO: Check if signup was successful (201) or user already exists (409)
        
        console.log("Response is:", signupResponse != null);
        console.log("Signup response", signupResponse);

        const loginResponse = await authApi.loginApiV1AuthLoginPost({
            oAuth2Request: {
                accessToken: credentialResponse.credential,
            },
        });
        console.log("Login response", loginResponse);
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
