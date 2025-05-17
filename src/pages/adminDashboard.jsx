import { useState, useEffect } from 'react';

export default function AdminDashboard({ setUser, user }){
	
	const handleDelete = (indexx) => {
		const temp = JSON.parse(localStorage.getItem("teacher")) || [];
		const newtemp = temp.filter((teacher,index)=>index!== indexx);
		localStorage.setItem("teacher", JSON.stringify(newtemp));
		setTeacherData(newtemp);
	}

  const handleDeleteS = (indexx) =>{

    const temp = JSON.parse(localStorage.getItem("student")) || [];
    const newtemp = temp.filter((student,index)=>index!== indexx);
    localStorage.setItem("student", JSON.stringify(newtemp));
    setStudentData(newtemp);
 
  }

  const handleEditS = (indexx) => {
   
   const temp = JSON.parse(localStorage.getItem("student")) || [];
   const selectedStudent = temp.find((_,index)=>index === indexx);
   setStudentName(selectedStudent.studentName);
   setStudentPassword(selectedStudent.studentPassword);
   setStudentClassroom(selectedStudent.studentClassroom);
   setStudentUsername(selectedStudent.studentUsername); 

   setEditIndexS(indexx);
   

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
  const [studentClassroom,setStudentClassroom] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword,setStudentPassword]= useState('');
  const [studentName,setStudentName] = useState('');
  const [studentData,setStudentData] = useState(null); 
  const [editIndexS, setEditIndexS] = useState(null);

    useEffect(()=>{
    	const temp1 = JSON.parse(localStorage.getItem("teacher")) || [];
    	setTeacherData(temp1);
      const temp2 = JSON.parse(localStorage.getItem("student")) || [];
      setStudentData(temp2); 
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
  selectClassB(false);
  setEditIndex(null);
};

const updateStudent = (event) => {
  event.preventDefault();
  const updatedStudent = {
    studentName,
    studentUsername,
    studentPassword,
    studentClassroom
  };
const temp = JSON.parse(localStorage.getItem("student")) || [];
  temp[editIndexS] = updatedStudent;


localStorage.setItem("student", JSON.stringify(temp));
  setStudentData(temp);

  setStudentName('');
  setStudentPassword('');
  setStudentClassroom('');
  setStudentUsername('');

  setEditIndexS(null);

}

const addStudent = (event) => {
 event.preventDefault();
 const tempArray = JSON.parse(localStorage.getItem("student")) || [];
 const newData = {
  studentName: studentName,
  studentUsername: studentUsername,
  studentPassword: studentPassword,
  studentClassroom: studentClassroom
 }
tempArray.push(newData);
localStorage.setItem("student",JSON.stringify(tempArray));
setStudentData(tempArray);
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

               

             <select onChange={(event)=>selectSubject(event.target.value)} value={subject} required>
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


<hr/>
<br/>
<form onSubmit={editIndexS === null ? addStudent : updateStudent}>
<input 
type="text"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
placeholder="fullname" required /> 

<input 
type="text"
value={studentUsername}
onChange={(e)=>setStudentUsername(e.target.value)}
placeholder="username" required />

<input 
type="password"
value={studentPassword}
onChange={(e)=>setStudentPassword(e.target.value)}
placeholder="password" required />

<select value={studentClassroom} onChange={(e)=>setStudentClassroom(e.target.value)} required>
<option value="">Select a class</option>
<option value="ClassA">Class A</option>
<option value="ClassB">Classs B</option>      
</select>
<button type="submit">{editIndexS === null ? "Add student" : "Update Student Info" } </button> 
</form>

{studentData && studentData.length > 0 && (
  <div>
    <h3>Student List</h3>
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Classroom</th>
          <th></th>
          <th></th>           
        </tr>
      </thead>
      <tbody>
        {studentData.map((student, index) => (
          <tr key={index}>
            <td>{student.studentName}</td>
            <td>{student.studentUsername}</td>
            <td>{student.studentClassroom}</td>
            <td><button onClick={()=>handleDeleteS(index)}>Delete</button></td>
            <td><button onClick={()=>handleEditS(index)}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


    		</>
    	  );
} 