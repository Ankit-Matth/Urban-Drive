"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAppSelector } from '@/lib/hooks'

const CommonLayout = ({children}) => {
    const [showCommonLayout, setShowCommonLayout] = useState(true);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userRole = useAppSelector((state) => state.role.userRole);
    const contactCategory = useAppSelector((state) => state.contact.contactCategory);

    useEffect(() => {
        if (contactCategory) {
            setShowCommonLayout(false);
        } else if (userRole !== '' && !isLoggedIn) {
            setShowCommonLayout(false);
        } else {
            setShowCommonLayout(true);
        }
    }, [contactCategory,userRole,isLoggedIn]);

    return (
        <>
            {showCommonLayout && <Header />}
            {children}
        </>
    );
}

export default CommonLayout;
