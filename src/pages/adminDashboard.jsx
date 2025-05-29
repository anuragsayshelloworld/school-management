import { useState, useEffect } from 'react';

export default function AdminDashboard({ setUser, user }) {
  const [teacherName, setTeacherName] = useState("");
  const [teacherUsername, setTeacherUsername] = useState("");
  const [subject, selectSubject] = useState('');
  const [classa, selectClassA] = useState(false);
  const [classb, selectClassB] = useState(false);
  const [classc, selectClassC] = useState(false);
  const [classd, selectClassD] = useState(false);
  const [classe, selectClassE] = useState(false);
  const [classf, selectClassF] = useState(false);
  const [classg, selectClassG] = useState(false);
  const [classh, selectClassH] = useState(false);
  const [classi, selectClassI] = useState(false);
  const [classj, selectClassJ] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState('');
  const [salary, setSalary] = useState('');
  const [teacherData, setTeacherData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [studentClassroom, setStudentClassroom] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [editIndexS, setEditIndexS] = useState(null);
  const [search, setSearch] = useState('');
  const [classroomFilter, setClassroomFilter] = useState('');
  const [search2, setSearch2] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('teacher');
  const [anothererror, setanothererror] = useState('');


  const checkusername = (xxx) => {
    const datafromlsteacher = JSON.parse(localStorage.getItem("teacher")) || [];
    const datafromlsstudent = JSON.parse(localStorage.getItem("student")) || [];

    const teacherHasUsername = datafromlsteacher.some(
      (teacher) => teacher.teacherUsername === xxx
    );

    const studentHasUsername = datafromlsstudent.some(
      (student) => student.studentUsername === xxx
    );

    return teacherHasUsername || studentHasUsername;
  };


  const checkUsernameUlt = (xxx, indexxx) => {
    const dataFromLsTeacher = JSON.parse(localStorage.getItem("teacher")) || [];
    const dataFromLsStudent = JSON.parse(localStorage.getItem("student")) || [];

    const teacherHasUsername = dataFromLsTeacher.some((teacher, idx) =>
      idx !== indexxx && teacher.teacherUsername === xxx
    );

    const studentHasUsername = dataFromLsStudent.some(
      (student) => student.studentUsername === xxx
    );

    return teacherHasUsername || studentHasUsername;
  };


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userDetails");
    sessionStorage.removeItem("userDetails");
  };

  const handleDelete = (indexx) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const temp = JSON.parse(localStorage.getItem("teacher")) || [];
      const newtemp = temp.filter((_, index) => index !== indexx);
      localStorage.setItem("teacher", JSON.stringify(newtemp));
      setTeacherData(newtemp);
    }
  };

  const handleEdit = (indexx) => {
    const temp = JSON.parse(localStorage.getItem("teacher")) || [];
    const selectedTeacher = temp[indexx];
    setTeacherName(selectedTeacher.teacherName);
    setTeacherUsername(selectedTeacher.teacherUsername);
    setTeacherPassword(selectedTeacher.teacherPassword);
    selectSubject(selectedTeacher.subject);
    setSalary(selectedTeacher.salary);
    selectClassA(selectedTeacher.classa);
    selectClassB(selectedTeacher.classb);
    selectClassC(selectedTeacher.classc);
    selectClassD(selectedTeacher.classd);
    selectClassE(selectedTeacher.classe);
    selectClassF(selectedTeacher.classf);
    selectClassG(selectedTeacher.classg);
    selectClassH(selectedTeacher.classh);
    selectClassI(selectedTeacher.classi);
    selectClassJ(selectedTeacher.classj);
    setEditIndex(indexx);
  };

  const addTeacher = (e) => {
    e.preventDefault();
    let role = 1;
    const tempObject = {
      teacherName,
      teacherUsername,
      teacherPassword,
      subject,
      classa,
      classb,
      classc,
      classd,
      classe,
      classf,
      classg,
      classh,
      classi,
      classj,
      salary,
      role 
    };
    if (!checkusername(teacherUsername)) {
      const temp = JSON.parse(localStorage.getItem("teacher")) || [];
      temp.push(tempObject);
      localStorage.setItem("teacher", JSON.stringify(temp));
      setTeacherData(temp);
      setTeacherName('');
      setTeacherUsername('');
      setTeacherPassword('');
      selectSubject('');
      setSalary('');
      // Reset all 10 class checkboxes
      selectClassA(false);
      selectClassB(false);
      selectClassC(false);
      selectClassD(false);
      selectClassE(false);
      selectClassF(false);
      selectClassG(false);
      selectClassH(false);
      selectClassI(false);
      selectClassJ(false);
    } else {
      setError("Username already exists");
    }
  };

  const updateTeacher = (e) => {
    e.preventDefault();
    let role = 1;
    const updatedTeacher = {
      teacherName,
      teacherUsername,
      teacherPassword,
      subject,
      classa,
      classb,
      classc,
      classd,
      classe,
      classf,
      classg,
      classh,
      classi,
      classj,
      salary,
      role
    };

    const check = checkUsernameUlt(teacherUsername, editIndex);

    if (!check) {
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
      selectClassC(false);
      selectClassD(false);
      selectClassE(false);
      selectClassF(false);
      selectClassG(false);
      selectClassH(false);
      selectClassI(false);
      selectClassJ(false);
      setEditIndex(null);
    } else {
      setError("Username already exists");
    }
  };

  const handleDeleteS = (indexx) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
    const temp = JSON.parse(localStorage.getItem("student")) || [];
    const newtemp = temp.filter((_, index) => index !== indexx);
    localStorage.setItem("student", JSON.stringify(newtemp));
    setStudentData(newtemp);
  }
  };

  const handleEditS = (indexx) => {
    const temp = JSON.parse(localStorage.getItem("student")) || [];
    const selectedStudent = temp[indexx];
    setStudentName(selectedStudent.studentName);
    setStudentUsername(selectedStudent.studentUsername);
    setStudentPassword(selectedStudent.studentPassword);
    setStudentClassroom(selectedStudent.studentClassroom);
    setEditIndexS(indexx);
  };

  const addStudent = (e) => {
    e.preventDefault();
    let role = 0;
    const newStudent = {
      studentName,
      studentUsername,
      studentPassword,
      studentClassroom,
      role
    };
    if (!checkusername(studentUsername)) {
      const temp = JSON.parse(localStorage.getItem("student")) || [];
      temp.push(newStudent);
      localStorage.setItem("student", JSON.stringify(temp));
      setStudentData(temp);
      setStudentName('');
      setStudentUsername('');
      setStudentPassword('');
      setStudentClassroom('');
    }
    else {
      setanothererror("Username already exists!");
    }
  };

  const updateStudent = (e) => {
    e.preventDefault();
    let role = 0;
    const updatedStudent = {
      studentName,
      studentUsername,
      studentPassword,
      studentClassroom,
      role
    };
    const check = checkUsernameUlt(studentUsername, editIndexS);
    if (!check) {
      const temp = JSON.parse(localStorage.getItem("student")) || [];
      temp[editIndexS] = updatedStudent;
      localStorage.setItem("student", JSON.stringify(temp));
      setStudentData(temp);
      setStudentName('');
      setStudentUsername('');
      setStudentPassword('');
      setStudentClassroom('');
      setEditIndexS(null);
    }
    else {
      setanothererror("username already exists");
    }
  };

  const filteredStudentData = (studentData || []).filter((student) => {
    const keyword = search.toLowerCase();
    return (
      (student.studentName.toLowerCase().includes(keyword) ||
        student.studentUsername.toLowerCase().includes(keyword)) &&
      (classroomFilter === '' || student.studentClassroom === classroomFilter)
    );
  });

  const filteredTeacherData = (teacherData || []).filter((teacher) => {
    const keyword = search2.toLowerCase();
    return (
      teacher.teacherName.toLowerCase().includes(keyword) ||
      teacher.teacherUsername.toLowerCase().includes(keyword)
    );
  });

  useEffect(() => {
    const temp1 = JSON.parse(localStorage.getItem("teacher")) || [];
    const temp2 = JSON.parse(localStorage.getItem("student")) || [];
    setTeacherData(temp1);
    setStudentData(temp2);
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (anothererror) {
      const timer = setTimeout(() => setanothererror(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [anothererror]);


  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Welcome Admin {user.username}</h4>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
      </div>

      <div className="mb-3 d-flex gap-2">
        <button className={`btn ${activeTab === 'teacher' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('teacher')}>Teacher View</button>
        <button className={`btn ${activeTab === 'student' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setActiveTab('student')}>Student View</button>
      </div>

      {activeTab === 'teacher' && (
        <div className="row">
          <div className="col-md-4">
            <p style={{ color: 'red' }}><i>{error}</i></p>
            <form onSubmit={editIndex === null ? addTeacher : updateTeacher}>
              <input className="form-control mb-2" placeholder="Name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Username" value={teacherUsername} onChange={(e) => setTeacherUsername(e.target.value)} required />
              <input type="password" className="form-control mb-2" placeholder="Password" value={teacherPassword} onChange={(e) => setTeacherPassword(e.target.value)} required />
              <input type="number" className="form-control mb-2" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
              <select className="form-select mb-2" value={subject} onChange={(e) => selectSubject(e.target.value)} required>
                <option value="">Select Subject</option>
                <option value="science">Science</option>
                <option value="math">Mathematics</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="geography">Geography</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="computerscience">Computer Science</option>
                <option value="arts">Arts</option>
              </select>
              <div className="mb-3">
                <h6>Select Classes</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classa} onChange={(e) => selectClassA(e.target.checked)} />
                      <label className="form-check-label">Class A</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classb} onChange={(e) => selectClassB(e.target.checked)} />
                      <label className="form-check-label">Class B</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classc} onChange={(e) => selectClassC(e.target.checked)} />
                      <label className="form-check-label">Class C</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classd} onChange={(e) => selectClassD(e.target.checked)} />
                      <label className="form-check-label">Class D</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classe} onChange={(e) => selectClassE(e.target.checked)} />
                      <label className="form-check-label">Class E</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classf} onChange={(e) => selectClassF(e.target.checked)} />
                      <label className="form-check-label">Class F</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classg} onChange={(e) => selectClassG(e.target.checked)} />
                      <label className="form-check-label">Class G</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classh} onChange={(e) => selectClassH(e.target.checked)} />
                      <label className="form-check-label">Class H</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classi} onChange={(e) => selectClassI(e.target.checked)} />
                      <label className="form-check-label">Class I</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={classj} onChange={(e) => selectClassJ(e.target.checked)} />
                      <label className="form-check-label">Class J</label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2">{editIndex === null ? 'Add Teacher' : 'Update Teacher'}</button>
            </form>
          </div>

          <div className="col-md-8">
            <input type="text" className="form-control mb-2" placeholder="Search teachers" value={search2} onChange={(e) => setSearch2(e.target.value)} />
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Subject</th>
                    <th>Classes</th>
                    <th>Salary</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeacherData.map((teacher, index) => (
                    <tr key={index}>
                      <td>{teacher.teacherName}</td>
                      <td>{teacher.teacherUsername}</td>
                      <td>{teacher.subject}</td>
                      <td>
                        {[
                          teacher.classa && 'A',
                          teacher.classb && 'B',
                          teacher.classc && 'C',
                          teacher.classd && 'D',
                          teacher.classe && 'E',
                          teacher.classf && 'F',
                          teacher.classg && 'G',
                          teacher.classh && 'H',
                          teacher.classi && 'I',
                          teacher.classj && 'J'
                        ].filter(Boolean).join(', ')}
                      </td>
                      <td>{teacher.salary}</td>
                      <td><button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button></td>
                      <td><button className="btn btn-sm btn-warning" onClick={() => handleEdit(index)}>Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'student' && (
        <div className="row">
          <div className="col-md-4">
            <p style={{ color: 'red' }}><i>{anothererror}</i></p>
            <form onSubmit={editIndexS === null ? addStudent : updateStudent}>
              <input className="form-control mb-2" placeholder="Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Username" value={studentUsername} onChange={(e) => setStudentUsername(e.target.value)} required />
              <input type="password" className="form-control mb-2" placeholder="Password" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} required />
              <select className="form-select mb-2" value={studentClassroom} onChange={(e) => setStudentClassroom(e.target.value)} required>
                <option value="">Select Classroom</option>
                <option value="ClassA">Class A</option>
                <option value="ClassB">Class B</option>
                <option value="ClassC">Class C</option>
                <option value="ClassD">Class D</option>
                <option value="ClassE">Class E</option>
                <option value="ClassF">Class F</option>
                <option value="ClassG">Class G</option>
                <option value="ClassH">Class H</option>
                <option value="ClassI">Class I</option>
                <option value="ClassJ">Class J</option>
              </select>
              <button type="submit" className="btn btn-success w-100 mb-2">{editIndexS === null ? 'Add Student' : 'Update Student'}</button>
            </form>
          </div>

          <div className="col-md-8">
            <div className="d-flex gap-2 mb-2">
              <input className="form-control" placeholder="Search students" value={search} onChange={(e) => setSearch(e.target.value)} />
              <select className="form-select" value={classroomFilter} onChange={(e) => setClassroomFilter(e.target.value)}>
                <option value="">All</option>
                <option value="ClassA">Class A</option>
                <option value="ClassB">Class B</option>
                <option value="ClassC">Class C</option>
                <option value="ClassD">Class D</option>
                <option value="ClassE">Class E</option>
                <option value="ClassF">Class F</option>
                <option value="ClassG">Class G</option>
                <option value="ClassH">Class H</option>
                <option value="ClassI">Class I</option>
                <option value="ClassJ">Class J</option>
              </select>
            </div>
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Classroom</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudentData.map((student, index) => (
                    <tr key={index}>
                      <td>{student.studentName}</td>
                      <td>{student.studentUsername}</td>
                      <td>{student.studentClassroom}</td>
                      <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteS(index)}>Delete</button></td>
                      <td><button className="btn btn-sm btn-warning" onClick={() => handleEditS(index)}>Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}