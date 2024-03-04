import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async () => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          useDispatch(authLogin(userData));
          navigate("/ ");
        }
      } else throw new Error("Invalid credentials");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100px" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

        <p className="mt-2 text-center text-base text-black">
            Don&apos;t have an account? &nbsp;
            <Link to={"/signup"} className="font-medium text-primary transition-all duration-200 hover:underline
            ">
                Sign Up
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form  onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
                <Input 
                type="email"
                name="email"
                placeholder  = "Enter your email"
                {...register("email"),{
                    requied : true,
                    validate:{
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                }}
                />

                <Input
                type = "password" 
                placeholder = "Enter your password"
                name="password"
                {...register("password"),{
                    required: true,
                    minLength: {
                        value: 8,
                        message: "Minimum length should be 8 characters"

                    },
                }}
                />

                <Button 
                type="submit" className='w-full'> Sing in</Button>
            </div>
        </form>
      </div>

        
    </div>
  );
};

export default Login;
