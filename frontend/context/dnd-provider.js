'use client';

import {Suspense, useEffect, useState} from 'react';
import { DndContext } from "@/context/dnd-context";
import dynamic from 'next/dynamic';
import { resetServerContext } from "react-beautiful-dnd"

// Dynamically import DragDropContext, Droppable, and Draggable with SSR disabled
const DragDropContext = dynamic(
    () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
    { ssr: false }
);
const Droppable = dynamic(
    () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
    { ssr: false }
);
const Draggable = dynamic(
    () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
    { ssr: false }
);

export const DndProvider = ({ children }) => {
    const [componentsLoaded, setComponentsLoaded] = useState(false);

    useEffect(() => {
        if (DragDropContext && Droppable && Draggable) {
            setComponentsLoaded(true);
        }
        return () => {
            resetServerContext();
        };
    }, []);

    if (!componentsLoaded) return <div>Preparing Your CV...</div>;

    return (
        <DndContext.Provider value={{ DragDropContext, Droppable, Draggable }}>
            {children}
        </DndContext.Provider>
    );
};
