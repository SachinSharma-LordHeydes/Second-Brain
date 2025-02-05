import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { IoMdClose } from 'react-icons/io';
import { deleteContent, setShareableContent } from '../../services/operations/data';
import { IoShareSocialOutline, IoShareSocialSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';


interface SingleCardProps {
  link: string;
  title: string;
  type:string
  id:string,
  shareable:boolean
}


const SingleCard: React.FC<SingleCardProps> = ({ link, title,shareable,id }) => {

  const {currentType}=useSelector((state:RootState)=>state.data)
  const dispatch=useDispatch<AppDispatch>();

  const {hash}=useParams();

  const handelDeleteContent=(contentId:string)=>{
    console.log("Clicked Content ID-->",contentId)
    dispatch(deleteContent({contentId}))
  }

  const handelSetSharableContent=(shareable:boolean,contentId:string)=>{
    dispatch(setShareableContent({shareable,contentId}))
  }

  return (
    <div className=' bg-[#F5F5F5] shadow-xl shadow-gray-900 hover:shadow-gray-500 hover:shadow-lg  py-3 px-5 rounded-md'>

        <div className='flex justify-between'>
          <div className='font-bold'>{title}</div>
          <div className={`flex space-x-2 ${hash?"hidden":"block"}`}>
            <div
              onClick={()=>handelSetSharableContent(!shareable,id)}
              className='hover:cursor-pointer'
            >
             {shareable ? <IoShareSocialSharp /> : <IoShareSocialOutline />}
            </div>
            <div onClick={()=>handelDeleteContent(id)} className='hover:cursor-pointer'><IoMdClose/></div>
          </div>
        </div>
              
        <div className='flex justify-center items-center py-5 w-full md:w-72 lg:w-full'>
          {
            currentType==="videos" &&
            <div>
              <iframe 
                className='rounded-lg aspect-video w-56 md:w-56 lg:w-fit'
                src={link}
                allow="
                  accelerometer;
                  clipboard-write;
                  encrypted-media; 
                  gyroscope;
                  picture-in-picture;
                  web-share
                "
          />
            </div>
          }
          

          {
            currentType==="tweets"&&
            <div className='h-64 flex justify-center items-center mx-auto'>
              <blockquote className="twitter-tweet mx-auto flex justify-center items-center ">
                <a href={link}></a>
              </blockquote>
            </div>
          }
          
          {
            currentType==="documents"&&
            <div className='flex justify-center items-center'>
              <iframe className='w-52 lg:w-full rounded-lg flex justify-center items-center' src={link} />
            </div>
          }

        </div>
    </div>
  )
}

export default SingleCard
