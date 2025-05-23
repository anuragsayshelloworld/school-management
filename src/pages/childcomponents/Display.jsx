import { useState, useEffect } from "react";

export default function Display({ user, displayTab }) {
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);

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
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </>
      )}
    </>
  );
}
