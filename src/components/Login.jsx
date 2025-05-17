import { useState } from 'react';

export default function Login({ setUser }) {
  const dummyUser = [
    { username: "anurag", password: "rasengan", role: 0 },
    { username: "namrata", password: "rasengan", role: 1 },
    { username: "yamani", password: "rasengan", role: 2 }
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    let matchedUser = null;

    for (let i = 0; i < dummyUser.length; i++) {
      if (username === dummyUser[i].username && password === dummyUser[i].password) {
        matchedUser = dummyUser[i];
        break;
      }
    }

    if (matchedUser) {
      setUser(matchedUser);
      setError('');

      if (rememberMe) {
        localStorage.setItem("userDetails", JSON.stringify(matchedUser));
      }
      else{
        sessionStorage.setItem("userDetails", JSON.stringify(matchedUser));
      }

      setUsername('');
      setPassword('');
    } else {
      setError("Wrong Credentials");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <input
          type="submit"
          value="login"
        />

        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember me
        </label>
      </form>
      <span style={{ color: 'red' }}>{error}</span>
    </>
  );
}
