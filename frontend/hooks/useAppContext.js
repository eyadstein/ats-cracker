"use client";

import { useContext } from 'react';
import AppContext from '../context/app-context';

const useAppContext = () => {
    return useContext(AppContext);
};

export default useAppContext;