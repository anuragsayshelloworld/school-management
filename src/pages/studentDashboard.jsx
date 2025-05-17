export default function StudentDashboard({ setUser, user }){
	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("userDetails");
		sessionStorage.removeItem("userDetails");

	}
	return(
		    <>
    		<span>Welcome student {user.username}</span>
    		<button onClick={handleLogout}>Logout</button>
    		</>
    	  );
} 