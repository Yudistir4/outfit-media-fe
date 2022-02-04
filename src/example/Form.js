import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { menuData } from "../constants/dummy";
import Input from "../core/input/Input";
import MySelect from "../core/input/Select";
import Button from "@mui/material/Button";

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().lowercase().required("Wajib"),
  email: Yup.string().lowercase().email("email dong").required("Wajib"),
  select: Yup.string().required("Wajib"),
  password: Yup.string().required("Wajib"),
});

function Form() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: {
      username: "",
      email: "",
      select: "",
      password: "",
    },
  });

  const submit = (e) => console.log(e);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          name="username"
          label="Username"
          control={control}
          inputProps={{ style: { textTransform: "lowercase" } }}
        />
        <Input name="email" label="email" control={control} />
        <Input
          name="password"
          label="Password"
          control={control}
          type="password"
        />
        <MySelect
          name="select"
          control={control}
          label="umur"
          sx={{ width: "200px" }}
          menu={menuData}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Form;
