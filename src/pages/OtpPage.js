import { useState, useRef, useEffect } from 'react';

function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>OTP Input</h2>
        <div className="otp-input">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default OtpPage;
