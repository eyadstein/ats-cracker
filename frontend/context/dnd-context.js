'use client';
import {createContext, useContext} from 'react';

export const DndContext = createContext({});

const useDndContext = () => {
    return useContext(DndContext);
};

export default useDndContext;