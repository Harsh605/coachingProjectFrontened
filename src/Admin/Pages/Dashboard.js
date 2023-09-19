import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminAllOrdersApi, myAllOrdersApi } from "../../slices/orderSlice";
import { getAllUsers } from "../../slices/userSlice";
import DashboardOrders from "../Compontents/DashboardAllOrders";
import { Typography } from "@material-tailwind/react";
function Dashboard() {

  const { allUsers } = useSelector((state) => state.custom2);
  const { adminAllOrders } = useSelector((state) => state.order);
  console.log(adminAllOrders)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(adminAllOrdersApi())
    dispatch(getAllUsers())
  }, [dispatch])

const {orders}= adminAllOrders
  return (
    <>

<figure className="relative mb-5 sm:h-[50vh] h-[30vh] w-full">
        <img
          className="h-full w-full rounded-xl"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
        <figcaption className="absolute bottom-8 left-2/4 flex flex-wrap-reverse w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <Typography variant="h5" color="blue-gray" style={{ wordBreak: "break-word", marginBottom: "0px" }}>
              Dashboard
            </Typography>
          </div>

        </figcaption>
      </figure>
    <main className="mb-5">
      <div className="grid mb-2 px-8 mx-4 rounded-3xl bg-gray-100">
        <div className="grid grid-cols-12 gap-6">
          <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
            <div className="col-span-12 mt-2">

              <div className="grid grid-cols-12 gap-6 mt-2">
                <div
                  className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                    </div>
                    <div className="ml-2 w-full flex-1">
                      <div >
                        <div className="text-center mt-3 fs-3 text-3xl font-bold leading-8">{adminAllOrders.orders ? adminAllOrders.orders.length : "0"}</div>
                        <p className="text-center">Course Sale</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                    </div>
                    <div className="ml-2 w-full flex-1">
                      <div>
                        <div className="text-center mt-3 fs-3 text-3xl font-bold leading-8">{adminAllOrders.totalAmount} ₹</div>
                        <div className="text-center mt-1 text-base text-gray-600">Total Sales</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                >
                  <div className="p-5">
                    <div className="flex justify-between">


                    </div>
                    <div className="ml-2 w-full flex-1">
                      <div>
                        <div className=" text-center mt-3 fs-3 text-3xl font-bold leading-8">{adminAllOrders.totalAmount} ₹</div>
                        <div className="text-center mt-1 text-base text-gray-600">Total Profit</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                    </div>
                    <div className="ml-2 w-full flex-1">
                      <div>
                        <div className="text-center mt-3 fs-3 text-3xl font-bold leading-8">{allUsers && allUsers.length}</div>
                        <div className="text-center mt-1 text-base text-gray-600">Total Users</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <DashboardOrders allUsers={allUsers} orders={orders}/>
    </>
    

  );
}

export default Dashboard;
