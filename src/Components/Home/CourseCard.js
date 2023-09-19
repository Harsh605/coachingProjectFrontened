import React from "react"
import { useNavigate } from "react-router-dom"

const CourseCard = ({ courseName, courseId,course }) => {
    const navigate = useNavigate()
    const handleCourseDetail = (cur)=>{
        navigate(`${cur._id}`)
    }
    return (
        <>
            <div key={courseId} className="group relative cursor-pointer">
            <div onClick={()=>handleCourseDetail(course)} className="flex justify-center items-center bg-gradient-to-b from-[#3b39aa] to-[#220056] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-40">
                     <h3 className="text-sm text-white fs-3 text-center">
                     {courseName}
                        </h3>
                </div>
               
            </div>
        </>
    )
}

export default CourseCard