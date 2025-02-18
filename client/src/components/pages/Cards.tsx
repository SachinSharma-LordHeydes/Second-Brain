import React, { useEffect } from 'react'
import SingleCard from './SingleCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getBrainData } from '../../services/operations/data';
import { useParams } from 'react-router-dom';
import { getLinkData } from '../../services/operations/link';


const Cards:React.FC=()=> {

  const {currentType}=useSelector((state:RootState)=>state.data)

  const {data,linkData} = useSelector((state: RootState) => state.data);
  const {hash}=useParams();

  let currentData;
  if(hash){
    currentData=linkData.filter((value)=>value.type.toLowerCase()===currentType.toLowerCase());
  }else{
    currentData=data.filter((value)=>value.type.toLowerCase()===currentType.toLowerCase())
  }


  function setCardData(){
    if(hash){
      dispatch(getLinkData(hash))
      currentData=linkData.filter((value)=>value.type.toLowerCase()===currentType.toLowerCase());
    }else{
      dispatch(getBrainData())
      currentData=data.filter((value)=>value.type.toLowerCase()===currentType.toLowerCase())
    }
  } 


  const dispatch=useDispatch<AppDispatch>()

  useEffect(()=>{

    setCardData()
    
  },[dispatch])

  return (
    <div>

      <div className='flex justify-center items-center'>
          {
            currentData.length===0&&
              <div>
                <p className='text-2xl font-bold'>0 {currentType} avilable</p>
              </div>
          }
      </div>

      <div className='space-y-16 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 md:gap-x-9 mx-auto'>
        {
          currentData.map((val,index)=>(
              <div key={index} className=''>
                <SingleCard link={val.link} title={val.title} shareable={val.shareable} type={val.type} id={val._id} />              
              </div>
          ))
        }
      </div>

    </div>
  )
}

export default Cards
