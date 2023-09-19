import React, { useEffect, useRef } from 'react';
import Stepperui from '../Stepper'
import PdfForm from './PdfForm';

import { useReactToPrint } from 'react-to-print';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ConfirmOrder = () => {


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const { singleProductData } = useSelector((state) => state.custom)
    const navigate = useNavigate()
    const handlePayment = () => {
        const data = {
            totalPrice: singleProductData.product.price,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("payment")
    }
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])


    return (

        <>
            <Stepperui activeStep={1} />
            <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
                <div className='flex justify-end mb-2  ' >
                    <Button onClick={handlePrint} variant="contained" sx={{ backgroundColor: "#5b58ff" }}>
                        Print Application Form
                    </Button>
                </div>


                <PdfForm  ref1={componentRef}/>


                <div style={{ padding: "0 20px" }}>
                    <p className='fs-5 text-[#000000]'>
                        <span className='fs-5' style={{ color: "red" }}>Alert: </span>
                        Please Check All Application Details Properly.Because using this details we are going to recognize you.
                    </p>
                </div>
                <div style={{ padding: "0 20px" }}>
                    <div className="md:col-span-5 text-right  mt-5">
                        <div className="inline-flex items-end ">
                            <button onClick={handlePayment} className="bg-[#5b58ff] hover:bg-[#000000] text-white  py-2 px-4 rounded">Proceed to Payment</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default ConfirmOrder