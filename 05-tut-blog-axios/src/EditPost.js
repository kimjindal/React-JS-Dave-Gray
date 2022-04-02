import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditPost = ({
    posts,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
    handleEdit,
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    return (
        <main className="EditPost">
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className="editPostForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label>Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                        />
                        <label>Post:</label>
                        <textarea
                            id="postBody"
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            required
                        ></textarea>
                        <button
                            type="submit"
                            onClick={() => handleEdit(post.id)}
                        >
                            Submit
                        </button>
                    </form>
                </>
            )}
            {!editTitle && (
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to="/">Visit Our Homepage</Link>
                    </p>
                </>
            )}
        </main>
    );
};

export default EditPost;
