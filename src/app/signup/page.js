"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Cropper from 'react-easy-crop';
import getCroppedImg from "./Crop";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authSlice';

const RegistrationPage = () => {
  const userRole = useAppSelector((state) => state.role.userRole);
  const router = useRouter();
  const dispatch = useAppDispatch()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState({});
  const [errors, setErrors] = useState({});
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [isResendActive, setIsResendActive] = useState(false);
  const [timer, setTimer] = useState(5);
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);
  const [step, setStep] = useState('phone');
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPic, setSelectedPic] = useState(null);
  const otpRefs = useRef([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  useEffect(() => {
    if (showPhoneModal || showEmailModal) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      if (timer === 0) {
        setIsResendActive(true);
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [showPhoneModal, showEmailModal, timer]);

  useEffect(() => {
    const isOtpFilled = otp.every((digit) => digit !== '');
    setIsVerifyDisabled(!isOtpFilled);
  }, [otp]);

  const validatePhoneNumber = (phone, countryData) => {
    const bool = phone.length === countryData.format?.replace(/[^\d.]/g, '').length;
    return bool;
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber, country)) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: 'This phone number is invalid' }));
      return;
    }

    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
    setShowPhoneModal(true);
  };

  const handlePhoneChange = (phone, countryData) => {
    setPhoneNumber(phone);
    setCountry(countryData);
    if (phone) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'This email is invalid' }));
      return;
    }

    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    setShowEmailModal(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

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
  };

  const handleBack = () => {
    setShowPhoneModal(false);
    setShowEmailModal(false);
    setIsResendActive(false);
    setTimer(5);
    setOtp(new Array(4).fill(''));
  };

  const handleVerifyOtp = () => {
    if (step === 'phone') {
      setStep('email');
      setShowPhoneModal(false);
      setIsResendActive(false);
      setTimer(5);
      setOtp(new Array(4).fill(''));
    } else if (step === 'email') {
      setStep('name');
      setShowEmailModal(false);
    }
  };

  const handleFirstNameChange = (e) => {
    setName({ ...name, firstName: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, firstName: null }));
  };
  
  const handleLastNameChange = (e) => {
    setName({ ...name, lastName: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, lastName: null }));
  };
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, username: null }));
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: null }));
  };
  
  const handleNextStep = (e) => {
    e.preventDefault();
  
    let newErrors = {};
  
    if (!name.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!name.lastName) {
      newErrors.lastName = 'Last name is required';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    setStep('username');
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(
        selectedPic,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, selectedPic]);

  const handleCropSubmit = () => {
    getCroppedImage();
    setShowCropModal(false);
    setStep('username');
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
    setCroppedAreaPixels(null)
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    let newErrors = {};
  
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    if (!selectedPic) {
      newErrors.selectedPic = 'Profile image is required';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    // Submit final form data
    console.log({ phoneNumber, email, name, username, password, selectedPic });

    dispatch(login())

    if (userRole === "rider") {
      router.push('/riders')
    } else {
      router.push('/drivers')
    }
  };  

  const handleImgClick = () => {
    document.getElementById('imageUpload').click()
    setErrors((prevErrors) => ({ ...prevErrors, selectedPic: null }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {step === 'phone' && (
        <div className={`max-w-md w-full bg-white p-8 rounded-lg shadow-md ${showPhoneModal ? 'hidden' : 'block'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What's your phone number?</h2>
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <PhoneInput
                country={'in'}
                enableSearch={true}
                value={phoneNumber}
                onChange={handlePhoneChange}
                searchStyle={{ width: '85%' }}
                inputStyle={{ width: '100%', paddingTop: '1.2rem', paddingBottom: '1.2rem' }}
                searchPlaceholder='Search your country'
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>}
            </div>
            <Link href="/login" className="text-sm text-indigo-600 underline">Already have an account?</Link>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Continue
            </button>
          </form>
        </div>
      )}

      {step === 'email' && (
        <div className={`max-w-md w-full bg-white p-8 rounded-lg shadow-md ${showEmailModal ? 'hidden' : 'block'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What's your email address?</h2>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Continue
            </button>
          </form>
        </div>
      )}

      {(showPhoneModal || showEmailModal) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Enter the 4-digit code sent to you <br/> at {step === 'phone' ? phoneNumber : email}</h2>
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
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm">
                <span>Back</span>
              </button>
              <button
                onClick={handleVerifyOtp}
                id="verify-btn"
                className={`px-3 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm ${isVerifyDisabled && 'bg-opacity-50 cursor-not-allowed'}`}
                disabled={isVerifyDisabled}>
                <span>Verify</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'name' && (
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What's your name?</h2>
          <form onSubmit={handleNextStep} className="space-y-4">
            <div>
              <input
                type="text"
                value={name.firstName}
                onChange={handleFirstNameChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                placeholder="First name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>}
            </div>
            <div>
              <input
                type="text"
                value={name.lastName}
                onChange={handleLastNameChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                placeholder="Last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Continue
            </button>
          </form>
        </div>
      )}

      {step === 'username' && (
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleFormSubmit} className="space-y-4 mb-3">
            <div className='text-center'>
              <div className='relative inline-block my-3 mb-9'>
                <div className={`relative rounded-full overflow-hidden bg-gray-200 w-28 h-28 cursor-pointer ${croppedImage ? 'border border-black' : ''}`} onClick={handleImgClick}>
                  <img src={croppedImage || '/svgs/defaultUser.svg'} className='w-full h-full object-cover' alt='Default User' />
                </div>
                <div className='absolute bottom-0 right-0 bg-white rounded border border-gray-800 p-2 cursor-pointer' onClick={handleImgClick}>
                  <img src='/svgs/pencil.svg' className='w-4 h-4 object-contain' alt='Edit Profile' />
                </div>
              </div>
              {errors.selectedPic && <p className="text-red-500 text-sm mt-2">{errors.selectedPic}</p>}
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedPic(URL.createObjectURL(file));
                    setStep('')
                    setShowCropModal(true);
                  }
                }}/>
            </div>
            <div>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                placeholder="Username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
          </form>
        </div>
      )}

      {showCropModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-3xl font-bold mb-6">Crop Your Profile Picture</h2>
            <div className="relative w-full h-64">
              <Cropper
                image={selectedPic}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                cropShape="round"
                maxZoom={10}
                minZoom={0.8}
              />
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <span className="text-lg font-semibold">Rotate:</span>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-64 h-4 cursor-pointer bg-gray-200 rounded-md overflow-hidden appearance-none focus:outline-none"
              />
              <span className="text-lg font-semibold">{rotation}°</span>
            </div>
            <div className="flex space-x-4 mt-3">
              <button
                onClick={() => {
                  setShowCropModal(false)
                  setStep('username')
                  setCrop({ x: 0, y: 0 })
                  setZoom(1)
                  setRotation(0)
                  setCroppedAreaPixels(null)
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCropSubmit}
                className="px-3 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
