'use client';
import { Fragment, useState } from "react";
import BaseModal from "@/components/auth/base-modal";
import {getEmailAndName} from "@/lib/utils";
import UserProfileButton from "@/components/profile/user-profile";
import useAppContext from "@/hooks/useAppContext";

export default function LoginBtn() {
    const { isAuthenticated,user } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    return (
        <>
            {/* Login Button */}
            {
                !isAuthenticated ?
                    <button
                        onClick={openModal}
                        className="hidden h-[60px] w-[196px] items-center justify-center rounded-md bg-primaryBlack text-base font-bold text-white hover:bg-opacity-90 lg:flex"
                    >
                        Login
                    </button>
                    :
                    <UserProfileButton username={user.username}/>

            }

            {/* Modal */}
            <BaseModal isOpen={isOpen}
                       isLogin={true}
                       handleAuthAction={() => {
                       }}
                       closeModal={closeModal}
            />
        </>
    );
}
