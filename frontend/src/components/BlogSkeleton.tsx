import { Circle } from "./BlogCard"


export const BlogSkeleton = ()=>{
    return <div role="status" className="max-w-xl animate-pulse ">
    <div>
    <div className="p-4 border-b border-slate-200 pb-4 cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
            <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div> 
            <div className="flex justify-center flex-col pl-2 pr-1">
                <Circle/>
            </div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        </div>
        <div className="text-xl font-bold pt-2">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-3 pb-4">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        </div>
    </div>
    </div>
    
    <span className="sr-only">Loading...</span>
</div>


}