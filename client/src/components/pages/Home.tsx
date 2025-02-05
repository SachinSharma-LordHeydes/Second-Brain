import React from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { LuBrain } from 'react-icons/lu';

const Home:React.FC=()=> {
    const navigate=useNavigate();

    const handelSignUp = () => {
        navigate("/signup")
    }

    const handelSignIn = () => {
        navigate("/signin")
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='text-center items-center'>
                <div className='flex gap-x-2 text-center items-center'>
                    <p className='text-2xl font-bold'>Create</p>
                    <p className='text-lg font-semibold'> Your</p>
                </div>
                <div className='gap-x-2 flex text-center items-center'>
                    <p className='text-lg font-semibold'>Advance Version Of</p>
                    <p className='text-2xl font-bold'>Note</p>
                </div>
                <div className='my-3 text-center items-center'>
                    <p className='text-sm font-semibold items-end w-full '>With</p>
                </div>
            </div>
            <div className='flex space-x-5 text-xl md:text-4xl justify-center items-center'>
                <div>
                    <LuBrain />
                </div>
                <div className=''>
                    <p className='font-semibold '>Second-Brain</p>
                </div>
            </div>
            <div className='flex justify-center items-center gap-x-5 mt-5'>
                <Button text='Sign Up' colour='bg-blue-200' size='xl' onClickHandler={handelSignUp}></Button>
                <Button text='Sign In' colour='bg-blue-600' size='xl' onClickHandler={handelSignIn}></Button>
            </div>
        </div>
    )
}

export default Home
