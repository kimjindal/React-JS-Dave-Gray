import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import api from './api/post';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const history = useHistory();
    const { width } = useWindowSize();
    const { data, isLoading, fetchError } = useAxiosFetch(
        'http://localhost:3500/posts'
    );

    useEffect(() => {
        setPosts(data);
    }, [data]);

    /* replaced by useAxiosFatch custom hook */
    /*
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (error) {
                if (error.response) {
                    // Not in the 200 response range
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log(`Error: ${error.message}`);
                }
            }
        };

        fetchPosts();
    }, []);
*/

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults(filteredResults.reverse());
    }, [search, posts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };

        try {
            const response = await api.post('/posts', newPost);

            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            history.push('/');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMM dd, yyy pp');
        const updatePost = {
            id,
            title: editTitle,
            datetime,
            body: editBody,
        };

        try {
            const response = await api.put(`/posts/${id}`, updatePost);
            setPosts(
                posts.map((post) =>
                    post.id === id ? { ...response.data } : post
                )
            );
            setEditTitle('');
            setEditBody('');
            history.push('/');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);

            const postsList = posts.filter((post) => post.id !== id);
            setPosts(postsList);
            history.push('/');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <Header title="React JS Blog" width={width} />
            <Nav search={search} setSearch={setSearch} />
            <Switch>
                <Route exact path="/">
                    <Home
                        posts={searchResults}
                        isLoading={isLoading}
                        fetchError={fetchError}
                    />
                </Route>
                <Route exact path="/post">
                    <NewPost
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
                        handleSubmit={handleSubmit}
                    />
                </Route>
                <Route path="/edit/:id">
                    <EditPost
                        posts={posts}
                        editTitle={editTitle}
                        setEditTitle={setEditTitle}
                        editBody={editBody}
                        setEditBody={setEditBody}
                        handleEdit={handleEdit}
                    />
                </Route>
                <Route path="/post/:id">
                    <PostPage posts={posts} handleDelete={handleDelete} />
                </Route>
                <Route path="/about" component={About} />
                <Route path="*" component={Missing} />
            </Switch>
            <Footer />
        </div>
    );
};

export default App;
