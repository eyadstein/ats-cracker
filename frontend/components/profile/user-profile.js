'use client';

import { Menu } from '@headlessui/react';
import  * as Actions  from "@/actions/login";
import {redirect} from "next/navigation";
import useAppContext from "@/hooks/useAppContext";

const UserProfileButton = ({ username }) => {

    const { logout  } = useAppContext();
    const handleLogout =async () => {
       const result = await Actions.logout();
        logout();
         if(result.success){
              redirect("/");
         }


    }


    return (<Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="h-[60px] w-[196px] rounded-md
        bg-primaryBlack text-base font-bold text-white hover:bg-opacity-90">
            Welcome, {username}
        </Menu.Button>
        <Menu.Items className="absolute left-0 mt-2 w-full bg-gray-800 text-white rounded-md shadow-md">
            <Menu.Item>
                {({ active }) => (
                    <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-2 text-left ${active ? 'bg-gray-700' : ''}`}>
                        Logout
                    </button>
                )}
            </Menu.Item>
        </Menu.Items>
    </Menu>)
};
export default UserProfileButton;
