import { useState, useEffect } from "react";

export default function Display({ user, displayTab }) {
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  const loadData = () => {
    if (!user || !user.username) return;

    const resultSheets = JSON.parse(localStorage.getItem("resultSheets")) || [];
    const filteredResults = resultSheets.filter(
      (res) => res.teacher?.toLowerCase() === user.username.toLowerCase()
    );
    setResults(filteredResults);

    const allPosts = JSON.parse(localStorage.getItem("PostListKey")) || [];
    const filteredPosts = allPosts.filter(
      (post) => post.poster?.toLowerCase() === user.username.toLowerCase()
    );
    setPosts(filteredPosts);
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 2000);

    return () => clearInterval(interval);
  }, [user]);

  const handleCommentChange = (postIndex, value) => {
    setCommentInputs((prev) => ({ ...prev, [postIndex]: value }));
  };

  const handleAddComment = (postIndex) => {
    const commentText = commentInputs[postIndex]?.trim();
    if (!commentText) return;

    const newComment = {
      text: commentText,
      commenter: user.username,
      timestamp: new Date().toLocaleString(),
    };

    const updatedPosts = [...posts];
    if (!updatedPosts[postIndex].comments) updatedPosts[postIndex].comments = [];
    updatedPosts[postIndex].comments.push(newComment);

    setPosts(updatedPosts);
    setCommentInputs((prev) => ({ ...prev, [postIndex]: "" }));


    localStorage.setItem("PostListKey", JSON.stringify(updatedPosts));
  };

  return (
    <>
      {displayTab === "results" && (
        <>
          <h4>Your Result Sheets</h4>
          {results.length > 0 ? (
            results.map((entry, index) => (
              <div className="card mb-3" key={index}>
                <div className="card-body">
                  <h5 className="card-title">Class: {entry.class}</h5>
                  <ul className="list-group list-group-flush">
                    {Object.entries(entry.results).map(([student, mark], i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <span>{student}</span>
                        <span>{mark} marks</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No result sheets available.</p>
          )}
        </>
      )}

      {displayTab === "posts" && (
        <>
          <h4>Your Posted Assignments</h4>
          <div
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              paddingRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div className="card mb-3" key={index}>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Assignment:</strong> {post.text}
                    </p>
                    <p className="card-text">
                      <strong>Submission Date:</strong> {post.submissionDate}
                    </p>
                    <p className="card-text">
                      <strong>Class:</strong> {post.class}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Posted by: {post.poster}</small>
                    </p>


                    <hr />
                    <h6>Comments:</h6>
                    {post.comments && post.comments.length > 0 ? (
                      <ul className="list-group mb-3">
                        {post.comments.map((comment, i) => (
                          <li
                            key={i}
                            className="list-group-item"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            <strong>{comment.commenter}:</strong> {comment.text}
                            <br />
                            <small className="text-muted">{comment.timestamp}</small>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet.</p>
                    )}

                    {/* Add Comment Input */}
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment..."
                        value={commentInputs[index] || ""}
                        onChange={(e) => handleCommentChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddComment(index);
                          }
                        }}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddComment(index)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
