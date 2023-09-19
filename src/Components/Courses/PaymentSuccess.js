import React, { useRef } from 'react'
import { Link, useSearchParams } from "react-router-dom"
import PdfSuccess from './PdfSuccess'
import { Button } from '@mui/material';
import { useReactToPrint } from 'react-to-print';




const PaymentSuccess = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <>
            {/* <div className="min-h-screen flex flex-col justify-center md-justify-start items-center"> */}

                <div className='mx-auto my-2 sm:my-3 p-2 md:p-3' style={{ maxWidth: "800px"}}>
                    <div style={{maxWidth:"500px",margin:"auto"}}>
                    <img src="https://t.ly/l7wi"  alt="" />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='fs-1 mb-2'>Payment Success</h1>
                        <p>Reference No:  {referenceNum}</p>
                    </div>
                    <div className='flex justify-center sm:justify-end mb-2  ' >
                        <Button onClick={handlePrint} variant="contained" sx={{ backgroundColor: "#5b58ff" }}>
                            Print Application Form
                        </Button>
                    </div>
                    <PdfSuccess ref1={componentRef} />

                </div>

        </>

    )
}

export default PaymentSuccess