"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic E.164 format validation
    return phoneRegex.test(phone);
  };
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const sendOtp = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Invalid phone number format. Use E.164 format (e.g., +1234567890)");
      return;
    }

    setError(""); // Clear error if valid
    // Call your send OTP function
    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await response.json();
    if (data.success){
      setIsOtpSent(true);
      setMessage("Sent OTP to:" + phoneNumber);
    }else{
      setMessage("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, otp }),
    });

    const data = await response.json();
    console.log(data)
    if (data.success) {
      setMessage(data.message);
      const result = await signIn("credentials", {
        redirect: false,
        phone: phoneNumber,
        otp,
      });
      console.log("signin: ", result)
       // ✅ Navigate to profile on success
      //  router.push("/settings/profile");
    } else {
      setMessage("Invalid OTP.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 shadow-md overflow-hidden'>
      <div>
        <h2>Login with OTP</h2>
        {!isOtpSent ? (
          <div>
            <input
              type="tel"
              placeholder="Enter phone number in this format: +1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={sendOtp} className="mt-4 inline-block text-blue-600 hover:underline">Send OTP</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
          </div>
        )}
        {message && <p>{message}</p>}
      </div>
      <div className="social-login">
        <button onClick={() => signIn("google")}>Login with Google</button>
      </div>
    </div>
  );
}
