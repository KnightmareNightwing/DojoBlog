import { useParams, useNavigate } from "react-router";
import useFetch from "./useFetch";
import { useState, useEffect} from "react";

const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog, error, isLoading} = useFetch('http://localhost:8000/blogs/' + id);
    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        if (blog) {
            setLikes(blog.likes);
        }
    }, [blog]);

    const handleClickDelete = () =>{
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        })
    }

    const handleClickLiked = () =>{
        setIsLiked(true);
        const updatedLikes = likes + 1;
        setLikes(updatedLikes)
        setTimeout(() => {
            fetch('http://localhost:8000/blogs/' + id, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ likes: updatedLikes })
            }).then(() => {
                setIsLiked(false)
                
            })
        }, 500);
    }

    const handleClickEdit = () =>{
        navigate('/edit/'+id);
    }

    return ( 
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                         <button onClick={handleClickLiked} disabled={isLiked}> 
                            {isLiked ? '❤️ Liked' : '🤍 Like'} ({likes})
                        </button>
                        <button onClick={handleClickEdit}>Edit</button>
                        <button onClick={handleClickDelete}>Delete</button>
                    </div>
                </article>
            )}

        </div>
     );
}
 
export default BlogDetails;