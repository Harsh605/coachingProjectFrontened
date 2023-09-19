import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Admin/Compontents/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../slices/userSlice'



const PanelLayout = () => {
    const dispatch = useDispatch()
  const {userData } = useSelector((state) => state.custom2)
  
  useEffect(() => {
    dispatch(loadUser())
  }, [])
    return (
        <>
            <Sidebar outlet={<Outlet/>} userData={userData}/>
        </>

    )
}

export default PanelLayout