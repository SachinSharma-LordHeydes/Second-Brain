import React, { useEffect } from 'react'
import SideBar from './SideBar'
import HeroSection from './HeroSection'

function Dashboard() {
  return (
    <div>
      <div className='w-full md:w-10/11 mx-auto '>
        <div className=''>
          <SideBar></SideBar>
          <HeroSection></HeroSection>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
