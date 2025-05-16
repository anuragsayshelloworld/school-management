import { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './pages/studentDashboard';
import TeacherDashboard from './pages/teacherDashboard';
import AdminDashboard from './pages/adminDashboard';

export default function App(){

	const [user, setUser] = useState(null);

    if(!user){
    	return(
    		<Login setUser={setUser} />
    		);
    } 
    else if(user.role === 0){
    	return(
    		<StudentDashboard setUser={setUser} user={user}/>
    		);
    }

    else if(user.role === 1){
    	return(
           <TeacherDashboard setUser={setUser} user={user}/>  
    	);
    }

    else if(user.role === 2){
    	return(
    		<AdminDashboard setUser={setUser} user={user}/>
    		);
    }
}