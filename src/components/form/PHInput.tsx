import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  const { register } = useFormContext();

  return (
    <>
      {label && <label htmlFor={label}>{label}:</label>}
      <Input type={type} name={name} id={name} {...register} />
    </>
  );
};

export default PHInput;
