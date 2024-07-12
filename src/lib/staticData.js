import SignUpIcon from "/public/icons/sign-up.png";
import LocationIcon from "/public/icons/location.png";
import CarIcon from "/public/icons/car.png";
import PayIcon from "/public/icons/pay.png";
import RefundIcon from "/public/icons/refund.png";
import RegisterIcon from "/public/icons/register.png";
import DocumentsIcon from "/public/icons/documents.png";
import NotificationsIcon from "/public/icons/notifications.png";
import ConfirmIcon from "/public/icons/confirm-drive.png";
import EarnIcon from "/public/icons/earn.png";

import DivyaArora from "/public/images/Divya Arora.png";
import ArjunSingh from "/public/images/Arjun Singh.png";
import AartiGupta from "/public/images/Aarti Gupta.png";
import AjitKumar from "/public/images/Ajit Kumar.png";
import SanjaySharma from "/public/images/Sanjay Sharma.png";

import DrivingLicenseNumImg from '/public/images/Driving License Number.png';
import DrivingLicenseImg from '/public/images/Driving License.png';
import AadhaarCardNumImg from '/public/images/Aadhaar Card Number.png';
import AadhaarCardImg from '/public/images/Aadhaar Card.png';
import PanCardNumImg from '/public/images/Pan Card Number.png';
import PanCardImg from '/public/images/Pan Card.png';
import RegistrationCertificateImg from '/public/images/Registration Certificate.png';
import VehicleInsuranceImg from '/public/images/Vehicle Insurance.jpg';
import VehiclePermitImg from '/public/images/Vehicle Permit.png';


export const riderSteps = [
    {
      src: SignUpIcon,
      alt: "Sign Up",
      title: "Sign Up",
      description: "Create your account on Urban Drive.",
    },
    {
      src: LocationIcon,
      alt: "Location Icon",
      title: "Search",
      description:
        "Find available cars by entering your location and ride details.",
    },
    {
      src: CarIcon,
      alt: "Car Icon",
      title: "Book a Ride",
      description:
        "Choose your preferred car and book your ride.",
    },
    {
      src: PayIcon,
      alt: "Pay Icon",
      title: "Pay Securely",
      description:
        "Make advance payments securely through the platform.",
    },
    {
      src: RefundIcon,
      alt: "Refund Icon",
      title: "Enjoy Your Ride",
      description:
        "Relax and enjoy your ride. Get a refund if the driver fails to arrive.",
    }
];

export const driverSteps = [
    {
      src: RegisterIcon,
      alt: "Register Icon",
      title: "Register",
      description:
        "Sign up and create your profile on Urban Drive.",
    },
    {
      src: DocumentsIcon,
      alt: "Documents Icon",
      title: "List Your Car",
      description:
        "Add your car details or documents and get verified.",
    },
    {
      src: NotificationsIcon,
      alt: "Notifications Icon",
      title: "Receive Bookings",
      description: "Get instant notifications for ride requests.",
    },
    {
      src: ConfirmIcon,
      alt: "Confirm Icon",
      title: "Confirm & Drive",
      description:
        "Confirm bookings and request some payment in advance.",
    },
    {
      src: EarnIcon,
      alt: "Earn Money",
      title: "Earn",
      description: "Maximize your earnings with each ride.",
    },
  ];


  export const testimonials = [
    {
      name: "Divya Arora",
      feedback: "Urban Drive has made my daily travel much easier. Booking a ride is now simple, and the drivers are always on time and polite. I highly recommend it!",
      image: DivyaArora
    },
    {
      name: "Arjun Singh",
      feedback: "As a driver, Urban Drive has changed how I work. I no longer need to wait at common places, and I get notified of bookings quickly. It's been great for me!",
      image: ArjunSingh
    },
    {
      name: "Aarti Gupta",
      feedback: "Finding a reliable ride has never been easier. Urban Drive provides an easy booking experience, and I always feel safe and comfortable during my rides.",
      image: AartiGupta
    },
    {
      name: "Ajit Kumar",
      feedback: "Urban Drive has helped me earn more. I can get payments in advance securely. This platform has made my life much easier as a driver.",
      image: AjitKumar
    },
    {
      name: "Sanjay Sharma",
      feedback: "I like how easy it is to book a ride with Urban Drive. The drivers are professional, and I appreciate the flexibility and convenience the platform offers.",
      image: SanjaySharma
    }
];

export const requiredDocumentsData = [
  { title: 'Enter your licence number and date of birth', description: 'If the vehicle owner name on the vehicle documents is different from mine, then I hereby confirm that I have the vehicle owner\'s consent to drive this vehicle on the Uber Platform. This declaration can be treated as a No-Objection Certificate and releases Uber from any legal obligations and consequences.', image: DrivingLicenseNumImg },
  { title: 'Take a photo of your Driving License - Front', description: '1. Upload backside of Driving Licence first if some information is present on backside before the front side upload 2. Make sure that your driver license validates the class of vehicle you are choosing to drive in Uber 3. Make sure License number, Driving License Type, your Address, Father\'s Name, D.O.B, Expiration Date and Govt logo on the License are clearly visible and the photo is not blurred', image: DrivingLicenseImg },
  { title: 'Enter your Aadhaar number', description: 'Enter your Aadhaar and we\'ll get your information from UIDAI. By sharing your Aadhar details, you hereby confirm that you have shared such details voluntarily.', image: AadhaarCardNumImg },
  { title: 'Take a photo of your Aadhaar Card', description: 'By sharing your Aadhar details, you hereby confirm that you have shared such detail voluntarily. You further confirm and consent that your Aadhar details may be shared by Uber with relevant Government authorities for the purposes provided herein.', image: AadhaarCardImg },
  { title: 'Enter your PAN number', description: 'Enter your PAN card number and we\'ll get the required information from the NSDL, or you can upload your PAN card instead.', image: PanCardNumImg },
  { title: 'Take a photo of your PAN Card', description: 'Please upload the document by taking a picture', image: PanCardImg },
  { title: 'Take a photo of your Registration Certificate (RC)', description: 'If the vehicle owner name on the vehicle documents is different from mine, then I hereby confirm that I have the vehicle owner\'s consent to drive this vehicle on the Uber Platform. This declaration can be treated as a No-Objection Certificate and releases Uber from any legal obligations and consequences.', image: RegistrationCertificateImg },
  { title: 'Take a photo of your Vehicle Insurance', description: 'Make sure photo is not blurred and these details are clearly visible - Model, Vehicle number, Chasis number, Registration Name, Start Date, Expiry Date, Financier name or Company name. You may need to submit additional photos if your document has multiple pages or sides or if first image was not clear.', image: VehicleInsuranceImg },
  { title: 'Take a photo of your Vehicle Permit', description: 'If the vehicle owner name on the vehicle documents is different from mine, then I hereby confirm that I have the vehicle owner\'s consent to drive this vehicle on the Uber Platform. This declaration can be treated as a No-Objection Certificate and releases Uber from any legal obligations and consequences.', image: VehiclePermitImg },
];
