import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { menuData } from "../constants/dummy";
import Input from "../core/input/Input";
import MySelect from "../core/input/Select";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().lowercase().required("Wajib"),
  email: Yup.string().lowercase().email("email dong").required("Wajib"),
  select: Yup.string().required("Wajib"),
  password: Yup.string().required("Wajib"),
});

function Form() {
  const { control, handleSubmit, reset, register, watch } = useForm({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: {
      username: "",
      email: "",
      select: "",
      password: "",
      image: "",
    },
  });

  const image = watch("image");
  const submit = (e) => console.log(e);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Avatar alt="" src={image && URL.createObjectURL(image[0])} />
            <input type="file" {...register("image")} />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => reset()}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Form;
