import  { useState, useEffect, useRef, useLayoutEffect } from "react";

import iconADA from "../assets/Icon - ADA.svg";
import iconBTC from "../assets/Icon - BTC.svg";
import iconETH from "../assets/Icon - ETH.svg";
import iconSOL from "../assets/Icon - SOL.svg";
import iconXRP from "../assets/Icon - ETH.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = "http://localhost:5000";

const StockMarket: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useLayoutEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.opacity = "0";
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.opacity = "1";
          modalRef.current.style.transform = "translateY(0)";
        }
      }, 100);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/auth/signin`, {
        email,
        password,
      });

      const data = response.data as { message: string; token: string };
      toast.success("Signin successful!");
      localStorage.setItem("authToken", data.token);
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate("/");
        setIsModalOpen(false);
        setLoading(false);
      }, 1000);
    } catch (err) {
      toast.error("Signin failed!");
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/auth/signup`, {
        email,
        password,
      });

      const data = response.data as { message: string };
      toast.success(data.message || "Signup successful!");
      setTimeout(() => {
        navigate("/");
        setIsModalOpen(false);
        setLoading(false);
      }, 1000);
    } catch (err) {
      toast.error("Signup failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-700 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating Crypto Icons */}
      {[iconADA, iconBTC, iconETH, iconSOL, iconXRP,iconADA, iconBTC, iconETH, iconSOL, iconXRP,iconADA, iconBTC, iconETH, iconSOL, iconXRP,iconADA, iconBTC, iconETH, iconSOL, iconXRP,iconADA, iconBTC, iconETH, iconSOL, iconXRP].map((icon, index) => {
        const randomTop = Math.floor(Math.random() * 80) + 10;
        const randomLeft = Math.floor(Math.random() * 80) + 10;

        return (
          <img
            key={index}
            src={icon}
            alt="crypto-icon"
            className="absolute w-12 h-12 animate-pulse transition-all"
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
              opacity: "0.7",
              transitionDuration: `${1000 + index * 200}ms`,
            }}
          />
        );
      })}

      {/* Full-Screen Login/Signup Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-gray-800 p-6 rounded-lg shadow-xl w-96 relative transition-all opacity-0 transform translate-y-10"
          >
            <h2 className="text-xl font-semibold text-indigo-400 mb-4 text-center">
              {isSignup ? "Sign Up" : "Sign In"}
            </h2>

            {/* Skeleton Loader */}
            {loading ? (
              <div className="space-y-4">
                <div className="w-full h-12 bg-gray-600 animate-pulse rounded-md"></div>
                <div className="w-full h-12 bg-gray-600 animate-pulse rounded-md"></div>
                {isSignup && (
                  <div className="w-full h-12 bg-gray-600 animate-pulse rounded-md"></div>
                )}
                <div className="w-full h-12 bg-indigo-600 animate-pulse rounded-md"></div>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {isSignup && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                )}

                {/* Submit Button */}
                <button
                  className={`w-full p-3 rounded-md transition-all ${
                    isSignup
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  onClick={isSignup ? handleSignUp : handleSignIn}
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </button>

                {/* Toggle Sign Up/Sign In */}
                <p className="text-gray-400 mt-3 text-center">
                  {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                  <span
                    className="text-indigo-400 cursor-pointer"
                    onClick={() => setIsSignup(!isSignup)}
                  >
                    {isSignup ? "Sign In" : "Sign Up"}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockMarket;
