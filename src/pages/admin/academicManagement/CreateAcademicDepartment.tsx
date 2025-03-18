/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";

import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  TAcademicDepartment,
  TAcademicFaculty,
} from "../../../types/academicManagement.type";
import { academicDepartmentOptions } from "../../../constants/department";
import { TResponseRedux } from "../../../types";

const CreateAcademicDepartment = () => {
  const { data: academicFaculties, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  console.log(academicFaculties);
  if (isFetching) {
    return <p>Loading...</p>;
  }
  const academicFacultyOptions: { value: string; label: string }[] = [];
  academicFaculties?.data?.map((faculty: TAcademicFaculty) => {
    academicFacultyOptions.push({ value: faculty._id, label: faculty.name });
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    console.log(departmentData);
    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponseRedux<TAcademicDepartment>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHSelect
            label="Name"
            name="name"
            options={academicDepartmentOptions}
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
