import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice';
import {Button, Input, Logo} from './index';
import {set, useForm} from "react-hook-form";
import { useDispatch } from 'react-redux';


const Signup = () => {
    const navigate  = useNavigate();
    const dispatch  = useDispatch();
    const [error,setError] = useState(null);
    const {register, handleSubmit} = useForm();
    
    const create = async(data)=>{
        setError("");
        try {

            const data = await authService.createAccount(data);
            if(data){
                const userData = await authService.getCurrentUser();
                if(userData){
                    useDispatch(authLogin(userData));
                    navigate('/');
                }
            }

            
            
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div>
      
    </div>
  )
}

export default Signup
