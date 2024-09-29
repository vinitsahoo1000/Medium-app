import { Blog } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const GetBlog = ({ blog }: {blog: Blog}) =>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-10 max-w-screen-xl">
            <div className="col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
                <div className="pt-1">
                    Posted on 1st February
                </div>
                <div className="pr-3 pt-8 text-xl">
                    {blog.content}
                </div>
            </div>
            <div className="ml-8 col-span-4">
                <div className="text-slate-600 text-lg">
                    Author 
                </div>
                <div className="flex">
                    <div className="pr-4 flex flex-col justify-center">
                        <Avatar size="big" name={`${blog.author.name}`}/>
                    </div>
                    <div>
                    <div className="text-xl font-bold">
                    {blog.author.name}
                    </div>
                    <div className="pt-2 text-slate-500">
                    The pen is mightier than the muse....
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
}