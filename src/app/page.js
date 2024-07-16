"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { setRole } from "@/lib/features/role/roleSlice";
import { showCommonLayout , hideCommonLayout } from "@/lib/features/layout/layoutSlice";

import WranglerImage from "/public/images/wrangler.png";
import CarForRent from "/public/images/carForRent.jpeg";

import { testimonials, riderSteps, driverSteps } from "@/lib/staticData";

import LeftArrowSVG from "/public/svgs/leftIcon.svg";
import RightArrowSVG from "/public/svgs/rightIcon.svg";
import QuotesSVG from "/public/svgs/quotes.svg";

export default function Home() {
  const dispatch = useAppDispatch();

  const [displayedIndices, setDisplayedIndices] = useState([0, 1]);
  const [isPrevClicked, setIsPrevClicked] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [slideCounter, setSlideCounter] = useState(0);
  const [prevCounter, setPrevCounter] = useState(0);
  const [nextCounter, setNextCounter] = useState(0);
  const [visibleIndices, setVisibleIndices] = useState([0, 1]);
  const [hiddenIndices, setHiddenIndices] = useState([]);

  const updateVisibleIndices = (val) => {
    if (val === "next") {
      if (prevCounter > 1) {
        setVisibleIndices(displayedIndices.slice(-prevCounter - 1, -prevCounter + 1));
      } else {
        setVisibleIndices(displayedIndices.slice(-2));
      }
    } else {
      if (nextCounter > 1) {
        setVisibleIndices(displayedIndices.slice(nextCounter - 1, nextCounter + 1));
      } else {
        setVisibleIndices(displayedIndices.slice(0, 2));
      }
    }
  };

  useEffect(() => {
    setHiddenIndices(displayedIndices.filter((index) => !visibleIndices.includes(index)));
  }, [visibleIndices]);

  useEffect(() => {
    if (prevCounter > 3 && displayedIndices.length == 5) {
      setPrevCounter(3);
    }
  }, [prevCounter]);

  useEffect(() => {
    if (isNextClicked) {
      setVisibleIndices(displayedIndices.slice(-2));
      setIsNextClicked(false);
    } else {
      setVisibleIndices(displayedIndices.slice(0, 2));
    }
  }, [displayedIndices]);

  const handlePrevClick = () => {
    if (nextCounter > 0) {
      setNextCounter(nextCounter - 1);
    }

    if (displayedIndices.length > 5 || prevCounter < 3) {
      setPrevCounter(prevCounter + 1);
    }

    if (nextCounter === 0) {
      setIsPrevClicked(true);
      const newIndex = (displayedIndices[0] - 1 + testimonials.length) % testimonials.length;
      setDisplayedIndices((prevIndices) => {
        const newIndices = [newIndex, ...prevIndices].slice(0, testimonials.length);
        return newIndices;
      });

      setTimeout(() => {
        setIsPrevClicked(false);
      }, 10);
    } else {
      setSlideCounter(slideCounter - 1);
      updateVisibleIndices("prev");
    }
  };

  const handleNextClick = () => {
    setIsNextClicked(true);
    if (prevCounter > 0) {
      setPrevCounter(prevCounter - 1);
    }
    setNextCounter(nextCounter + 1);
    setSlideCounter(slideCounter + 1);

    if (prevCounter === 0) {
      const newIndex = (displayedIndices[displayedIndices.length - 1] + 1) % testimonials.length;
      setDisplayedIndices((prevIndices) => [...prevIndices, newIndex]);
    } else {
      updateVisibleIndices("next");
      setIsNextClicked(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-1">
      <div className="max-w-7xl w-full px-6">
        <div className="mt-20 mb-24">
          <div className="flex items-center justify-between">
            <div className="w-1/2 pl-12">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Find Your Ride with Urban Drive
              </h1>
              <p className="text-lg text-gray-700 mb-6 pr-12">
                Your reliable platform for booking private car rides, making travel easy and convenient.
              </p>
              <Link
                href={"/riders"}
                className="bg-blue-500 hover:bg-blue-1100 text-white p-3 rounded shadow-md">
                Book a Ride
              </Link>
            </div>
            <div className="w-1/2 flex justify-end p-4 pr-10">
              <Image src={WranglerImage} priority alt="Wrangler Image" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-20">
            <div className="w-1/2 pr-8 order-2">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Earn with Your Car on Urban Drive
              </h1>
              <p className="text-lg text-gray-700 mb-6 pr-8">
                Join us as a driver, connect with more customers, and maximize your earnings.
              </p>
              <Link
                href={"/drivers"}
                className="bg-blue-500 hover:bg-blue-1100 text-white p-3 rounded shadow-md">
                Become a Driver
              </Link>
            </div>
            <div className="w-1/2 pl-10 order-1">
              <Image
                src={CarForRent}
                width={400}
                height={400}
                alt="CarForRent Image"
                className="rounded-md shadow-md"
              />
            </div>
          </div>

          <div className="bg-white overflow-hidden mb-10 py-6 px-8 mt-14">
            <h2 className="text-5xl font-bold mb-16 text-center text-gray-900">How It Works</h2>

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-4xl font-bold mb-8 text-gray-600 w-full">For Riders</h3>
              <div className="flex justify-between items-center w-full shadow-inner">
                {riderSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center px-4 w-1/5 shadow-md pt-6">
                    <Image src={step.src} alt={step.alt} width={70} height={70} className="mb-4" />
                    <h4 className="font-bold text-lg mb-3">{index + 1 + ". " + step.title}</h4>
                    <p className="text-gray-700 h-28">{step.description}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-4xl font-bold mt-12 mb-8 text-gray-600 w-full">For Drivers</h3>
              <div className="flex justify-between items-center w-full mb-12 shadow-inner">
                {driverSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center px-4 w-1/5 shadow-md pt-6">
                    <Image src={step.src} alt={step.alt} width={70} height={70} className="mb-4" />
                    <h4 className="font-bold text-lg mb-3">{index + 1 + ". " + step.title}</h4>
                    <p className="text-gray-700 h-28">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col items-center">
            <h2 className="text-5xl font-bold mb-20 text-center text-gray-900">What Our Customers Say</h2>
            <div className="flex items-center justify-center relative w-full overflow-hidden py-3">
              <button className="bg-orange-500 p-3 mx-4 absolute left-0 z-10" onClick={handlePrevClick}>
                <Image src={LeftArrowSVG} alt="left-arrow" width={40} height={40} />
              </button>
              <div
                id="allTestinomials"
                className={`flex w-[800px]  ${isPrevClicked ? "" : "transition-transform duration-500 ease-in-out"}`}
                style={{
                  transform: `translateX(${isPrevClicked ? "-50%" : ((-1 * slideCounter) / 2) * 100 + "%"})`,
                }}
              >
                {displayedIndices.map((item, index) => (
                  <div
                    key={index}
                    testinomialindex={item}
                    className={`w-[400px] px-4 pt-10 flex flex-col flex-shrink-0 items-center justify-center ${
                      hiddenIndices.includes(item) ? "transition-opacity duration-500 opacity-0" : "opacity-100"
                    }`}
                  >
                    <div
                      className="relative text-center p-6 shadow-lg"
                      style={{
                        boxShadow: "0 6px 5px rgba(0, 0, 0, 0.3), 0 -2px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Image
                        src={testimonials[item].image}
                        alt={testimonials[item].name}
                        className="absolute left-1/2 -translate-x-1/2 -top-12"
                        height={144}
                      />
                      <p className="text-xl font-semibold pt-24">{testimonials[item].name}</p>
                      <p className="text-gray-600 pt-4 text-justify">{testimonials[item].feedback}</p>
                    </div>
                    <div className="mt-10">
                      <Image src={QuotesSVG} alt="QuotesSVG" width={40} height={40} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-orange-500 p-3 mx-4 absolute right-0 z-10" onClick={handleNextClick}>
                <Image src={RightArrowSVG} alt="right-arrow" width={40} height={40} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
