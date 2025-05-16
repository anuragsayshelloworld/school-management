export default function AdminDashboard({ setUser, user }){
	return(
		    <>
    		<span>Welcome Admin {user.username}</span>
    		<button onClick={()=>setUser(null)}>Logout</button>
    		</>
    	  );
} 