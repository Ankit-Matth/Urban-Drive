"use client"
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector } from '@/lib/hooks'

const CommonLayout = ({children}) => {
    const isCommonLayoutVisible = useAppSelector((state) => state.layout.isCommonLayoutVisible);

    return (
        <>
            {isCommonLayoutVisible && <Header />}
            {children}
            {isCommonLayoutVisible && <Footer />}
        </>
    );
}

export default CommonLayout;
