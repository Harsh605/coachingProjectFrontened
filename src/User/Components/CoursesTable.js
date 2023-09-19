import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { myAllOrdersApi } from "../../slices/orderSlice";
import ShowImgDialog from "../../Admin/Compontents/ShowImgDialog"


const TABLE_HEAD = ["Course", "Student", "Father's Name", "Date of Birth", "Sex", "Aadhar No", "Phone No", "Address", "Scholarship1", "Price", "Date", "Order Id", "Payment Id",];



export default function MyCoursesTable() {
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState('');
    const { myAllOrders } = useSelector((state) => state.order);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const [open, setOpen] = useState("")

    useEffect(() => {
        dispatch(myAllOrdersApi())
    }, [])
    // console.log(myAllOrders)

    useEffect(() => {
        if (searchQuery) {
          const filtered = myAllOrders && myAllOrders.orders && myAllOrders.orders.filter((order) =>
            order.orderItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.shippingInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.shippingInfo.fName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.shippingInfo.aadharNo.toString().includes(searchQuery.toLowerCase()) ||
            order.shippingInfo.phoneNo.toString().includes(searchQuery.toLowerCase())
          );
          setFilteredOrders(filtered);
        } else {
          setFilteredOrders(myAllOrders.orders);
        }
      }, [searchQuery, myAllOrders]);

    return (
        <>

            <Card className=" w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <figure className="relative mb-5 h-[30vh] sm:h-[50vh] w-full p-0">
                        <img
                            className="h-full w-full rounded-xl"
                            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                            alt="nature image"
                        />
                        <figcaption className="absolute bottom-8 left-2/4 flex flex-wrap-reverse w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                            <div>
                                <Typography className="m-0" variant="h5" color="blue-gray" style={{ wordBreak: "break-word", marginBottom: "0px" }}>
                                    MyCourses
                                </Typography>
                            </div>
                            <div className="mb-1 flex items-center justify-between gap-8 hidden sm:block">
                                <div className=" md:w-72 ">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />

                                </div>
                            </div>
                        </figcaption>
                    </figure>

                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">


                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0 w-[100vw] md:w-auto">
                    <table className="mt-0 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 px-3 py-3 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 m-0"
                                        >
                                            {head}{" "}
                                           
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders && filteredOrders.map((order, index) => {
                                const isLast = index === myAllOrders.orders.length - 1;
                                const classes = isLast ? "px-3 py-3" : "px-3 py-3 border-b border-blue-gray-50";
                                return (
                                    <tr key={order.user}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                {/* <Avatar src={order.orderItem.image} alt={order.orderItem.name} size="sm" /> */}
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                        {order.orderItem.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70 m-0"
                                                    >
                                                        {order.orderItem.productId}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                    {order.shippingInfo.name}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                    {order.shippingInfo.fName}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                    {order.shippingInfo.DOB}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                    {order.shippingInfo.sex}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                    {order.shippingInfo.aadharNo}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                    {order.shippingInfo.phoneNo}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                    {order.shippingInfo.address}, <br />
                                                    {order.shippingInfo.city},{order.shippingInfo.state},{order.shippingInfo.country},<br />
                                                    {order.shippingInfo.pinCode}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    Exam: {order.shippingInfo.scholarship.examName}, <br />
                                                    Roll No: {order.shippingInfo.scholarship.rollNo}, <br />
                                                    <Avatar src={order.shippingInfo.admitCard} alt={order.orderItem.name} size="sm"  onClick={() => {
                                                            setSelectedImage(order.shippingInfo.admitCard);
                                                            setOpen(true)
                                                        }} />

                                                </Typography>
                                                <ShowImgDialog open={open} setOpen={setOpen} img={selectedImage}/>

                                            </div>
                                        </td>
                                       
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {order.totalPrice}
                                                </Typography>

                                            </div>
                                        </td>


                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70 m-0"
                                            >
                                                {order.createdAt.slice(0, 10)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                {order.paymentInfo.razorpay_order_id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal m-0">
                                                {order.paymentInfo.razorpay_payment_id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal m-0">

                                            </Typography>
                                        </td>


                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>

            </Card>
        </>

    );
}