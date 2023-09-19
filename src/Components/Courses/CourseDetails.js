import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleProductsApi } from '../../slices/ProductSlice'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { singleProductData } = useSelector((state) => state.custom)
  useEffect(() => {
    dispatch(getSingleProductsApi(id))
  }, [dispatch])

  const handleEnroll = () => {
    navigate("enroll")
  }
  const addClassToParagraph = (htmlString) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlString, 'text/html');

    const paragraphs = parsedHtml.getElementsByTagName('p');
    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i].classList.add('mb-0');
    }

    return parsedHtml.documentElement.innerHTML;
  };
  return (
    singleProductData.product &&
    (

      <main className="mt-10" >
       
        <div className="mx-4 group relative cursor-pointer">
          <div className="flex justify-center items-center bg-gradient-to-b from-[#000120] to-[#3b39aa] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-40 sm:h-80">
            <h3 className="capitalize text-sm text-white fs-2 text-center">
              {singleProductData.product.name}
            </h3>
          </div>

        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            {/* <p className="pb-6">{singleProductData.product.description}</p> */}
            <div dangerouslySetInnerHTML={{ __html: addClassToParagraph(singleProductData.product.description) }}></div>

            {/* ...rest of the code */}
          </div>
          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">

              <h4 className="text-gray-700 py-3">
                {singleProductData.product.name}
              </h4>

              <ul className='flex justify-between px-0'>
                <li> Price</li>
                <li className='text-gray-700'>₹{singleProductData.product.price}</li>
              </ul>


              <button onClick={handleEnroll} className="px-2 py-2 text-gray-100 bg-[#5b58ff] flex w-full items-center justify-center rounded">
                Registered
                <i className="bx bx-user-plus ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </main>

    )
  )
}

export default CourseDetails