"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

// styles
import compstyle from '@/app/components.module.css';

// assets
import { defProfPic } from "../../../api/services/constants.js";
import { signOut } from "next-auth/react";

export default function DashboardHeader() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (isDropdownOpen && !event.target.closest(`.${compstyle.header_user_div}`)) {
          setDropdownOpen(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <header className={compstyle.main_header_container}>
            <h4 className={compstyle.header_title}>Accounts</h4>

            <div className={compstyle.header_user_div}>
                <button className={compstyle.header_user_btn} type="button" onClick={toggleDropdown}>
                    <div className={compstyle.user_btn_content}>
                        <p className={compstyle.user_name}>Admin</p>
                        <div className={compstyle.user_avatar_div}>
                            <Image src={defProfPic} alt="User Photo" height={38} width={38} />
                        </div>
                    </div>
                </button>
            </div>

            {isDropdownOpen && (
                <div className={compstyle.header_dropdown_div}>
                    <div className={compstyle.header_dropdown_content}>
                        <ul className={compstyle.dropdown_items}>
                            <li>
                                <Link href="/settings">Settings</Link>
                            </li>
                            <li>
                                <Link href="#" onClick={() => signOut()}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    )
}