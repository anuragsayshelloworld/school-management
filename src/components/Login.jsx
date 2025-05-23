import { useState, useEffect } from 'react';

export default function Login({ setUser }) {
  const [dummyUser, setDummyUser] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    let dummyUser = [];
    const teacher = JSON.parse(localStorage.getItem("teacher")) || [];
    const student = JSON.parse(localStorage.getItem("student")) || [];

    for (let i = 0; i < teacher.length; i++) {
      dummyUser.push({
        username: teacher[i].teacherUsername,
        password: teacher[i].teacherPassword,
        role: teacher[i].role
      });
    }

    for (let i = 0; i < student.length; i++) {
      dummyUser.push({
        username: student[i].studentUsername,
        password: student[i].studentPassword,
        role: student[i].role
      });
    }

    dummyUser.push({ username: "yamani", password: "rasengan", role: 2 });
    setDummyUser(dummyUser);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let matchedUser = dummyUser.find(user => user.username === username && user.password === password);

    if (matchedUser) {
      setUser(matchedUser);
      setError('');
      rememberMe
        ? localStorage.setItem("userDetails", JSON.stringify(matchedUser))
        : sessionStorage.setItem("userDetails", JSON.stringify(matchedUser));
      setUsername('');
      setPassword('');
    } else {
      setError("Wrong Credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
      </div>
    </div>
  );
}
