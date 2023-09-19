import React, { useEffect } from 'react'
import Stepperui from '../Stepper'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProductsApi } from '../../slices/ProductSlice';
import { createOrderApi } from '../../slices/orderSlice';

const Payment = () => {
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.custom2);
    const { singleProductData } = useSelector((state) => state.custom);
    const { id } = useParams()
    const dispatch = useDispatch()

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { EnrollInfo } = useSelector((state) => state.custom4);

    const amount = Math.round( orderInfo.totalPrice * 100)

    useEffect(() => {
        dispatch(getSingleProductsApi(id))
    }, [dispatch, id])

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    
    let orderData={
        shippingInfo:EnrollInfo,
        orderItem:{
            name: singleProductData.product?.name,
            price: singleProductData.product?.price,
            // image: singleProductData.product?.images[0].url || "demo",
            productId: singleProductData.product?._id
        },
        totalPrice:orderInfo.totalPrice
    }

    const checkoutHandler = async () => {
        const config = { headers: {"Content-Type": "application/json" }, withCredentials: true };
        const { data: { RAZORPAY_API_KEY } } = await axios.post(`http://localhost:5500/api/v1/razorpayApiKey`,{},config)

        const { data: { order } } = await axios.post(`http://localhost:5500/api/v1/checkout`, {amount},config)

        const options = {
            RAZORPAY_API_KEY,
            amount: amount,
            currency: "INR",
            name: "The Instu Talent Hub",
            description: "RazorPay",
            // image: userData.avatar.url,
            order_id: order.id,
            callback_url: `http://localhost:5500/api/v1/paymentverification`,
            // prefill: {
            //     name: userData.name,
            //     email: userData.email,
            //     contact: "9999999999"
            // },
            handler: function (response) {
                const { razorpay_payment_id,razorpay_order_id,razorpay_signature} = response;

                orderData.paymentInfo = {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature
                }
                dispatch(createOrderApi(orderData))
                navigate(`/paymentsuccess?reference=${razorpay_payment_id}`)
                
              },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <>
            <Stepperui activeStep={2} />
            <div className="min-h-screen flex flex-col justify-center items-center">
                <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" width="300px" className="mb-5" alt="" />
                <button onClick={checkoutHandler} className=" rounded-full px-5 text-white py-3 fs-5" style={{ backgroundColor: "#1976d2", fontFamily: "Roboto" }}>Pay: ₹ {orderInfo.totalPrice}</button>
            </div>
        </>

    )
}

export default Payment