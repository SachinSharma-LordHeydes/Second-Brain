import React from 'react'
import Button from '../ui/Button'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { signUpOperation } from '../../services/operations/authOperations';

interface FormValues {
    userName: string;
    password: string;
}

const SignUp: React.FC = () => {
    const dispatch=useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    // Handle form submission
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Form Data:", data);
        dispatch(signUpOperation(data,navigate))
    };

    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-400 opacity-70'>
            <div className='flex h-full justify-center items-center'>
                <div className='w-96 h-96 bg-white rounded-xl shadow-xl border-r border-b px-7 py-9 space-y-5'>
                    <div>
                        <h1 className='font-bold text-4xl'>SignUp</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-2'>
                            <label className='text-xl font-semibold' htmlFor="username">UserName</label>
                            <input
                                {...register("userName", { required: "UserName is Required" })}
                                className='border rounded-lg w-full px-2 py-1 text-xl'
                                type="text"
                                id="username"
                            />
                            {errors.userName && <p className='text-red-500 text-sm'>{errors.userName.message}</p>}
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xl font-semibold' htmlFor="password">Password</label>
                            <input
                                {...register("password", { required: "Password is Required" })}
                                className='border rounded-lg w-full px-2 py-1 text-xl'
                                type="password"
                                id="password"
                            />
                            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                        </div>
                        <div className="mt-4">
                            <Button 
                                text='Sign Up' 
                                size='lg' 
                                colour='bg-blue-700' 
                                endingIcon={<FaRegArrowAltCircleRight />} 
                                textColour='text-white'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
