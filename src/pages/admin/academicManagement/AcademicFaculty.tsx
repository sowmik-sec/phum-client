import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const {
    data: academicFaculties,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultiesQuery(undefined);
  console.log(academicFaculties);
  console.log({ isLoading, isFetching });
  const tableData = academicFaculties?.data?.map(
    ({ _id, name }: TAcademicFaculty) => ({
      key: _id,
      name,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];
  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default AcademicFaculty;
