import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}> 
    <div className="p-4 border-b border-slate-200 pb-4 min-w-px cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} /> 
            </div>
            <div className="font-extralight text-sm flex justify-center flex-col pl-1 pr-1">{authorName}</div> 
            <div className="flex justify-center flex-col pl-2 pr-1">
                <Circle/>
            </div>
            {publishedDate}
        </div>
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+"..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-3 pb-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
    </Link>
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({name, size="small"}:{name:string , size?: "small" | "big" }){
    
return <div className={`relative inline-flex items-center justify-center overflow-hidden ${size === "small" ? "w-6 h-6" : "w-10 h-10"}  bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={` ${size === "small" ? "text-xs": "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>

}
