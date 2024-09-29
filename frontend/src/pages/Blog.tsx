import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { GetBlog } from "../components/GetBlog";


export const Blog = ()=>{
    const { id } = useParams();
    const {loading,blog} = useBlog({
        id: id || ""
    });

    if(loading){
        return <div>
            loading...
        </div>
    }

    return <div>
        <GetBlog blog={blog}/>
    </div>
}