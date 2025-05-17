export default function TeacherDashboard({ setUser, user }){
	
	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("userDetails");
		sessionStorage.removeItem("userDetails");

	}


	return(
		    <>
    		<span>Welcome Teacher {user.username}</span>
    		<button onClick={handleLogout}>Logout</button>
    		</>
    	  );
} 