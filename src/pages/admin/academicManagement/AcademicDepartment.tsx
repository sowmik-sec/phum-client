import { useState } from "react";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TTableData } from "./AcademicFaculty";

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: academicDepartments,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepartmentsQuery(params);
  console.log(academicDepartments);

  console.log({ isLoading, isFetching });

  const tableData = academicDepartments?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty?.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
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

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
