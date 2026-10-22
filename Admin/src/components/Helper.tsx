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
      localStorage.clear();

      localStorage.setItem('role', role);
      localStorage.setItem('token', decodedToken);
  
      setRole(role);
      setToken(decodedToken);
  
      console.log("✅ Role set:", role);
  
      setTimeout(() => {
        if (role === 'buyer') {
          navigate('/buyer-products');
        } else {
          navigate('/home');
        }
      }, 500);
    }
  }, [role, token]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <h1 className="mt-4 text-xl font-semibold text-gray-700">
          Redirecting... to <span className="text-blue-600 font-bold">{role}</span>
        </h1>
      </div>
    </div>
  );
};

export default Helper;
