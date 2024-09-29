import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div className="w-full">
            <Appbar/>
        <div className="flex justify-center pt-3"> 
            <div className="w-full max-w-[800px]">
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
            </div>
        </div>
        </div> 
    }
    

    return <div>
        <Appbar/>
    <div className="flex justify-center pt-3">
        <div className=" max-w-xl">
            {blogs.map(blog =><BlogCard
                id={`${blog.id}`}
                authorName={blog.author.name}
                title={blog.title} 
                content={blog.content} 
                publishedDate={"1st Feb 2024"}
                />)}
        </div>
    </div>
    </div>
}