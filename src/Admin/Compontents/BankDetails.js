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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserBankDetails,
  getAllUserUpiDetails,
} from "../../slices/Scholarship";

const TABLE_HEAD = ["User", "Upi Id", "Upi name"];

export default function BankDetails() {
  const dispatch = useDispatch();
  const { allUserBankDetails, allUserUpiDetails } = useSelector(
    (state) => state.scholarship
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllUserBankDetails());
    dispatch(getAllUserUpiDetails());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page to 1 when performing a new search
  };

  const filteredUpiDetails = allUserUpiDetails.upiDetails?.filter((details) =>
    details.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    details.upiId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    details.upiName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUpiDetails?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Card className=" w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-0 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray m-0">
              Bank Details
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-[100vw] md:w-auto">
        <table className="mt-1 w-full min-w-max table-auto text-left">
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
                    className="flex items-center justify-between gap-2 m-0 font-normal leading-none opacity-70"
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
            {filteredUpiDetails &&
              filteredUpiDetails
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((details, index) => {
                  const isLast =
                    index === filteredUpiDetails.length - 1;
                  const classes = isLast
                    ? "px-3 py-2"
                    : "px-3 py-2 border-b border-blue-gray-50";

                  return (
                    <tr key={details._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={details.userImg}
                            alt={details.userName}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal m-0"
                            >
                              {details.userName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70 m-0"
                            >
                              {details.userEmail}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal m-0"
                        >
                          {details.upiId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal m-0"
                        >
                          {details.upiName}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
