import { useState, useEffect } from "react";

export default function CreateAssignment({ postList, setPostList, user }) {
  const [text, setText] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [classX, setClass] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [arrayLength, setArrayLength] = useState(0);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [classY, setClassY] = useState("");
  const [resultmaker, setResultmaker] = useState([]);
  const [marks, setMarks] = useState([]);

  const handleSave = () => {
    let resultSheet = {};
    for (let i = 0; i < marks.length; i++) {
      resultSheet[resultmaker[i].studentName] = marks[i];
    }

    const prevResults = JSON.parse(localStorage.getItem("resultSheets")) || [];

    const newEntry = {
      teacher: currentTeacher,
      class: classY,
      results: resultSheet,
    };

    const newResultList = [...prevResults, newEntry];
    localStorage.setItem("resultSheets", JSON.stringify(newResultList));
    console.log("Result sheet saved successfully.");

    setResultmaker([]);
    setMarks([]);
  };

  const makeresult = (e) => {
    e.preventDefault();
    let clas = classY.toLowerCase();
    let newarray = JSON.parse(localStorage.getItem("student")) || [];
    let abc = newarray.filter(
      (item) => item.studentClassroom.toLowerCase() === clas
    );
    setResultmaker(abc);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const newObject = {
      text: text,
      submissionDate: submissionDate,
      class: classX,
      comments: [],
      poster: currentTeacher,
    };
    const newTempArray = [...postList, newObject];
    setPostList(newTempArray);
    localStorage.setItem("PostListKey", JSON.stringify(newTempArray));
    setText("");
    setSubmissionDate("");
    setClass("");
  };

  useEffect(() => {
    if (!user || !user.username) return;

    const data = JSON.parse(localStorage.getItem("teacher")) || [];
    const foundTeacher = data.find(
      (teacher) =>
        teacher.teacherUsername.toLowerCase() === user.username.toLowerCase()
    );

    if (foundTeacher) {
      const teach = foundTeacher.teacherUsername;

      const length = () => {
        let sum = 0;
        for (let i = 0; i <= 9; i++) {
          const classKey = "class" + String.fromCharCode(97 + i); // 'classa' to 'classj'
          if (foundTeacher[classKey]) sum += 1;
        }
        return sum;
      };

      const classes = [];
      for (let i = 0; i <= 9; i++) {
        const classKey = "class" + String.fromCharCode(97 + i); // 'classa'
        if (foundTeacher[classKey]) classes.push(`Class${String.fromCharCode(65 + i)}`);
      }

      setAvailableClasses(classes);
      setArrayLength(length());
      setCurrentTeacher(teach);
    }
  }, [user]);

  return (
    <>
      <form onSubmit={handlePost} className="mb-4">
        <div className="mb-3">
          <label htmlFor="assignmentText" className="form-label">
            Assignment Text
          </label>
          <textarea
            id="assignmentText"
            required
            value={text}
            placeholder="Write your assignment..."
            onChange={(e) => setText(e.target.value)}
            className="form-control"
            rows={3}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="submissionDate" className="form-label">
            Submission Date
          </label>
          <input
            id="submissionDate"
            type="date"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="classSelect" className="form-label">
            Select Class
          </label>
          <select
            id="classSelect"
            value={classX}
            onChange={(e) => setClass(e.target.value)}
            required
            className="form-select"
          >
            <option value="">Select Class</option>
            {availableClasses.map((classItem, index) => (
              <option key={index} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Post Assignment
        </button>
      </form>

      <hr />

      <form onSubmit={makeresult} className="mb-3">
        <div className="row align-items-center g-2">
          <div className="col-auto">
            <button type="submit" className="btn btn-success">
              Create Result Sheet
            </button>
          </div>
          <div className="col-auto">
            <select
              value={classY}
              onChange={(e) => setClassY(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Class</option>
              {availableClasses.map((classItem, index) => (
                <option key={index} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {resultmaker.length > 0 && (
        <ol className="list-group list-group-numbered">
          {resultmaker.map((student, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{student.studentName}</span>
              <input
                required
                max="100"
                min="0"
                type="number"
                value={marks[index] || ""}
                onChange={(e) => {
                  const newMarks = [...marks];
                  newMarks[index] = e.target.value;
                  setMarks(newMarks);
                }}
                className="form-control form-control-sm ms-3"
                style={{ maxWidth: "80px" }}
              />
            </li>
          ))}
          <div className="mt-3">
            <button onClick={handleSave} className="btn btn-primary me-2">
              Save
            </button>
            <button
              onClick={() => setResultmaker([])}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </ol>
      )}
    </>
  );
}
