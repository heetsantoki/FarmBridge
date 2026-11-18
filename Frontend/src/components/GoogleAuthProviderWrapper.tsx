import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Default public Google Client ID for development if not provided in .env
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1039485728491-devclientidplaceholder.apps.googleusercontent.com";

export const GoogleAuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProviderWrapper;
