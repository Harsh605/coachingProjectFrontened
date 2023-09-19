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
import { deleteProduct, getProductsApi } from "../../slices/ProductSlice";
import { useNavigate } from "react-router-dom";


const TABLE_HEAD = ["Name", "Description", "Category", "Price", "Duration", "Created At", ""];


export default function CoursesAdmin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.custom);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState({
    column: "",
    order: "asc",
  });

  const coursesPerPage = 5;



  const handleCreateCourse = () => {
    navigate("add")
  }
  const handleEditCourse = (id) => {
    navigate(`update/${id}`)
  }
  const handleCreateCategory = () => {
    // return (setOpen(!open))
    navigate(`category/add`)
  }
  const handleDeleteCourse = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(getProductsApi()); // Fetch updated categories after deletion
    });

  }
  let filteredOrders;

  if (data.products) {
    filteredOrders = data.products.filter((course) => {
      const { name, description, category, price, createdAt, duration } = course;

      // Perform the filtering based on the search query
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        price.toString().includes(searchQuery) ||
        createdAt.toString().includes(searchQuery)

      );
    });
  }

  const handleSort = (column) => {
    if (sortOrder.column === column) {
      setSortOrder({
        ...sortOrder,
        order: sortOrder.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortOrder({
        column,
        order: "asc",
      });
    }
  };
  // Use the filteredOrders variable in the map function below

  useEffect(() => {
    dispatch(getProductsApi())
  }, [dispatch])


  return (
    <Card className="w-full">
      {/* <NewCatDialog open={open} setOpen={setOpen}/> */}
      <figure className="relative sm:h-[50vh] h-[30vh] w-full">
        <img
          className="h-full w-full rounded-xl"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
        <figcaption className="absolute bottom-8 left-2/4 flex flex-wrap-reverse w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <Typography variant="h5" color="blue-gray" style={{ wordBreak: "break-word", marginBottom: "0px" }}>
              All Courses
            </Typography>
          </div>

        </figcaption>
      </figure>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-0 flex flex-wrap sm:flex-noWrap items-center justify-between gap-8">
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
          <div className="flex shrink-0 gap-2 flex-row">
            <Button variant="outlined" className="flex items-center gap-3 capitalize" color="blue-gray" size="sm" onClick={handleCreateCategory}>
              Add Category
            </Button>
            <Button className="flex items-center gap-3 capitalize" color="blue" size="sm" onClick={handleCreateCourse}>
              Add Course
            </Button>
          </div>


        </div>

      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-[100vw] md:w-auto">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.products && filteredOrders
              .sort((a, b) => {
                switch (sortOrder.column) {
                  case "Name":
                    return sortOrder.order === "asc"
                      ? a.name.localeCompare(b.name)
                      : b.name.localeCompare(a.name);
                  case "Description":
                    return sortOrder.order === "asc"
                      ? a.description.localeCompare(b.description)
                      : b.description.localeCompare(a.description);
                  case "Duration":
                    return sortOrder.order === "asc"
                      ? a.duration.localeCompare(b.duration)
                      : b.duration.localeCompare(a.duration);
                  case "CreatedAt":
                    return sortOrder.order === "asc"
                      ? a.createdAt.localeCompare(b.createdAt)
                      : b.createdAt.localeCompare(a.createdAt);
                  case "Category":
                    return sortOrder.order === "asc"
                      ? a.category.localeCompare(b.category)
                      : b.category.localeCompare(a.category);
                  
                  default:
                    return 0;
                }
              })
              .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)
              .map((curProduct, index) => {
                const isLast = index === data.products.length - 1;
                const classes = isLast ? "px-3 py-2" : "px-3 py-2 border-b border-blue-gray-50";

                return (
                  <tr key={curProduct._id}>
                 
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                          {curProduct.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                          {curProduct.description.slice(0, 20)}...
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                          {curProduct.category}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                        {curProduct.price} ₹
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                        {curProduct.duration}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                        {curProduct.createdAt.slice(0, 10)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Course">
                        <IconButton variant="text" color="blue-gray" onClick={() => handleEditCourse(curProduct._id)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Course">
                        <IconButton variant="text" color="blue-gray" onClick={() => handleDeleteCourse(curProduct._id)}>
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
          Page {currentPage} of {Math.ceil(data.products && data.products.length / coursesPerPage)}
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
            disabled={currentPage === Math.ceil(data.products && data.products.length / coursesPerPage)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>

    </Card>
  );
}