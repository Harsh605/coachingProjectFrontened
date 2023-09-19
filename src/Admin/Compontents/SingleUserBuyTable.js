import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { adminDeleteOrderApi, singleUserAllOrdersByAdmin } from "../../slices/orderSlice";
import ShowImgDialog from "./ShowImgDialog";


const TABLE_HEAD = ["Course", "Student", "Father's Name", "Date of Birth", "Sex", "Aadhar No", "Phone No", "Address", "Scholarship1", "Paid", "CreatedAt", "PaidAt", "OrderInfo", ""];

export default function SingleUserBuyTable() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedImage, setSelectedImage] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [deletedOrderId, setDeletedOrderId] = useState(null);
    const coursesPerPage = 5;


    const { singleUserAllOrders } = useSelector((state) => state.order);
    useEffect(() => {
        dispatch(singleUserAllOrdersByAdmin(id));
        setDeletedOrderId(null); // Reset the deleted order ID
    }, [dispatch, id, deletedOrderId]);

    if (singleUserAllOrdersByAdmin) {
        console.log(singleUserAllOrders)
    }

    const handleDltCourse = (id) => {
        dispatch(adminDeleteOrderApi(id));
        setDeletedOrderId(id);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection((prevDirection) =>
                prevDirection === "asc" ? "desc" : "asc"
            );
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const getColumnValue = (data, column) => {
        switch (column) {
            case "Course":
                return data.orderItem.name;
            case "Student":
                return data.shippingInfo.name;
            case "Father's Name":
                return data.shippingInfo.fName;
            case "Sex":
                return data.shippingInfo.sex;
            case "Address":
                return data.shippingInfo.address;
            case "Phone No":
                return Number(data.shippingInfo.phoneNo); // Convert to Number
            case "Aadhar No":
                return data.shippingInfo.aadharNo;
            case "CreatedAt":
                return new Date(data.createdAt); // Convert to Date
            case "PaidAt":
                return new Date(data.paidAt); // Convert to Date
            case "Paid":
                return Number(data.totalPrice); // Convert to Number
            default:
                return "";
        }
    };

    const sortedData = [...singleUserAllOrders].filter(order => order._id !== deletedOrderId)
        .sort((a, b) => {
            const columnA = getColumnValue(a, sortColumn);
            const columnB = getColumnValue(b, sortColumn);
            if (columnA < columnB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (columnA > columnB) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });


    // ...






    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Courses
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </CardHeader>
            <CardBody className="overflow-scroll px-0 md:w-auto w-[100vw]">
                <table className="mt-1 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 pt-3 transition-colors hover:bg-blue-gray-50"
                                    onClick={() => handleSort(head)}
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {sortColumn === head && (
                                            <ChevronUpDownIcon
                                                strokeWidth={2}
                                                className={`h-4 w-4 ${sortDirection === "asc" ? "transform rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </Typography>
                                </th>


                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData
                            .filter((order) => {
                                const searchTerms = [
                                    order.orderItem.name,
                                    order.orderItem.productId,
                                    order.shippingInfo.name,
                                    order.shippingInfo.email,
                                    order.shippingInfo.fName,
                                    order.shippingInfo.city,
                                    order.shippingInfo.state,
                                    order.shippingInfo.country,
                                    order.shippingInfo.DOB,
                                    order.shippingInfo.address,
                                    order.shippingInfo.aadharNo.toString(),
                                    order.shippingInfo.pinCode.toString(),
                                    order.shippingInfo.phoneNo.toString(),
                                    order.totalPrice.toString(),
                                ];
                                return searchTerms.some((term) =>
                                    term.toLowerCase().includes(searchQuery.toLowerCase())
                                );
                            })
                            .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)
                            .map((course, index) => {
                                const isLast = index === singleUserAllOrders.length - 1;
                                const classes = isLast ? "px-3 pt-1 " : "px-3 pt-1 border-b border-blue-gray-50";

                                return (
                                    <tr key={course._id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-normal mb-1">
                                                        {course.orderItem.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70  mb-1"
                                                    >
                                                        {course.orderItem.productId}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={course.shippingInfo.avatar} alt={course.shippingInfo.name} size="sm" />
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                        {course.shippingInfo.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70  mb-1"
                                                    >
                                                        {course.shippingInfo.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {course.shippingInfo.fName}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {course.shippingInfo.DOB}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {course.shippingInfo.sex}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {course.shippingInfo.aadharNo}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {course.shippingInfo.phoneNo}
                                                </Typography>

                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {course.shippingInfo.address}, <br />
                                                    {course.shippingInfo.city},{course.shippingInfo.state},{course.shippingInfo.country},<br />
                                                    {course.shippingInfo.pinCode}
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    Exam: {course.shippingInfo.scholarship.examName}, <br />
                                                    Roll No: {course.shippingInfo.scholarship.rollNo}, <br />
                                                    <Avatar src={course.shippingInfo.admitCard} alt={course.orderItem.name} size="sm"  onClick={() => {
                                                            setSelectedImage(course.shippingInfo.admitCard);
                                                            setOpen(true)
                                                        }} />
                                                </Typography>
                                                <ShowImgDialog open={open} setOpen={setOpen} img={selectedImage}/>

                                            </div>
                                        </td>


                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    {course.totalPrice}₹
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                {course.createdAt.slice(0, 10)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                {course.paidAt.slice(0, 10)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                                                    payment_id: {course.paymentInfo.razorpay_payment_id}, <br />
                                                    order_id: {course.paymentInfo.razorpay_order_id}, <br />
                                                </Typography>

                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Delete Course">
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleDltCourse(course._id)}>
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {Math.ceil(singleUserAllOrders.length / coursesPerPage)} (Total Courses: {singleUserAllOrders && singleUserAllOrders.length})
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        disabled={currentPage === Math.ceil(singleUserAllOrders.length / coursesPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>

        </Card>
    );
}