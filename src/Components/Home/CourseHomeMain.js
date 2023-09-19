import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../slices/categoriesSlice";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CourseHomeMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.custom5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.categoryList) {
      setCategories(data.categoryList);
    }
  }, [data]);

  const handleCategoryClick = () => {
    navigate("course");
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= categories.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  if (categories.length === 0) {
    return null; // Add a loading state or fallback component here
  }

  const visibleCategories = [
    categories[currentIndex],
    categories[(currentIndex + 1) % categories.length],
    categories[(currentIndex + 2) % categories.length]
  ];

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-2 sm:py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="bigHeading pt-3 pb-3 sm:pb-8 font-semibold xl:text-4xl lg:text-3xl md:text-3xl text-2xl text-white lg:leading-[2.5rem] 2xl:leading-[3.7rem]">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4361EE] to-[#4CC9F0]">
            Our Courses
          </span>
        </h1>

        <div className="flex justify-between">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="text-gray-600 focus:outline-none"
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {visibleCategories.map((cat, id) => (
            <div key={id} onClick={handleCategoryClick}>
              <CategoryCard
                catName={cat.name}
                // catImg={cat.categoryImage.url}
                catId={cat.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseHomeMain;
