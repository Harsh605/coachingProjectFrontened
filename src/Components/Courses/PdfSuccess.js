import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrderByPaymentIdApi } from '../../slices/orderSlice';

const PdfSuccess = ({ ref1 }) => {
    const dispatch = useDispatch()
    const { singleOrderDataById } = useSelector((state) => state.order)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('reference');
        if (id) {
            dispatch(getSingleOrderByPaymentIdApi(id))
        }
    }, [dispatch]);

    if (!singleOrderDataById) {
        return null; // or render a loading state if needed
    }

    const { shippingInfo: { name: userName, fName, sex, DOB, address, aadharNo, state, phoneNo, email, pinCode, avatar, city, country, scholarship: { id: scholarshipId, examName: scholarshipExamName, rollNo: scholarshipRollNo,   } } } = singleOrderDataById;
    const { orderItem: { name: courseName, price: coursePrice, productId: courseProductId } } = singleOrderDataById;
    const { paymentInfo: { razorpay_payment_id, razorpay_order_id } } = singleOrderDataById;



    return (

        <div ref={ref1} style={{ border: "1px solid #000000", height: "auto", margin: "20px", paddingBottom: "15px" }}>
            <h2 style={{ textAlign: "center", margin: "10px 0" }}>Application Form</h2>
            <div className='flex flex-col-reverse sm:flex-row' style={{ padding: "20px" }}>
                <div className='w-full sm:w-3/4'>
                    <div className='flex w-full'>
                        <div className='w-1/2 '>
                            <p>Name:</p>
                        </div>
                        <div className='w-1/2'>
                            <p style={{ textTransform: "capitalize" }}>{userName}</p>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/2 '>
                            <p>Father's Name:</p>
                        </div>
                        <div className='w-1/2'>
                            <p style={{ textTransform: "capitalize" }}>{fName}</p>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/2 '>
                            <p>Date of Birth:</p>
                        </div>
                        <div className='w-1/2'>
                            <p>{DOB}</p>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/2 '>
                            <p style={{ textTransform: "capitalize" }}>Sex:</p>
                        </div>
                        <div className='w-1/2'>
                            <p>{sex}</p>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/2 '>
                            <p>Aadhar Card No:</p>
                        </div>
                        <div className='w-1/2'>
                            <p >{aadharNo}</p>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/2 '>
                            <p>Mobile No:</p>
                        </div>
                        <div className='w-1/2'>
                            <p>{phoneNo}</p>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='w-1/2 '>
                            <p>Email</p>
                        </div>
                        <div className='w-1/2 break-words'>
                            <p>{email}</p>
                        </div>
                    </div>

                </div>
                <div className='mb-4 sm:mb-1 w-full sm:w-1/3 flex justify-center sm:justify-end'>
                    <div >
                        <div className='border border-black' style={{ width: "150px" }}  >
                            <img src={avatar} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#5b58ff", padding: "10px", margin: "20px 0" }}>
                <h3 style={{ color: "#ffffff" }}>Billing Address</h3>
            </div>
            <div style={{ padding: "0 20px" }}>
                <div>
                    <p style={{ fontSize: "20px" }}>Address:</p>
                    <p style={{ textTransform: "capitalize" }}>{address},<br /> {city},{state}, {country},<br /> {pinCode}</p>
                </div>
            </div>

            <div style={{ background: "#5b58ff", padding: "10px", margin: "20px 0" }}>
                <h3 style={{ color: "#ffffff" }}>For Scholarship Details</h3>
            </div>
            <div className="flex flex-col overflow-x-auto">
                <div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-3 py-4">No.</th>
                                    <th scope="col" className="px-3 py-4  ">Exam Name</th>
                                    <th scope="col" className="px-3 py-4 ">Roll No</th>

                                </tr>
                            </thead>
                            <tbody>

                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-3 py-4 font-medium">1</td>
                                    <td className="whitespace-nowrap px-3 py-4">
                                        {scholarshipExamName}
                                    </td>
                                   
                                    <td className="whitespace-nowrap px-3 py-4">
                                        {scholarshipRollNo}

                                    </td>
                                    
                                   
                                    


                                </tr>
                              




                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div style={{ background: "#5b58ff", padding: "10px", margin: "20px 0" }}>
                <h3 style={{ color: "#ffffff" }}>Course</h3>
            </div>

            <div style={{ padding: "0 20px", display: "flex" }}>
                <div className='flex justify-between items-center w-full'>
                    <div className='w-1/2'>
                        <p style={{ fontSize: "20px", fontWeight: "520" }}>Course Name: </p>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <p  style={{ fontSize: "20px",wordBreak: "break-word" }}>{courseName}</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: "0 20px", display: "flex" }}>
                <div className='flex justify-between items-center w-full'>
                    <div className='w-1/2'>
                        <p style={{ fontSize: "20px", fontWeight: "520", }}> Course Id: </p>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <p  style={{ fontSize: "20px",wordBreak: "break-word" }}>{courseProductId}</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: "0 20px", display: "flex" }}>
                <div className='flex justify-between items-center w-full'>
                    <div className='w-1/2'>
                        <p style={{ fontSize: "20px", fontWeight: "520" }}> Price: </p>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <p style={{ fontSize: "20px" }}>₹ {coursePrice}</p>
                    </div>
                </div>
            </div>


            <div style={{ background: "#5b58ff", padding: "10px", margin: "20px 0" }}>
                <h3 style={{ color: "#ffffff" }}>Payment Details</h3>
            </div>

            <div style={{ padding: "0 20px", display: "flex" }}>
                <div className='flex justify-between items-center w-full sm:w-3/4'>
                    <div className='w-1/2'>
                        <p style={{ fontSize: "20px", fontWeight: "520" }}>Payment: </p>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <p style={{ fontSize: "20px" }}>Success</p>
                    </div>
                </div>
                <div className='hidden sm:block w-1/4'>
                </div>
            </div>
            <div style={{ padding: "0 20px", display: "flex" }}>
                <div className='flex justify-between items-center w-full sm:w-3/4'>
                    <div className='w-1/2'>
                        <p style={{ fontSize: "20px", fontWeight: "520" }}>Order Id: </p>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <p style={{ fontSize: "20px",wordBreak: "break-word" }}>{razorpay_order_id}</p>
                    </div>

                </div>
                <div className='hidden sm:block w-1/4'>
                </div>
            </div>
            <div style={{ padding: "0 20px", display: "flex" }}>
                <div className='flex justify-between items-center w-full sm:w-3/4'>
                    <div className='w-1/2'>
                        <p style={{ fontSize: "20px", fontWeight: "520" }}>Payment Id: </p>
                    </div>
                    <div className='w-1/2 flex justify-center'>
                        <p style={{ fontSize: "20px",wordBreak: "break-word"}}>{razorpay_payment_id}</p>
                    </div>

                </div>
                <div className='hidden sm:block w-1/4'>
                </div>
            </div>

            <div style={{ padding: "0 20px", display: "flex" }}>


            </div>


        </div>
    )
}

export default PdfSuccess