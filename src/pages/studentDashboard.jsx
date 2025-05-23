import { useEffect, useState } from "react";

export default function StudentDashboard({ setUser, user }) {
  const [classroom, setClassroom] = useState("");
  const [posts, setPosts] = useState([]);
  const [results, setResults] = useState([]);
  const [view, setView] = useState("posts"); 

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userDetails");
    sessionStorage.removeItem("userDetails");
  };

  // Load classroom for the user
  useEffect(() => {
    const studentList = JSON.parse(localStorage.getItem("student")) || [];
    const currentStudent = studentList.find(
      (item) => item.studentUsername === user.username
    );
    setClassroom(currentStudent?.studentClassroom || "");
  }, [user]);

  
  useEffect(() => {
    if (!classroom) return;

    const allPosts = JSON.parse(localStorage.getItem("PostListKey")) || [];
    const filteredPosts = allPosts
      .filter(
        (item) =>
          item.class &&
          item.class.toLowerCase() === classroom.toLowerCase()
      )
      .sort(
        (a, b) =>
          new Date(b.submissionDate).getTime() -
          new Date(a.submissionDate).getTime()
      );

    setPosts(filteredPosts);
  }, [classroom]);

  useEffect(() => {
    if (!classroom) return;

    const allResults = JSON.parse(localStorage.getItem("resultSheets")) || [];
    const filteredResults = allResults.filter(
      (item) => item.class && item.class.toLowerCase() === classroom.toLowerCase()
    );

    setResults(filteredResults);
  }, [classroom]);


  const handleAddComment = (postIndex, commentText) => {
    if (!commentText.trim()) return;

    const updatedPosts = [...posts];
    const post = updatedPosts[postIndex];


    post.comments = post.comments || [];
    post.comments.push({
      text: commentText,
      commenter: user.username,
      timestamp: new Date().toISOString(),
    });


    localStorage.setItem("PostListKey", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Welcome, {user.username}</h3>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>


      <div className="btn-group mb-4" role="group" aria-label="Toggle view">
        <button
          type="button"
          className={`btn btn-${view === "posts" ? "primary" : "outline-primary"}`}
          onClick={() => setView("posts")}
        >
          Posts
        </button>
        <button
          type="button"
          className={`btn btn-${view === "results" ? "primary" : "outline-primary"}`}
          onClick={() => setView("results")}
        >
          Results
        </button>
      </div>


      {view === "posts" && (
        <>
          <h5>Assignments for Classroom: {classroom || "N/A"}</h5>
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <div key={index} className="card mb-4 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.poster}</strong> &nbsp;
                    <small className="text-muted">
                      {new Date(item.submissionDate).toLocaleString()}
                    </small>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{item.text}</p>

                  <div>
                    <strong>Comments ({(item.comments?.length) || 0}):</strong>
                    <ul className="list-unstyled mt-2 mb-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {(item.comments || []).map((comment, cIndex) => (
                        <li
                          key={cIndex}
                          className="mb-2 p-2 border rounded"
                          style={{ backgroundColor: "#f1f2f5" }}
                        >
                          <small>
                            <strong>{comment.commenter}</strong> &nbsp;
                            <span className="text-muted" style={{ fontSize: "0.8em" }}>
                              {new Date(comment.timestamp).toLocaleString()}
                            </span>
                          </small>
                          <p className="mb-0">{comment.text}</p>
                        </li>
                      ))}
                    </ul>

                    <AddCommentInput
                      onAddComment={(text) => handleAddComment(index, text)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available for your classroom yet.</p>
          )}
        </>
      )}


      {view === "results" && (
        <>
          <h5>Results for Classroom: {classroom || "N/A"}</h5>
          {results.length > 0 ? (
            results.map((result, i) => (
              <div key={i} className="card mb-3">
                <div className="card-header">
                  <strong>Teacher:</strong> {result.teacher}
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {Object.entries(result.results).map(([studentName, mark], idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between">
                        <span>{studentName}</span>
                        <span>{mark}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No results available for your classroom yet.</p>
          )}
        </>
      )}
    </div>
  );
}


function AddCommentInput({ onAddComment }) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText);
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Comment
      </button>
    </form>
  );
}
