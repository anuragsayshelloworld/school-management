import { useEffect, useState } from 'react';
import CreateAssignment from "./childcomponents/CreateAssignment";
export default function TeacherDashboard({ setUser, user }){
	
	const [postList,setPostList] = useState(null);

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("userDetails");
		sessionStorage.removeItem("userDetails");

	}
	useEffect(()=>{
		const postArray = JSON.parse(localStorage.getItem("PostListKey")) || [];
		setPostList(postArray);
	},[])
    
	return(
		    <>
    		<span>Welcome Teacher {user.username}</span>
    		<button onClick={handleLogout}>Logout</button>
            <br/><hr/>

            <CreateAssignment postList={postList} setPostList={setPostList} user={user}/>
    		
            </>

    	  );
} 