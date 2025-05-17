import { useState, useEffect } from 'react';

export default function AdminDashboard({ setUser, user }){
	
	const handleDelete = (indexx) => {
		const temp = JSON.parse(localStorage.getItem("teacher")) || [];
		const newtemp = temp.filter((teacher,index)=>index!== indexx);
		localStorage.setItem("teacher", JSON.stringify(newtemp));
		setTeacherData(newtemp);
	}

	const handleEdit=(indexx)=>{
    const temp = JSON.parse(localStorage.getItem("teacher")) || [];
    const selectedTeacher = temp.find((_, index) => index === indexx);
    
    setTeacherName(selectedTeacher.teacherName);
    setTeacherUsername(selectedTeacher.teacherUsername);
    setTeacherPassword(selectedTeacher.teacherPassword);
    selectSubject(selectedTeacher.subject);
    setSalary(selectedTeacher.salary);
    selectClassA(selectedTeacher.classa);
    selectClassB(selectedTeacher.classb);
    setEditIndex(indexx);

	}


	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("userDetails");
		sessionStorage.removeItem("userDetails");

	}

	const [teacherName,setTeacherName] = useState("");
	const [teacherUsername,setTeacherUsername] = useState("");
	const [subject, selectSubject] = useState('');
	const [classa,selectClassA] = useState(false);
	const [classb,selectClassB] = useState(false);
	const [teacherPassword, setTeacherPassword] = useState('');
	const [salary, setSalary] = useState(''); 
  const [teacherData, setTeacherData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);  

    useEffect(()=>{
    	const temp = JSON.parse(localStorage.getItem("teacher")) || [];
    	setTeacherData(temp); 
    },[]) 
     

	const addTeacher = (event) => {
		event.preventDefault();
      let tempObject = {
      	teacherName: teacherName,
      	teacherUsername: teacherUsername,
      	teacherPassword: teacherPassword,
      	subject: subject,
      	classa: classa,
      	classb: classb,
      	salary: salary
      }
    const temp = JSON.parse(localStorage.getItem("teacher")) || [];
    temp.push(tempObject);
    localStorage.setItem("teacher", JSON.stringify(temp));
    setTeacherData(temp); 


    setTeacherName('');
    setTeacherUsername('');
    setTeacherPassword('');
    selectSubject('');
    setSalary('');
    selectClassA(false);
    selectClassB(false);

    console.log("success!");
	}

  const updateTeacher = (event) => {
  event.preventDefault();
  const updatedTeacher = {
    teacherName,
    teacherUsername,
    teacherPassword,
    subject,
    classa,
    classb,
    salary
  };

  const temp = JSON.parse(localStorage.getItem("teacher")) || [];
  temp[editIndex] = updatedTeacher;

  localStorage.setItem("teacher", JSON.stringify(temp));
  setTeacherData(temp);

  setTeacherName('');
  setTeacherUsername('');
  setTeacherPassword('');
  selectSubject('');
  setSalary('');
  selectClassA(false);
  setClassB(false);
  setEditIndex(null);
};

	return(
		    <>
    		<span>Welcome Admin {user.username}</span>
    		<button onClick={handleLogout}>Logout</button>
            <hr/>
            <form onSubmit={ editIndex === null ? addTeacher: updateTeacher}>
             <input
               type="text"
               value={teacherName}
               placeholder="fullname"
               onChange={(event)=>setTeacherName(event.target.value)} 
               required />

             <input
               type="text"
               value={teacherUsername}
               placeholder="username"
               onChange={(event)=>setTeacherUsername(event.target.value)} 
               required />

             <input
               type="password"
               value={teacherPassword}
               placeholder="password"
               onChange={(event)=>setTeacherPassword(event.target.value)} 
               required />

             <input 
               type="number"
               placeholder="salary"
               value={salary}
               onChange={(event)=>setSalary(event.target.value)}
               required />  

               

             <select onChange={(event)=>selectSubject(event.target.value)} value={subject}>
             <option value="">Select a subject</option>
             <option value="science">Science</option>
             <option value="math">Mathematics</option>             
             </select>

             <label> Class A </label><input type="checkbox" checked={classa} onChange={(event)=>selectClassA(event.target.checked)} />
             <label> Class B </label><input type="checkbox" checked={classb} onChange={(event)=>selectClassB(event.target.checked)} />              
  
            <button type="submit"> {editIndex === null ? "Add Teacher" : "Update Teacher Info"} </button> 

            </form> 

            {teacherData && teacherData.length > 0 && (
  <div>
    <h3>Teacher List</h3>
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Subject</th>
          <th>Salary</th>
          <th></th>
          <th></th>           
        </tr>
      </thead>
      <tbody>
        {teacherData.map((teacher, index) => (
          <tr key={index}>
            <td>{teacher.teacherName}</td>
            <td>{teacher.teacherUsername}</td>
            <td>{teacher.subject}</td>
            <td>{teacher.salary}</td>
            <td><button onClick={()=>handleDelete(index)}>Delete</button></td>
            <td><button onClick={()=>handleEdit(index)}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



    		</>
    	  );
} 