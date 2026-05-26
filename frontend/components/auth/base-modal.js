'use client';
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import LoginModal from "@/components/auth/login-modal";
import RegisterModal from "@/components/auth/register-modal";

export default function BaseModal({isOpen, closeModal,isLogin}) {
    const [isLoginState, setIsLogin] = useState(isLogin);
    const onChangeModal = () => {

        setIsLogin(!isLoginState)
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>
                {
                    isLoginState ? <LoginModal onChangeModal={onChangeModal} closeModal={closeModal}/> : <RegisterModal onChangeModal={onChangeModal} closeModal={closeModal}/>
                }
            </Dialog>
        </Transition>
    );
}