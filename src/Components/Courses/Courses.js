import React, { useEffect } from 'react'
import CoursesHome from '../Home/CoursesHome'

const Courses = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <CoursesHome />
  )
}

export default Courses