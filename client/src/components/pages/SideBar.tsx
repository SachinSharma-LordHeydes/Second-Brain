import React, { ReactElement } from 'react'
import { CiTwitter, CiYoutube } from 'react-icons/ci'
import { FaHashtag } from 'react-icons/fa'
import { GrDocumentText } from 'react-icons/gr'
import { IoLinkSharp } from 'react-icons/io5'
import { LuBrain } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { setCurrentType } from '../../redux/slices/dataSlice'

interface sideBarInterface{
    name:string,
    icon:ReactElement
}

const SideBar:React.FC=()=> {

    const dispatch=useDispatch<AppDispatch>()
    const {currentType}=useSelector((state:RootState)=>state.data)

    const sideBarContent:sideBarInterface[]=[
        {
            name:"Tweets",
            icon:<CiTwitter />
        },
        {
            name:"Videos",
            icon:<CiYoutube />
        },
        {
            name:"Documents",
            icon:<GrDocumentText />
        },
        {
            name:"Links",
            icon:<IoLinkSharp />
        }
    ]
    {/* 'tweets', 'video', 'documents', 'links', 'tags' */}

    return (
    <div className='pt-9 px-2 py-2 min-h-screen bg-gray-100 w-32 md:w-96 fixed'>
        <div className='flex space-x-5 text-xl md:text-4xl justify-center items-center'>
            <div>
                <LuBrain />
            </div>
            <div className=''>
                <p className='font-semibold '>Second-Brain</p>
            </div>
        </div>
        <div className='md:mt-9 mt-9'>
            {
                sideBarContent.map((ele,index)=>(
                    <div onClick={()=>(dispatch(setCurrentType(ele.name.toLowerCase())))} key={index} className={`mt-2 md:mt-2 md:pl-5  hover:bg-gray-300 ${ele.name.toLowerCase()===currentType?"bg-gray-300 rounded-lg":""}`}>
                        <div className='flex items-center gap-x-1 text-md md:space-x-3 md:text-2xl hover:cursor-pointer'>
                            <div>
                                {ele.icon}
                            </div>
                            <div>
                                {ele.name}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    )
}

export default SideBar
