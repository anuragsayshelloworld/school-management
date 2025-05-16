export default function StudentDashboard({ setUser, user }){
	return(
		    <>
    		<span>Welcome student {user.username}</span>
    		<button onClick={()=>setUser(null)}>Logout</button>
    		</>
    	  );
} 