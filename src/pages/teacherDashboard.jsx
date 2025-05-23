import { useEffect, useState } from 'react';
import CreateAssignment from "./childcomponents/CreateAssignment";
import Display from "./childcomponents/Display";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TeacherDashboard({ setUser, user }) {
  const [postList, setPostList] = useState(null);
  const [activeTab, setActiveTab] = useState('results');

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userDetails");
    sessionStorage.removeItem("userDetails");
  };

  useEffect(() => {
    const postArray = JSON.parse(localStorage.getItem("PostListKey")) || [];
    setPostList(postArray);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Welcome Teacher {user.username}</h4>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
      </div>
      <div className="row">
        {/* LEFT COLUMN: CreateAssignment + Posts */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">Create Assignment</div>
            <div className="card-body">
              <CreateAssignment postList={postList} setPostList={setPostList} user={user} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Toggle Display */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-info text-white d-flex justify-content-between">
              <span>View Panel</span>
              <div>
                <button
                  className={`btn btn-sm me-2 ${activeTab === 'results' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setActiveTab('results')}
                >
                  Results
                </button>
                <button
                  className={`btn btn-sm ${activeTab === 'posts' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setActiveTab('posts')}
                >
                  Posts
                </button>
              </div>
            </div>
            <div className="card-body">
              <Display user={user} displayTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
