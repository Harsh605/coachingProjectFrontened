// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import BankDetails from '../Compontents/BankDetails';
import { getProductsApi } from '../../slices/ProductSlice';
import { uploadScholarship } from '../../slices/Scholarship';

const Scholarship = () => {
    const dispatch = useDispatch();
    const [pdf, setPdf] = useState(null);
    const [title, setTitle] = useState('');
    const [courseName, setCourseName] = useState('');
    const [loading, setLoading] = useState(true);

    const { data } = useSelector((state) => state.custom);

    useEffect(() => {
        dispatch(getProductsApi())
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pdf) {
            console.log(title, courseName, pdf)
            dispatch(uploadScholarship({ title, courseName, pdf }));
        }
    };

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setPdf(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    console.log(pdf)

    //   const handleFileChange = (event) => {
    //     setPdf(event.target.files[0]);
    //   };

    if (loading) {
        return <p>Loading...</p>; // Render a loading indicator while fetching data
    }

    return (
        <>
            <section className="max-w-4xl p-0 mx-auto rounded-md dark:bg-gray-800 my-5">
                <h4 className="text-[#1976d2] mb-3">Upload Scholarship Pdf</h4>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <input
                                required
                                id="title"
                                value={title}
                                placeholder="Title"
                                name="title"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                name="parentId"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            >
                                <option value="" hidden></option>
                                {data.products &&
                                    data.products.map((course) => (
                                        <option className="capitalize" key={course._id} value={course._id}>
                                            {course.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <input
                                required
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                accept=".pdf,.xlsx,.xls"
                                className="relative m-0 mt-2 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-2 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-red focus:outline-none focus:bg-gray-600">
                            Save
                        </button>
                    </div>
                </form>

                
            </section>
            <BankDetails />
        </>
    );
};

export default Scholarship;
