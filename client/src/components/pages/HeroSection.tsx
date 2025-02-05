import React from 'react'
import Button from '../ui/Button'
import { GrShareOption } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import Cards from './Cards'
import { useDispatch } from 'react-redux'
import { setModal } from '../../redux/slices/modalSlice'
import { AppDispatch } from '../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { getHash } from '../../services/operations/link'

function HeroSection() {

  const dispatch=useDispatch<AppDispatch>()
  const navigate=useNavigate()

  const {hash}=useParams()

  const handelShare=()=>{
      console.log("Hello")
      dispatch(getHash())

  }
  
  const handelModal=()=>{
    if(!localStorage.getItem('token')){
      console.log("token not present")
      navigate('/')
      return
    }
    dispatch(setModal())
  }

  return (
    <div className='pt-24 pl-2 md:pl-14 px-3 py-2 min-h-screen ml-32 md:ml-96'>
      <div className='flex justify-between'>
        <div>
            <p className='md:font-extrabold font-bold text-xl md:text-3xl'>All Notes</p>
        </div>
        <div className={`flex space-x-1 md:space-x-5 ${hash?"hidden":"block"}`}>
            <div>
                <Button size='lg' colour='bg-blue-200' onClickHandler={handelShare} text='Share Brain' startingIcon={<GrShareOption />}></Button>
            </div>
            <div>
                <Button size='lg' colour='bg-blue-500' onClickHandler={handelModal} text='Add Comment' startingIcon={<IoMdAdd />}></Button>
            </div>
        </div>
      </div>
      <div className='mt-16'>
        <Cards></Cards>
      </div>
    </div>
  )
}

export default HeroSection
