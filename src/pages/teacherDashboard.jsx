export default function TeacherDashboard({ setUser, user }){
	return(
		    <>
    		<span>Welcome Teacher {user.username}</span>
    		<button onClick={()=>setUser(null)}>Logout</button>
    		</>
    	  );
} 