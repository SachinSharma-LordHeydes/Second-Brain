import React from 'react'
import Button from '../ui/Button'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { signInOperation } from '../../services/operations/authOperations';


interface FormValues {
    userName: string;
    password: string;
}

const SignIn : React.FC = () => {
    const dispatch=useDispatch<AppDispatch>()
    const navigate=useNavigate()

    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Form Data:", data);
        dispatch(signInOperation(data,navigate))
    };

  return (
    <div className='w-screen h-screen overflow-hidden bg-gray-400 opacity-70'>
        <div className='flex h-full justify-center items-center'>
            <div className='w-96 h-96 bg-white rounded-xl shadow-xl border-r border-b  px-7 py-9 space-y-5'>
                <div className=''>
                    <h1 className='font-bold text-4xl'>SignIn</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-2'>
                        <label className='text-xl font-semibold' htmlFor="">UserName</label>
                        <input 
                            {...register("userName",{required:"userName is Required"})}
                            className='border rounded-lg w-full px-2 py-1 text-xl' 
                            type="text" 
                        />
                        {errors.userName&&<p className='text-red-500 text-sm'>{errors.userName.message}</p>}
                    </div>
                    <div className='space-y-2'> 
                        <label className='text-xl font-semibold ' htmlFor="">Password</label>
                        <input 
                            {...register("password",{required:"Password is Required"})}
                            className='border rounded-lg w-full px-2 py-1 text-xl' 
                            type="password" 
                        />
                        {errors.password&&<p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    </div>
                    <div className='mt-4'>
                        <Button 
                            text='Sign In' 
                            size='lg' 
                            colour='bg-blue-700' 
                            endingIcon={<FaRegArrowAltCircleRight />} 
                            textColour='text-white'
                            type='submit'
                        />
                    </div>
                </form>
            </div>
        </div>  
    </div>
  )
}

export default SignIn
