import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Countdown timer for resending OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Handle OTP input change
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp === "123456") {
      setIsOtpVerified(true);
      setError("");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Resend OTP function
  const handleResendOtp = () => {
    setCanResend(false);
    setCountdown(30);
    alert(`New OTP sent to ${email}`);
    
    // TODO: Replace with API call
  };

  // Handle password reset
  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    alert("Password successfully reset!");

    // TODO: Replace with API call to update password
    // fetch("/api/reset-password", { method: "POST", body: JSON.stringify({ email, newPassword }) })
    //   .then(response => response.json())
    //   .then(data => console.log("Password Reset:", data));

    navigate("/login"); // Redirect to login after reset
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border-2 border-indigo-300">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {isOtpVerified ? "Reset Password" : "Enter OTP"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isOtpVerified ? "Create a new password" : `OTP has been sent to ${email}`}
          </p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        {/* OTP Verification */}
        {!isOtpVerified && (
          <form onSubmit={handleSubmitOtp} className="mt-5">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                  maxLength="1"
                />
              ))}
            </div>

            {/* Submit OTP Button */}
            <button
              type="submit"
              className="mt-5 w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all text-sm font-semibold"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Resend OTP Button */}
        {!isOtpVerified && (
          <div className="mt-4 text-center">
            {canResend ? (
              <button
                onClick={handleResendOtp}
                className="text-blue-600 hover:underline font-medium"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Resend OTP in <strong>{countdown}</strong> seconds
              </p>
            )}
          </div>
        )}

        {/* Password Reset Form */}
        {isOtpVerified && (
          <form onSubmit={handlePasswordReset} className="mt-5">
            <div className="grid gap-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all text-sm font-semibold"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default OtpPage;
