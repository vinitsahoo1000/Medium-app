import axios from "axios"
import { Appbar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"



export const Publish = ()=>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar/>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
            <input type="text" onChange={(e) =>{
                setTitle(e.target.value)
            }} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 focus:outline-none" placeholder="Title"/>
            <TextEditor onChange={(e) =>{
                setDescription(e.target.value)
            }}/>
            <button type="submit" onClick={async()=>{
                const token = localStorage.getItem('token');
                const response = axios.post(`${BACKEND_URL}/api/v1/blog/create`, {
                    title,
                    content: description
                },{
                    headers:{
                        Authorization: token ? `Bearer ${token}` : '',
                    }
                });
                navigate(`/blog/${(await response).data.id}`)
            }} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Publish post
            </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}){

    return<div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label><textarea onChange={onChange} rows={18 } className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none" placeholder="Write your content here..."></textarea>
    </div>

}