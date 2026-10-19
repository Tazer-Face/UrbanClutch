import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth,authSession } from "../../../Firebase/Firebase.js";
import axios from "axios";
import { ProductDataContext } from "../../../App/Providers/ProductDataContext.js";
import { useContext } from "react";
import { useProductNavigate } from "../../../Shared/Hooks/useProductNavigate.js";

export function useLoginSignInSubmit(){

    const {userData,setUserData} = useContext(ProductDataContext);
    const {viewProduct} = useProductNavigate();

    async function onLoginSubmit(data,setLoginDisabled,setPasswordError,setServerError){

    try{
            setServerError(false)
            setPasswordError(false)
            await authSession;
            
            let res = await signInWithEmailAndPassword(auth , data.email , data.password);
            let user = res.user ;
            let token = await user.getIdToken();

            let result = await axios.post("https://api.urbanclutch.in/api/userDetails",userData,{
                    headers : {
                        Authorization : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    },
                    withCredentials: true
                }
            )
            // let result = await axios.post("http://localhost:3000/api/userDetails",userData,{
            //         headers : {
            //             Authorization : `Bearer ${token}`,
            //             'Content-Type' : 'application/json'
            //         },
            //         withCredentials: true
            //     }
            // )

            if(result.data.success){
                alert("Login successful , redirecting you to the home page")
            }

            setLoginDisabled(false)

            setUserData(prev =>({...prev, cart:(result?.data?.data?.cart|| {}),userDetails : result?.data?.data?.UserData ,
                userId :result?.data?.data?.FirebaseUid ,userOrders : (result?.data?.data?.userOrders || {})}))

            viewProduct("/")

           
        }catch(err){
            
            console.error(err?.response)
            if(!err?.response?.data.success){
                //alert("Unable to validate user , please try and login again ") 
                setServerError(true)
                setLoginDisabled(false) 
                return;
            }else if(err.code === "auth/invalid-credential"){
                setPasswordError(true)
                //alert("Wrong email or password")
            }
            
            setLoginDisabled(false)
        }
    }

    async function onSignInSubmit(data,setSignInDisabled){
        try{
            await createUserWithEmailAndPassword(auth , data.email , data.password )
            
            alert("Sign up successful , redirecting you to login.");
            setSignInDisabled(false)
            viewProduct("login")
        }catch(err){
            console.error(err);
            alert("Please ensure to use a new email id or try again in sometime as we are facing server errors")
            setSignInDisabled(false)
        }
    }

    async function onResetPassword(data,setDisableReset){
        try{
            await sendPasswordResetEmail(auth , data.email )
            
            alert("Password reset email sent. Check your inbox.");
            setDisableReset(false)
            viewProduct("login")
        }catch(err){
            console.error(err);
             alert("Unable to send password reset email.");
            setDisableReset(false)
        }
    }

    return {onLoginSubmit,onSignInSubmit,onResetPassword}
}