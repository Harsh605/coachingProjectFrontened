import school from "../../Images/Home/school.jpeg"
import college from "../../Images/Home/college.jpeg"
import competition from "../../Images/Home/competition.webp"
import CategoryCard from "./CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesUsingCategoryApi } from "../../slices/ProductSlice";
import { getCategories } from "../../slices/categoriesSlice";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CourseCard from "./CourseCard";

const CoursesHome = () => {

  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.custom5);
  const { singleProductCatData } = useSelector((state) => state.custom);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCategoryID, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    dispatch(getCategories())
    if (currentCategoryID) {
      dispatch(getCoursesUsingCategoryApi(currentCategoryID))
    }

  }, [dispatch, currentCategoryID, currentCategory])

  const { categoryList } = data


  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setCurrentCategoryId(category._id);
  };


  const handleBackButtonClick = () => {
    setCurrentCategory(null);
  };

  const renderCategories = () => {
    return (
      categoryList && categoryList.map((cat,id) => (
        <div key={id} onClick={() => handleCategoryClick(cat)}>
          <CategoryCard catName={cat.name}  catId={cat.id} />
        </div>
      ))
    )
  };

  // const handleCourseDetails = (curCourse) => {
  //   console.log(curCourse)
  // }

  const renderSubcategories = (subcategories) => {
    return subcategories.map((subcategory,id) => (
      <div key={id} onClick={() => {
        if (subcategory.children) { handleCategoryClick(subcategory) }
      }}>
        <CategoryCard catName={subcategory.name} catId={subcategory.id} />
      </div>
    ));
  };

  const handleCourseClick = (subcategory) => {
    setCurrentCategory(subcategory);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="bigHeading pt-4 pb-10 font-semibold xl:text-5xl lg:text-4xl md:text-4xl text-3xl text-white lg:leading-[2.5rem] 2xl:leading-[3.7rem]">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4361EE] to-[#4CC9F0]">
            Our Courses
          </span>
        </h1>

        <Button variant="contained" sx={{ backgroundColor: "darkBlue" }} onClick={handleBackButtonClick}>⬅ Go to back </Button>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {
            currentCategory ?
              (singleProductCatData.length > 0 ?
                (
                  singleProductCatData.map((course,id) => (
                    <CourseCard key={id} course={course} courseName={course.name}  courseId={course.id} />
                  ))
                )
                : (currentCategory.children && (renderSubcategories(currentCategory.children)))
              )
              :
              renderCategories()
          }

        </div>
      </div>
    </div>
  )
}

export default CoursesHome
