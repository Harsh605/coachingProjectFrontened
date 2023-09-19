import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../slices/categoriesSlice';
import avatarImg from "../../../src/Images/Home/productImg.png"
import { getSingleProductsApi, updateProduct } from '../../slices/ProductSlice';
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const { singleProductData } = useSelector((state) => state.custom);
  const { data } = useSelector((state) => state.custom5);





  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });
const {name,description,price,duration,category}= product

const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
}



  useEffect(() => {
    dispatch(getSingleProductsApi(id))
    dispatch(getCategories())
  },[dispatch])

  useEffect(() => {
    // Update the product state when singleProductData changes
    if (singleProductData.product) {
      setProduct({
        name: singleProductData.product.name || '',
        description: singleProductData.product.description || '',
        price: singleProductData.product.price || '',
        duration: singleProductData.product.duration || '',
        category: singleProductData.product.category || ''
      });
    }
  }, [singleProductData]);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct({name, description,price,category,duration,id }));
}

  if (data.categoryList) {
    const getLeafCategories = (categories) => {
      let leafCategories = [];

      categories.forEach((category) => {
        if (category.children.length === 0) {
          leafCategories.push(category);
        } else {
          const subLeafCategories = getLeafCategories(category.children);
          leafCategories = leafCategories.concat(subLeafCategories);
        }
      });

      return leafCategories;
    };

    var leafCategories = getLeafCategories(data.categoryList);
  }

  return (
    <section className="max-w-4xl p-6 mx-auto bg-[#1976d2] rounded-md shadow-md dark:bg-gray-800 mt-2">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">Update Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="name">Course Name</label>
            <input id="name" onChange={handleChange} value={product.name} name="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
          </div>
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="price">Price</label>
            <input id="price" onChange={handleChange} value={product.price}  name="price" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
          </div>
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="duration">Duration(In Months)</label>
            <input id="duration" onChange={handleChange} value={product.duration}  name="duration" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
          </div>

          <div>
            <label className="text-white dark:text-gray-200" htmlFor="select">Category</label>
            <select onChange={handleChange} value={product.category} name="category" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
              {data.categoryList && leafCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))
              }
            </select>
          </div>


          

         
        </div>

        <div>
            <label className="text-white dark:text-gray-200" htmlFor="textarea">Course Description</label>
            <textarea id="textarea" onChange={handleChange} value={product.description} name="description" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
          </div>
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-white rounded-md hover:bg-red focus:outline-none focus:bg-gray-600">Save</button>
        </div>
      </form>
    </section>
  )
}

export default UpdateCourse