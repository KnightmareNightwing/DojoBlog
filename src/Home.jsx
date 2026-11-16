import BlogList from './BlogList';
import useFetch from './useFetch';
import { useState} from "react";

const Home = () => {
    const {data: blogs, isLoading, error} = useFetch('http://localhost:8000/blogs');
    const [query, setQuery] = useState({title: '', author: ''});
    const filteredBlogs = blogs 
        ? blogs.filter((item) => {
            const matchesTitle = item.title
                .toLowerCase()
                .includes(query.title.toLowerCase());

            const matchesAuthor = query.author === '' || 
                item.author.toLowerCase() === query.author.toLowerCase();

            return matchesTitle && matchesAuthor;
            })
        : [];

    return ( 
        <div className="home">
            <div className="search-filter-bar">
                <input
                    type="search"
                    placeholder="Search blog title..."
                    value={query.title}
                    onChange={(e) => setQuery({ ...query, title: e.target.value })}
                />
                <select value={query.author} onChange={(e) => setQuery({ ...query, author: e.target.value })}>
                    <option value="">All Authors</option>
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>
            </div>
            
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={filteredBlogs} title="All Blogs!"/>}           
        </div>
     );
}
 
export default Home;