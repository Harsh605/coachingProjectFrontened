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
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserAdmin } from "../../slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminDeleteOrderApi } from "../../slices/orderSlice";



const TABLE_HEAD = ["User", "Course", "Student", "Father's Name", "Date of Birth", "Sex", "Aadhar No", "Phone No", "Address", "Scholarship1", "Paid", "CreatedAt", "PaidAt", "OrderInfo", ""];

export default function DashboardOrders({ orders }) {
  const dispatch = useDispatch();
  const [deletedOrderId, setDeletedOrderId] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const ordersPerPage = 5;

  useEffect(() => {
    setDeletedOrderId(null); // Reset the deleted order ID
  }, [dispatch, deletedOrderId]);

  const handleDltorder = (id) => {
    dispatch(adminDeleteOrderApi(id));
    setDeletedOrderId(id);
  };
  const handleUser = (id) => {
    navigate(`/admin/users/${id}`)
  }

  const filteredOrders = orders ? orders.filter(order =>
    order.orderItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingInfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingInfo.aadharNo.toString().includes(searchQuery.toLowerCase()) ||
    order.shippingInfo.phoneNo.toString().includes(searchQuery.toLowerCase()) ||
    order.shippingInfo.fName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingInfo.city.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  return (
    <Card className=" w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-1 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" className="m-0" color="blue-gray">
              All Orders
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row hidden sm:block">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

        </div>

      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-[100vw] md:w-auto">
        <table className="mt-0 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 px-3 py-2 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 mb-0  font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders && currentOrders.map((order, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast ? "px-3 py-2" : "px-3 py-2 border-b border-blue-gray-50";

              return (
                <tr key={order.user}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar className="cursor-pointer" src={order.userImg} alt={order.userName} size="sm" onClick={() => handleUser(order.user)} />
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                          {order.userName}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70 mb-0"
                        >
                          {order.userEmail}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal mb-1">
                          {order.orderItem.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70  mb-1"
                        >
                          {order.orderItem.productId}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={order.shippingInfo.avatar} alt={order.shippingInfo.name} size="sm" />
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                          {order.shippingInfo.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70  mb-1"
                        >
                          {order.shippingInfo.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                        {order.shippingInfo.fName}
                      </Typography>

                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                        {order.shippingInfo.DOB}
                      </Typography>

                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                        {order.shippingInfo.sex}
                      </Typography>

                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                        {order.shippingInfo.aadharNo}
                      </Typography>

                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                        {order.shippingInfo.phoneNo}
                      </Typography>

                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
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

                      </Typography>

                    </div>
                  </td>
                 

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                        {order.totalPrice}₹
                      </Typography>

                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                      {order.createdAt.slice(0, 10)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                      {order.paidAt.slice(0, 10)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal  mb-1">
                        payment_id: {order.paymentInfo.razorpay_payment_id}, <br />
                        order_id: {order.paymentInfo.razorpay_order_id}, <br />
                      </Typography>

                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Delete order">
                      <IconButton variant="text" color="blue-gray" onClick={() => handleDltorder(order._id)}>
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
          Page {currentPage} of {Math.ceil(filteredOrders.length / ordersPerPage)}
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
            disabled={indexOfLastOrder >= filteredOrders.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>

    </Card>
  );
}