// pages/Helper.tsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import tokenAtom from "../hooks/tokenAtom";
import roleAtom from "../hooks/roleAtom";

const Helper = () => {
  const { role, token } = useParams();
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);
  const setRole = useSetRecoilState(roleAtom);

  useEffect(() => {
    if (role && token) {
      const decodedToken = decodeURIComponent(token);

      // Store tokens immediately across all conventional keys
      localStorage.setItem('role', role);
      localStorage.setItem('token', decodedToken);
      localStorage.setItem('authToken', decodedToken);
  
      setRole(role);
      setToken(decodedToken);
  
      // Immediate clean redirect without race condition delay
      const target = role === 'buyer' ? '/buyer-products' : (role === 'admin' ? '/farmers' : '/home');
      navigate(target, { replace: true });
    }
  }, [role, token, navigate, setRole, setToken]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-[#FBF9F5]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#1E3F2D] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h1 className="mt-4 text-base font-semibold text-[#1A261D]">
          Redirecting to dashboard...
        </h1>
      </div>
    </div>
  );
};

export default Helper;
