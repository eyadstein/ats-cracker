'use server'
import * as ThirdParty from "@/lib/auth";
import {getAccessToken} from "@/lib/server-utils";
import {redirect} from "next/navigation";

export async function cvListAction(formData) {
    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
        const cvList = await ThirdParty.GetCvList(cookies.value,formData.page);
        return {
            success: true,
            cvList
        }

    }catch (error){
        console.error(error);
    }
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}




export async function cvCreateUpdate(cvData){
    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
        const response = await ThirdParty.CreateUpdateCv(cookies.value,cvData);
        return {
            success: true,
            response
        }

    }catch (error){
        console.error(error);
    }
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}



export async function cvGetAction(cvId){

    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
        const cv = await ThirdParty.GetCv(cookies.value,cvId);
        return {
            success: true,
            cv
        }

    }catch (error){
        console.error(error);
    }
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}