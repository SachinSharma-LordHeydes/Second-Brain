import { AppDispatch, RootState } from '../../redux/store';
import React from 'react';
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/slices/modalSlice';
import Button from '../ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addContent } from '../../services/operations/data';
import { useNavigate } from "react-router-dom";


const CONTENT_OPTIONS = ['tweets', 'videos', 'documents', 'links'] as const

type ContentType = typeof CONTENT_OPTIONS[number]

interface FormValues {
    title: string
    link: string
    type: ContentType
}

const AddContentModal:React.FC=()=> {
    const { modalStatus } = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch<AppDispatch>()
    const navigate=useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            type: 'tweets' // Set a default value
        }
    })

    const handleModal = () => {
        dispatch(setModal())
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Form Data:", data)
        dispatch(setModal())
        dispatch(addContent(data))
    }
    
    return (
        <div>
            {modalStatus && (
                <div>
                    <div className='bg-black opacity-95 w-full h-full absolute z-40'>
                        <div className='flex h-full justify-center items-center'>
                            <div className='w-96 h-96 bg-white rounded-2xl px-9 py-3 fixed text-black'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='flex justify-end'>
                                        <IoMdClose onClick={handleModal} className='text-2xl cursor-pointer'/>
                                    </div>
                                    <div className='space-y-3 mt-1 text-xl font-semibold'>
                                        <div>
                                            <label htmlFor="title">Title</label>
                                            <input
                                                id="title"
                                                type="text"
                                                className='border rounded-md px-4 py-2 w-full'
                                                {...register("title", {
                                                    required: "Title is required"
                                                })}
                                            />
                                            {errors.title && (
                                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="link">Link</label>
                                            <input
                                                id="link"
                                                type="text"
                                                className='border rounded-md px-4 py-2 w-full'
                                                {...register("link", {
                                                    required: "Link is required"
                                                })}
                                            />
                                            {errors.link && (
                                                <p className="text-red-500 text-sm">{errors.link.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-5 grid grid-cols-2 text-lg'>
                                        {CONTENT_OPTIONS.map((option) => (
                                            <div key={option}>
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        {...register("type", {
                                                            required: "Content type is required"
                                                        })}
                                                        value={option}
                                                    />
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.type && (
                                        <p className="text-red-500 text-sm">{errors.type.message}</p>
                                    )}
                                    <div className='mt-5 flex justify-end'>
                                        <Button text='submit' textColour={'text-white'} colour='bg-blue-600' size='lg' hideText={false}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddContentModal