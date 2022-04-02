import React, { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import postData from './postData';
import { format } from 'date-fns';
import useWindowSize from './hooks/useWindowSize';

function App() {
    const [posts, setPosts] = useState(postData);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const history = useHistory();
    const { width } = useWindowSize();

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleDelete = (id) => {
        const postList = posts.filter((post) => post.id !== id);
        setPosts(postList);
        history.push('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        history.push('/');
    };

    return (
        <div className="App">
            <Header title="React JS Blog" width={width} />
            <Nav search={search} setSearch={setSearch} />
            <Switch>
                <Route exact path="/">
                    <Home posts={searchResults} />
                </Route>
                <Route exact path="/post">
                    <NewPost
                        handleSubmit={handleSubmit}
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
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
}

export default App;
