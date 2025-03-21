import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data } = useGetAllOfferedCoursesQuery(undefined);
  console.log("here it goes ", { data });
  return (
    <div>
      <h1> This is OfferedCourse component </h1>
    </div>
  );
};

export default OfferedCourse;
