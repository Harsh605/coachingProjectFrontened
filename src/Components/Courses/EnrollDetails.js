import React from 'react'
import { Country, State, City } from "country-state-city";
import Stepperui from '../Stepper';
import avatarImg from "../../Images/Home/user.png"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { saveEnrollInfo } from '../../slices/addToCartSlice';


const EnrollDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { EnrollInfo } = useSelector((state) => state.custom4);

    const [name, setName] = useState(EnrollInfo.name);
    const [aadharNo, setAadharNo] = useState(EnrollInfo.aadharNo);
    const [email, setEmail] = useState(EnrollInfo.email);
    const [fName, setFName] = useState(EnrollInfo.fName);
    const [DOB, setDOB] = useState(EnrollInfo.DOB);
    const [phoneNo, setPhoneNo] = useState(EnrollInfo.phoneNo);
    const [country, setCountry] = useState(EnrollInfo.country);
    const [state, setState] = useState(EnrollInfo.state);
    const [city, setCity] = useState(EnrollInfo.city);
    const [address, setAddress] = useState(EnrollInfo.address);
    const [pinCode, setPinCode] = useState(EnrollInfo.pinCode);
    const [gender, setGender] = useState(EnrollInfo.sex);


    const [avatar, setAvatar] = useState(EnrollInfo?.avatar || avatarImg)
    const [avatarPreview, setAvatarPreview] = useState(avatarImg)
    const [admitCard, setAdmitCard] = useState("")

    const [scholarship, setScholarship] = useState({
        id: 1,
        examName: EnrollInfo.scholarship?.examName || "",
        rollNo: EnrollInfo.scholarship?.rollNo || "",
      
    });







    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            console.log("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveEnrollInfo({ name, aadharNo, fName, DOB, email, phoneNo, country, state, city, address, pinCode, avatar, scholarship,admitCard, sex: gender })
        );
        navigate("order/confirm");
    };


    const handleImgUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setAvatar(reader.result)
                setAvatarPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const handleAdmitCardUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setAdmitCard(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
console.log(admitCard)
    return (
        <>
            <Stepperui activeStep={0} />

            <div className="min-h-screen sm:p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="py-4 sm:px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">

                                <div className="lg:col-span-5">
                                    <form encType="multipart/form-data" onSubmit={handleSubmit} >
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-3">
                                                <label htmlFor="full_name">Full Name</label>
                                                <input type="text" name="name" placeholder='Name' id="full_name" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="aadharNo">Aadhar No</label>
                                                <input type="text" name="aadharNo" placeholder='Aadhar No' id="aadharNo" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={aadharNo} onChange={(e) => setAadharNo(e.target.value)} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="father_name">Father's Name</label>
                                                <input type="text" name="fName" placeholder='Father name' id="father_name" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={fName} onChange={(e) => setFName(e.target.value)} />
                                            </div>
                                            <div className='md:col-span-1'>
                                                <label htmlFor="gender">Sex</label>
                                                <select required id="gender" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={gender} onChange={(e) => setGender(e.target.value)} >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>


                                            </div>

                                            <div className="md:col-span-2">
                                                <div className="relative mb-3" data-te-datepicker-init>
                                                    <label htmlFor="date">Date of Birth</label>
                                                    <input
                                                        type="Date"
                                                        id="date"
                                                        name="DOB"
                                                        value={DOB} onChange={(e) => setDOB(e.target.value)}
                                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    />
                                                </div>
                                            </div>

                                            <div className="md:col-span-3">
                                                <label htmlFor="email">Email Address</label>
                                                <input type="text" name="email" id="email" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={email} placeholder="email@domain.com" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="tel">Phone No</label>
                                                <input type="tel" name="phoneNo" id="tel" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={phoneNo} placeholder="Phone No." onChange={(e) => setPhoneNo(e.target.value)} />
                                            </div>



                                            <div className="md:col-span-2">
                                                <label htmlFor="country">Country / region</label>
                                                <select className="h-10 bg-gray-50 flex border w-full border-gray-200 rounded items-center mt-1"
                                                    required
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                >
                                                    <option value="">Country</option>
                                                    {Country &&
                                                        Country.getAllCountries().map((item, id) => (
                                                            <option key={id} value={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>

                                            {country && (
                                                <div className="md:col-span-2">
                                                    <label htmlFor="state">State / province</label>
                                                    <select className="h-10 bg-gray-50 flex border w-full border-gray-200 rounded items-center mt-1"
                                                        required
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                    >
                                                        <option value="">State</option>
                                                        {State &&
                                                            State.getStatesOfCountry(country).map((item, id) => (
                                                                <option key={id} value={item.isoCode}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            )}
                                            {state && (
                                                <div className="md:col-span-1">
                                                    <label htmlFor="state">City</label>
                                                    <select className="h-10 bg-gray-50 flex border w-full border-gray-200 rounded items-center mt-1"
                                                        required
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                    >
                                                        <option value="">City</option>
                                                        {City &&
                                                            City.getCitiesOfState(country, state).map((item, id) => (
                                                                <option key={id} value={item.isoCode}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            )}
                                            <div className="md:col-span-3">
                                                <label htmlFor="address">Address / Street</label>
                                                <input type="text" required name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="zipcode">Zipcode</label>
                                                <input type="number" name="pinCode" required id="zipcode" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />

                                            </div>


                                        </div>


                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className=" bg-gray-50 mt-6" >Upload Your Photo</h3>
                                            </div>
                                            <div className='flex'>
                                                <label htmlFor="dropzone-file" className="w-full   border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                                        <div className='flex w-full items-center justify-center gap-4'>
                                                            <div className='w-1/2 flex justify-center item-center'>
                                                                <img src={avatar} style={{ width: "100%", maxWidth: "150px" }} alt="Avatar Preview" />
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
                                        <div className="flex flex-col space-y-1 sm:pt-5">
                                            <div className="flex items-center justify-between">
                                                <h3 className=" bg-gray-50 mt-6 " >For Scholarship</h3>
                                            </div>

                                            <div className="flex flex-col overflow-x-auto">
                                                <div className="sm:-mx-6 lg:-mx-8">
                                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                                        <div className="overflow-x-auto">
                                                            <table className="min-w-full text-left text-sm font-light">
                                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                                    <tr>
                                                                        <th scope="col" className="px-6 py-4">No.</th>
                                                                        <th scope="col" className="px-6 py-4  ">Exam Name</th>
                                                                        <th scope="col" className="px-6 py-4 ">Roll No</th>
                                                                        <th scope="col" className="px-6 py-4 ">Upload Result</th>



                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="border-b dark:border-neutral-500">
                                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                                                        <td className="whitespace-nowrap px-6 py-4">
                                                                            <div className="relative h-10 w-full min-w-[150px]">
                                                                                <input
                                                                                    value={scholarship.examName}
                                                                                    required
                                                                                    onChange={(e) => setScholarship({ ...scholarship, examName: e.target.value })}
                                                                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                                    placeholder="Exam Name"
                                                                                />
                                                                            </div>
                                                                        </td>

                                                                        <td className="whitespace-nowrap px-6 py-4">
                                                                            <div className="relative h-10 w-full min-w-[150px]">
                                                                                <input
                                                                                    value={scholarship.rollNo}
                                                                                    required
                                                                                    onChange={(e) => setScholarship({ ...scholarship, rollNo: e.target.value })}
                                                                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                                    placeholder="Roll No"
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-6 py-4">
                                                                            <div className="relative h-10 w-full min-w-[150px]">
                                                                                <input
                                                                                required
                                                                                    type="file"
                                                                                    name="file"
                                                                                    onChange={handleAdmitCardUpload}
                                                                                    accept="image/*"
                                                                                    className="  px-4 py-2 transition duration-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                                                                />
                                                                              
                                                                            </div>
                                                                        </td>





                                                                    </tr>





                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="md:col-span-5 text-right  mt-5">
                                            <div className="inline-flex items-end ">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default EnrollDetails