"use client";
import { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { showCommonLayout , hideCommonLayout } from "@/lib/features/layout/layoutSlice";
import OTPModal from '@/components/OTPModal';
import ProfilePicSelector from '@/components/ProfilePicSelector';
import ProfilePicCropper from '@/components/ProfilePicCropper';

const RegistrationPage = () => {
  const dispatch = useAppDispatch()
  const userRole = useAppSelector((state) => state.role.userRole);
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState({});
  const [errors, setErrors] = useState({});
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPic, setSelectedPic] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);

  const validatePhoneNumber = (phone, countryData) => {
    return phone.length === countryData.format?.replace(/[^\d.]/g, '').length;
  };

  const handlePhoneChange = (phone, countryData) => {
    setPhoneNumber(phone);
    setCountry(countryData);
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
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

  const handleFileSelect = (file) => {
    setSelectedPic(URL.createObjectURL(file));
    setShowCropModal(true);
  };

  const handleCropBtnsClick = () => {
    setShowCropModal(false);
    setSelectedPic(null);
  };

  const handleNextStep = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (step === 1) {
      if (!validatePhoneNumber(phoneNumber, country)) {
        newErrors.phoneNumber = 'The phone number you entered is invalid.';
      } else {
        try {
          const response = await axios.post('/api/get-otp', { phoneNumber });
          if (response.data.isOTPSent) {
            setShowPhoneModal(true);
          } else {
            newErrors.phoneNumber = 'Sorry for the inconvenience, the OTP service is down.';
          }
        } catch (error) {
          console.error('Error in sending OTP:', error);
        }
      }
    } else if (step === 2) {
      if (!email) {
        newErrors.email = 'The email you entered is invalid.';
      } else {
        setShowEmailModal(true);
      }
    } else if (step === 3) {
      if (!name.firstName) {
        newErrors.firstName = 'First name is required.';
      }
      if (!name.lastName) {
        newErrors.lastName = 'Last name is required.';
      }
    } else if (step === 4) {
      if (!username) {
        newErrors.username = 'Username is required.';
      }
      if (!password) {
        newErrors.password = 'Password is required.';
      }
      if (!selectedPic && !croppedImage) {
        newErrors.selectedPic = '*Profile image is required.';
        setTimeout(() => {
          setErrors((prevErrors) => ({ ...prevErrors, selectedPic: null }));
        }, 4000);
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      if (step > 2) {
        setErrors({});
        setStep(step + 1);
      }
    }
  };

  const onBackClick = () => {
    setShowPhoneModal(false);
    setShowEmailModal(false);
  };

  const onVerifyOtp = () => {
    setStep(step+1);
    setShowPhoneModal(false);
    setShowEmailModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', {
        phoneNumber, country, email, fullName: name, username, password, profilePic: croppedImage, userRole
      });
      if (response.status === 200) {
        dispatch(showCommonLayout());
        router.push(userRole === "rider" ? '/riders' : '/drivers');
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error in registration:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={step === 4 ? handleSubmit : handleNextStep} className="space-y-4">
          {(step === 1 && !showPhoneModal) && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What's your phone number?</h2>
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
              <Link href="/api/auth/signin" className="text-sm text-indigo-600 underline">Already have an account?</Link>
            </>
          )}
          {(step === 2 && !showEmailModal) && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What's your email address?</h2>
              <div className='pb-2'>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What's your name?</h2>
              <div className='space-y-4'>
                <div>
                    <input
                      type="text"
                      value={name.firstName}
                      onChange={handleFirstNameChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                      placeholder="First Name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm pl-1 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                    <input
                      type="text"
                      value={name.lastName}
                      onChange={handleLastNameChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                      placeholder="Last Name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm pl-1 mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
            <ProfilePicSelector croppedImage={croppedImage}  handleFileSelect={handleFileSelect} />
            <div className="text-center">
                {errors.selectedPic && <p className="text-red-500 text-sm pb-2">{errors.selectedPic}</p>}
            </div>
            <div>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                placeholder="Username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {step === 4 ? 'Create Account' : 'Continue'}
          </button>
        </form>
      </div>

      {showPhoneModal && <OTPModal data={phoneNumber} onBackClick={onBackClick} onVerifyOtp={onVerifyOtp} />}
      {showEmailModal && <OTPModal data={email} onBackClick={onBackClick} onVerifyOtp={onVerifyOtp} />}
      {showCropModal && (
        <ProfilePicCropper selectedPic={selectedPic} setCroppedImage={setCroppedImage} handleCropSubmit={handleCropBtnsClick} />
      )}
    </div>
  );
};

export default RegistrationPage;