import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function OtpVerification() {
  const [otpData, setOtpData] = useState({ otp: '' });
  const { verifyOtp } = useContext(AuthContext);

  const handleChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtp(otpData);
  };

  return (
    <div className="auth-container">
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <input name="otp" placeholder="Enter OTP" onChange={handleChange} required />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default OtpVerification;
