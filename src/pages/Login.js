import React, { useState } from "react";
import Input from "../core/input/Input";
import { useForm } from "react-hook-form";
import API from "../services";
import { useAuth } from "../store/Auth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { dispatch } = useAuth();
  const history = useHistory();

  const [error, setError] = useState();
  const { control, handleSubmit } = useForm({
    //     resolver: yupResolver(FORM_VALIDATION),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submit = async (data) => {
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await API.login(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
      history.push("/");
    } catch (error) {
      console.log(error.response.data.message);
      const message = ["password salah", "username tidak ditemukan"];
      if (message.includes(error.response.data.message)) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong...");
      }
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gray-100 flex justify-center items-center text-center flex-col">
      <div className="rounded-lg bg-white p-10 flex justify-start items-center flex-col space-y-6">
        <div className="space-y-3">
          <h1 className="font-bold text-xl">Welcome Back</h1>
          <p className="text-gray-400 text-sm">
            Enter your credential to acces your account
          </p>
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit(submit)}>
          <Input
            label="Username"
            name="username"
            control={control}
            variant="standard"
            fullWidth
            placeholder="username/email"
          />
          <Input
            label="Password"
            name="password"
            control={control}
            variant="standard"
            type="password"
            fullWidth
            placeholder="Password"
          />
          <p
            className={`text-sm text-red-500  ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            {error}
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 rounded-lg w-full py-3 text-white transition-all">
            Sign in
          </button>
        </form>
      </div>
      <div className="text-gray-500 mt-10">
        forgot your password?
        <p className="inline text-blue-500"> Reset Password</p>
      </div>
    </div>
  );
};

export default Login;
