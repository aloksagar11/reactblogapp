import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice';
import {Button,Input,Logo} from './index'
import authService from '../appwrite/auth';
import { useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Login = () => {

    const navigate = useNavigate();
    const dipatch = useDispatch();
    const {register,handleSubmit } = useForm()
    const [error, setError ] = useState(null);

    const login =  async()=>{
        setError("")
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await  authService.getCurrentUser();
                if(userData){
                    useDispatch(authLogin(userData));
                    navigate("/ ");
                }
            }
            else throw new Error('Invalid credentials');
        } catch (error) {
            setError(error.message)
        }
    }


    
  return (
    <div>
      
    </div>
  )
}

export default Login
