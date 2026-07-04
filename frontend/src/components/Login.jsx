import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import DesignSchoolIllustration from "../assets/Illustration.png";

const PRIMARY_COLOR = "bg-[#6C5CE7]";
const PRIMARY_TEXT_COLOR = "text-[#A29BFE]"; 
const SECONDARY_TEXT_COLOR = "text-gray-400";
const INPUT_BG_COLOR = "bg-[#0B0F19]";
const INPUT_BORDER_COLOR = "border-gray-800";
const HOVER_COLOR = "hover:bg-[#5A4BCF]";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("shubham@example.com");
  const [password, setPassword] = useState("Shubham123!");

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleLogin = async () => {
    try {
      setError("");
      await login({ email, password });
      navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Login failed");
    }
  };

  const handleSingup = async () => {
    try {
      setError("");
      await signup({ name, email, password });
      navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-140px)] w-full items-center justify-center font-sans bg-[#0B0F19] text-gray-100 gap-8 lg:gap-16 py-6">
      {/* Visual Branding Section */}
      <div className="flex-1 hidden md:flex items-center justify-center max-w-xl w-full">
        <div className="relative w-full aspect-square rounded-3xl bg-[#131B2E]/50 border border-gray-800/80 p-8 flex items-center justify-center shadow-[inset_0_4px_30px_rgba(0,0,0,0.4)]">
          <img
            src={DesignSchoolIllustration}
            alt="Design School Login Illustration"
            className="h-[85%] w-[85%] object-contain drop-shadow-[0_10px_30px_rgba(108,92,231,0.15)] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
        </div>
      </div>

      {/* Input Form Section */}
      <div className="flex-1 w-full max-w-md">
        <div className="w-full bg-[#131B2E] border border-gray-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
          {/* Header Text */}
          <div className="mb-8 text-center">
            <h2 className={`text-xs font-bold tracking-widest uppercase mb-1 ${SECONDARY_TEXT_COLOR}`}>
              Welcome to
            </h2>
            <h1 className={`text-3xl font-black tracking-tight ${PRIMARY_TEXT_COLOR}`}>
              AI-Task-Platform
            </h1>
          </div>

          <div className="space-y-5">
            {!isLoginForm && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your First Name"
                  className={`w-full rounded-xl ${INPUT_BG_COLOR} ${INPUT_BORDER_COLOR} border px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20`}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full rounded-xl ${INPUT_BG_COLOR} ${INPUT_BORDER_COLOR} border px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                className={`w-full rounded-xl ${INPUT_BG_COLOR} ${INPUT_BORDER_COLOR} border px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20`}
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl">
                {error}
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={isLoginForm ? handleLogin : handleSingup}
                className={`w-full rounded-xl ${PRIMARY_COLOR} py-3 text-base font-bold text-white cursor-pointer transition-all ${HOVER_COLOR} active:scale-[0.99] shadow-[0_4px_25px_rgba(108,92,231,0.3)]`}
              >
                {isLoginForm ? "Sign In" : "Create Account"}
              </button>
            </div>

            <div className="pt-4 text-center text-xs font-medium">
              <p className="text-gray-500">
                {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginForm(!isLoginForm)}
                  className={`font-semibold ${PRIMARY_TEXT_COLOR} cursor-pointer hover:underline bg-transparent border-none ml-1`}
                >
                  {isLoginForm ? "Register now" : "Log in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;