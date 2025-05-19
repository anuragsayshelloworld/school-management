import {useState, useEffect} from 'react';

export default function CreateAssignment({postList, setPostList, user}) {
  const [text, setText] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [classX, setClass] = useState('');
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [arrayLength, setArrayLength] = useState(0);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [classY, setClassY] = useState('');
  const [resultmaker, setResultmaker] = useState([]);
  const [marks,setMarks] = useState([]);
  
const handleSave = () => {
  let resultSheet = {};

  for (let i = 0; i < marks.length; i++) {
    resultSheet[resultmaker[i].studentName] = marks[i];
  }
  localStorage.setItem("result",JSON.stringify(resultSheet));
    console.log("success");
    setResultmaker([]);
    setMarks([]);

};

const makeresult = (e) => {
  e.preventDefault();
  let clas = classY.toLowerCase();
  let newarray = JSON.parse(localStorage.getItem("student")) || [];
  let abc = newarray.filter((item) => item.studentClassroom.toLowerCase() === clas);
  setResultmaker(abc); 
}


  const handlePost = (event) => {
    event.preventDefault(); 
    const newObject = {
      text: text,
      submissionDate: submissionDate,
      class: classX,
      comments: [],
      poster: currentTeacher
    };
    const newTempArray = [...postList];
    newTempArray.push(newObject);
    setPostList(newTempArray);
    localStorage.setItem("PostListKey", JSON.stringify(newTempArray)); 
    setText('');
    setSubmissionDate('');
    setClass(''); 
  }
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('teacher')) || [];
    const foundTeacher = data.find(teacher => teacher.teacherUsername.toLowerCase() === user.username.toLowerCase());
    
    if (foundTeacher) {
      const teach = foundTeacher.teacherUsername;
      
      // Calculate number of classes assigned to the teacher
      const length = () => {
        let sum = 0;
        // Check all 10 classes
        if(foundTeacher.classa === true) sum += 1;
        if(foundTeacher.classb === true) sum += 1;
        if(foundTeacher.classc === true) sum += 1;
        if(foundTeacher.classd === true) sum += 1;
        if(foundTeacher.classe === true) sum += 1;
        if(foundTeacher.classf === true) sum += 1;
        if(foundTeacher.classg === true) sum += 1;
        if(foundTeacher.classh === true) sum += 1;
        if(foundTeacher.classi === true) sum += 1;
        if(foundTeacher.classj === true) sum += 1;
        return sum;
      }
      
      // Set available classes for dropdown
      const classes = [];
      if(foundTeacher.classa) classes.push("ClassA");
      if(foundTeacher.classb) classes.push("ClassB");
      if(foundTeacher.classc) classes.push("ClassC");
      if(foundTeacher.classd) classes.push("ClassD");
      if(foundTeacher.classe) classes.push("ClassE");
      if(foundTeacher.classf) classes.push("ClassF");
      if(foundTeacher.classg) classes.push("ClassG");
      if(foundTeacher.classh) classes.push("ClassH");
      if(foundTeacher.classi) classes.push("ClassI");
      if(foundTeacher.classj) classes.push("ClassJ");
      
      setAvailableClasses(classes);
      setArrayLength(length());
      setCurrentTeacher(teach);
    }
  }, [user]);
   
  return(
    <>
      <form onSubmit={handlePost}>
        <textarea
          required
          value={text}
          placeholder="Write your assignment..."
          onChange={(e) => {setText(e.target.value)}}
        ></textarea><br/>
        
        <input 
          type="date" 
          value={submissionDate} 
          onChange={(e) => setSubmissionDate(e.target.value)} 
          required
        />
        
        <select 
          value={classX} 
          onChange={(e) => setClass(e.target.value)}
          required
        >
          <option value="">Select Class</option>
          {availableClasses.map((classItem, index) => (
            <option key={index} value={classItem}>{classItem}</option>
          ))}
        </select>
        
        <button type="submit">Post Assignment</button>
      </form>
      
      <span>
        Teacher: {currentTeacher} | Classes Assigned: {arrayLength}
      </span>
      
      <hr/>
      <form onSubmit={makeresult}>
      <button type="submit">Create Result sheet</button>
      <select 
          value={classY} 
          onChange={(e) => setClassY(e.target.value)}
          required
        >
          <option value="">Select Class</option>
          {availableClasses.map((classItem, index) => (
            <option key={index} value={classItem}>{classItem}</option>
          ))}
        </select>
      </form>

{resultmaker.length > 0 && (
  <ol>
    {resultmaker.map((student, index) => (
      <li key={index}>
        {student.studentName}
        <input required max="100" min ="0"
          type="number"
          value={marks[index] || ""}
          onChange={(e) => {
            const newMarks = [...marks];
            newMarks[index] = e.target.value;
            setMarks(newMarks);
          }}
        />
      </li>
    ))}
  <button onClick={handleSave}>Save</button>
  <button onClick={()=>{setResultmaker([])}}> Cancel </button>
  </ol>

)}


    </>
  );
}