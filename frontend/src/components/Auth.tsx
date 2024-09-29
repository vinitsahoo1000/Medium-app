import { SignupInput } from "@vinitsahoo1000/medium-common"
import { ChangeEvent, useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}: {type: "signup" | "signin"})=>{

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup": "signin"}`,postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/blogs"); 
        }catch(e){
            alert(`Error while ${type === "signup" ? "signup": "signin"}`)
        }
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="text-3xl font-extrabold">
                Create an Account
            </div>
            <div className="text-slate-400 pt-2">
                {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                <Link className="underline hover:underline-offset-2 pl-1" to={type ==="signin" ? "/signup": "/signin"}>
                    {type === "signin" ? "Sign up" : "Sign in"}
                </Link> 
            </div>
            <div>
                {type ==="signup" ?  <LabelledInput label="Name" placeholder="Vinit Sahoo" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} type="text"/>: null}
            
                <LabelledInput label="Username" placeholder="example123@gmail.com" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} type="text"/>
            
                <LabelledInput label="Password" placeholder="1234567" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} type="password"/>
            </div>
            <div className="mt-5">
            <button onClick={sendRequest} type="button" className="py-2.5 ml-2 px-32 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{type ==="signup"?"Signup":"Signin"}</button>
            </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType){
    return <div>
        <div className="pt-3">
            <label  className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <input type={type || "text"} id="first_name" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}