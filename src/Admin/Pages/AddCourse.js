import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../slices/categoriesSlice';
import avatarImg from "../../../src/Images/Home/productImg.png"
import { createProduct } from '../../slices/ProductSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddCourse = () => {
  const dispatch = useDispatch()

  const { data } = useSelector((state) => state.custom5);


  const [product, setProduct] = useState({
    name: "",
    price: "",
    duration:"",
    category: ""
})
const [description,setDescription]=useState("")
const {name,price,duration,category}= product

const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
}
const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProduct({name,description,price,category,duration }))
}
console.log(description)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

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

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ];

  return (
    <section className="max-w-4xl p-6 mx-auto bg-[#1976d2] rounded-md shadow-md dark:bg-gray-800 mt-2">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">Add Course</h1>
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


        

          {/* <div>
          <label className="text-white dark:text-gray-200">Product Image</label>
            <div className="mt-1 flex justify-center p-1   rounded-md">
              <div className="flex flex-col space-y-1">

                <div className='flex'>
                  <label htmlFor="dropzone-file" className="w-full   border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                      <div className='flex w-full items-center justify-center gap-4'>
                        <div className='w-1/2 flex justify-center item-center'>
                          <img src={images} style={{ width: "100%", maxWidth: "150px" }} alt="Avatar Preview" />
                        </div>
                        <div className='w-1/2'>
                          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth
                            ="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                      </div>

                    </div>

                    <input
                      type="file"
                      name="file"
                      id="dropzone-file"
                      onChange={handleImgUpload}
                      accept="image/*"
                      className=" hidden px-4 py-2 transition duration-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />

                  </label>

                </div>

              </div>
            </div>
          </div> */}
        </div>
        <div>
            <label className="text-white dark:text-gray-200" htmlFor="textarea">Course Description</label>
            {/* <textarea id="textarea" onChange={handleChange} value={product.value} name="description" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" /> */}
            <ReactQuill id="textarea" theme="snow" value={description}  name="description" onChange={setDescription} modules={{
                toolbar: toolbarOptions
              }}
              className="block w-full  mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
              />
          </div>
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-white rounded-md hover:bg-red focus:outline-none focus:bg-gray-600">Save</button>
        </div>
      </form>
    </section>
  )
}

export default AddCourse