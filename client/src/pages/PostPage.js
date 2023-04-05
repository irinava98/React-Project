import { formatISO9075 } from "date-fns";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((response) => {
            response.json().then((postInfo) => {
                setPostInfo(postInfo);
            });
        });
    }, []);

    function deletePost() {
        const confirmedDelete = confirm(`Do you want to delete the item ?`);
        if (confirmedDelete) {
            fetch(`http://localhost:4000/post/${id}`, {
                method: "DELETE"
            }).then((response) => {
                alert("Deleted successfully");
                setRedirect(true);
            });
        } else {
            setRedirect(true);
        }
    }

    function likePost(id) {
        fetch("/like", {
            method: "PUT",
            body: JSON.stringify({
                id
            })
        })
            .then((res) => res.json())
            .then((result) => {
                const newPostInfo = postInfo.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setPostInfo(newPostInfo);
            });
    }

    function unlikePost(id) {
        fetch("/unlike", {
            method: "PUT",
            body: JSON.stringify({
                id
            })
        })
            .then((res) => res.json())
            .then((result) => {
                const newPostInfo = postInfo.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setPostInfo(newPostInfo);
            });
    }

    if (!postInfo) {
        return "";
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        Edit
                    </Link>
                    <span onClick={deletePost} className="delete-btn">
                        Delete
                    </span>
                </div>
            )}
            {userInfo.id && userInfo.id !== postInfo.author._id && (
                <>
                    {postInfo.likes.includes(userInfo.id) ? (
                        <button id="like-btn" onClick={() => unlikePost(postInfo._id)}>
                            Unlike
                        </button>
                    ) : (
                        <button id="unlike-btn" onClick={() => likePost(postInfo._id)}>
                            Like
                        </button>
                    )}
                </>
            )}
            <h3>{postInfo.likes.length} likes</h3>
            <div className="image">
                <img src={"http://localhost:4000/" + postInfo.cover} />
            </div>
            <div className="content">{postInfo.content}</div>
        </div>
    );
}
