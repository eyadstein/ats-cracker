"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import AppContext from './app-context';
import { getEmailAndName } from "@/lib/utils";
import { cvCreateUpdate, cvGetAction } from "@/actions/cvs";

const AppProvider = ({ children }) => {
    const [resumeData, setResumeDataRaw] = useState(null);
    const [resumeList, setResumeList] = useState([]);
    const globalRefs = useRef({});
    const [controlPanel, setControlPanel] = useState(0);
    const [lastControlPanel, setLastControlPanel] = useState(0);
    const [currentEditIndex, setCurrentEditIndex] = useState({});
    const [user, setUser] = useState(null);
    const [saveStatus, setSaveStatus] = useState("idle");
    const [activeSection, setActiveSection] = useState(null);
    const saveTimerRef = useRef(null);
    const isAuthenticated = !!user;

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    const setControlPanelIndex = (index) => {
        setLastControlPanel(controlPanel);
        setControlPanel(index);
    };

    const syncResumeData = async (data) => {
        setSaveStatus("saving");
        try {
            const response = await cvCreateUpdate(data);
            if (!response.success) {
                throw new Error(response.message || "Save failed");
            }
            // Update ID when creating new CV — check for both 'new' and 'cvnew'
            const isNewCv = data?.id === 'new' || data?.id === 'cvnew';
            if (isNewCv && response.response?.id) {
                setResumeDataRaw(prev => ({ ...prev, id: response.response.id }));
            }
            setSaveStatus("saved");
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
            saveTimerRef.current = setTimeout(() => setSaveStatus("idle"), 2500);
        } catch (error) {
            console.error("syncResumeData error:", error);
            setSaveStatus("error");
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
            saveTimerRef.current = setTimeout(() => setSaveStatus("idle"), 3000);
        }
    };

    const defaultCv = {
        id: 'cvnew', name: 'New CV',
        data: {
            name: '', position: '', contactInformation: '', email: '',
            address: '', socialMedia: [], summary: [], educations: [],
            courses: [], workExperience: [], projects: [], skills: [], languages: [],
            titles: {
                profile: "PROFILE", experience: "EXPERIENCE", education: "EDUCATION",
                certification: "CERTIFICATION", skills: "SKILLS", languages: "LANGUAGES", projects: "PROJECTS"
            },
            order: ["contactInformation", "profile", "workExperience", "education", "courses", "skills", "languages", "projects"],
            customSections: [],
        }
    };

    const sanitizeKeys = (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(sanitizeKeys);
        const sanitized = {};
        for (const key of Object.keys(obj)) {
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
            sanitized[key] = sanitizeKeys(obj[key]);
        }
        return sanitized;
    };

    const safeSetResumeData = useCallback((newData) => {
        const merged = {
            ...defaultCv,
            ...newData,
            data: {
                ...defaultCv.data,
                ...(newData?.data || {}),
                socialMedia: newData?.data?.socialMedia || [],
                summary: newData?.data?.summary || [],
                educations: newData?.data?.educations || [],
                courses: newData?.data?.courses || [],
                workExperience: newData?.data?.workExperience || [],
                projects: newData?.data?.projects || [],
                skills: newData?.data?.skills || [],
                languages: newData?.data?.languages || [],
                customSections: newData?.data?.customSections || [],
                order: (newData?.data?.order || defaultCv.data.order).filter(k => {
                    const known = ["contactInformation", "profile", "workExperience", "education", "courses", "skills", "languages", "projects"];
                    const customKeys = (newData?.data?.customSections || []).map(s => s.key);
                    return known.includes(k) || customKeys.includes(k);
                }),
                titles: {
                    ...defaultCv.data.titles,
                    ...(newData?.data?.titles || {}),
                },
            }
        };
        const sanitized = sanitizeKeys(merged);
        setResumeDataRaw(sanitized);
        return sanitized;
    }, []);

    const getResumeWithId = async (id) => {
        if (id === 'cvnew') { safeSetResumeData({...defaultCv}); return; }
        let cv = resumeList.find(cv => cv.id == id);
        if (!cv) {
            const response = await cvGetAction(id);
            if (response.success) cv = response.cv;
        }
        safeSetResumeData(cv || {...defaultCv});
    };

    const updateResumeData = (newData) => setResumeDataRaw(newData);
    
    const OnEditSectionTitle = (e, section) => {
        const value = e.target.innerText;
        const updatedTitles = {...(resumeData?.data?.titles || {}), [section]: value};
        setResumeDataRaw({...resumeData, data: {...(resumeData?.data || {}), titles: updatedTitles}});
    };

    const checkAuthStatus = () => {
        const data = getEmailAndName();
        if (data.isAuthenticated) { if (!user) login(data); }
        else logout();
    };

    const getCompletionScore = useCallback(() => {
        if (!resumeData?.data) return 0;
        const d = resumeData.data;
        const checks = [
            !!d.name, !!d.position, !!d.email, !!d.contactInformation,
            d.summary?.length > 0, d.workExperience?.length > 0,
            d.educations?.length > 0, d.skills?.length > 0,
            d.languages?.length > 0, d.projects?.length > 0,
        ];
        return Math.round((checks.filter(Boolean).length / checks.length) * 100);
    }, [resumeData]);

    const getSectionCompletion = useCallback(() => {
        if (!resumeData?.data) return {};
        const d = resumeData.data;
        const base = {
            contactInformation: !!(d.name && d.email),
            profile: d.summary?.length > 0,
            workExperience: d.workExperience?.length > 0,
            education: d.educations?.length > 0,
            courses: d.courses?.length > 0,
            skills: d.skills?.length > 0,
            languages: d.languages?.length > 0,
            projects: d.projects?.length > 0,
        };
        (d.customSections || []).forEach(s => {
            base[s.key] = s.items?.length > 0 && s.items.some(i => i.description?.trim());
        });
        return base;
    }, [resumeData]);

    useEffect(() => {
        checkAuthStatus();
        const interval = setInterval(checkAuthStatus, 1000 * 30);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!resumeData) {
            safeSetResumeData({...defaultCv});
        }
    }, []);

    return (
        <AppContext.Provider value={{
            resumeData, setResumeData: safeSetResumeData, globalRefs, updateResumeData, OnEditSectionTitle,
            controlPanel, lastControlPanel, setControlPanelIndex,
            currentEditIndex, setCurrentEditIndex,
            user, isAuthenticated, login, logout,
            resumeList, setResumeList, syncResumeData, getResumeWithId, defaultCv,
            saveStatus, activeSection, setActiveSection,
            getCompletionScore, getSectionCompletion,
        }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
