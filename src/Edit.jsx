import { useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router'
import useFetch from "./useFetch";

const Edit = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const {data: blog, error, isLoading} = useFetch('http://localhost:8000/blogs/' + id);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isUpdating, setIsUpdating] = useState(false);
    const isFormValid = title.trim() !== '' && body.trim() !== '';

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
        }
    }, [blog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsUpdating(true);
        const updatedBlog = { title, body, author };
        
        fetch('http://localhost:8000/blogs/' + id,{
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedBlog)
        }).then(() => {
            setIsUpdating(false);
            navigate('/')  
        })
    }

    return ( 
        <div className="edit">
            <h2>Edit blog</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <form onSubmit={handleSubmit}>
                    <label>Blog Title:</label>
                    <input 
                        type="text" 
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Blog Body:</label>
                    <textarea 
                        required
                        style={{ height: '200px' }}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <label>Blog Author:</label>
                    <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                        <option value="mario">Mario</option>
                        <option value="yoshi">Yoshi</option>
                    </select>
                    {!isUpdating && <button disabled={!isFormValid}>Save Blog</button>}
                    {isUpdating && <button disabled>Updating blog...</button>}
                </form>
            ) }
        </div>
     );
}
 
export default Edit;