import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();

  return <div>this is student details page {studentId}</div>;
};

export default StudentDetails;
