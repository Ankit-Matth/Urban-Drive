import { useState, useEffect, useRef } from 'react';

const OTPModal = ({ modalFor, phoneNumber, email, handleBack, handleVerifyOtp }) => {
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [isResendActive, setIsResendActive] = useState(false);
    const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);
    const [timer, setTimer] = useState(5);
    const otpRefs = useRef([]);

    useEffect(() => {
        const isOtpFilled = otp.every((digit) => digit !== '');
        setIsVerifyDisabled(!isOtpFilled);
    }, [otp]);

    useEffect(() => {
        let intervalId;

        if (!isResendActive) {
            intervalId = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        setIsResendActive(true);
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isResendActive]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                otpRefs.current[index - 1].focus();
            }
        }
    };

    const handleResendOtp = () => {
        setIsResendActive(false);
        setTimer(5);
        setOtp(new Array(4).fill(''));
    };

    const handleBackClick = () => {
        handleBack();
        setIsResendActive(false);
        setTimer(5);
        setOtp(new Array(4).fill(''));
    };

    const handleVerifyClick = () => {
        handleVerifyOtp();
        setIsResendActive(false);
        setTimer(5);
        setOtp(new Array(4).fill(''));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">
                    Enter the 4-digit code sent to you <br /> at {modalFor === 'phone' ? phoneNumber : email}
                </h2>
                <div className="flex space-x-2 mb-4">
                    {new Array(4).fill("").map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => otpRefs.current[index] = el}
                            className="w-12 h-12 text-center border rounded focus:outline-none focus:border-blue-500 bg-gray-50"
                            type="text"
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            style={{ marginRight: '7px' }}
                            autoFocus={index === 0}
                        />
                    ))}
                </div>
                <button
                    onClick={handleResendOtp}
                    className={`text-blue-500 mb-4 ${!isResendActive && 'cursor-not-allowed text-gray-400'}`}
                    disabled={!isResendActive}>
                    Resend Code {timer > 0 && `(${timer})`}
                </button>
                <div className="flex space-x-4 mt-3">
                    <button
                        onClick={handleBackClick}
                        className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm">
                        <span>Back</span>
                    </button>
                    <button
                        onClick={handleVerifyClick}
                        id="verify-btn"
                        className={`px-3 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm ${isVerifyDisabled && 'bg-opacity-50 cursor-not-allowed'}`}
                        disabled={isVerifyDisabled}>
                        <span>Verify</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPModal;
