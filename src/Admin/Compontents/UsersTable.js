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
import { deleteUser, editRoleOfUser, getAllUsers } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Avatar","Name","Email", "Role", "Id", "Created At", ""];

export default function UsersTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState("user");
    const [sortOrder, setSortOrder] = useState("asc");
    const [deletedUserId, setDeletedUserId] = useState(""); // New state variable

    const navigate = useNavigate()
    const usersPerPage = 5;

    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.custom2);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    if (allUsers) {
        console.log(allUsers);
    }

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
        setDeletedUserId(id); // Update the deleted user ID
    };

    const handleEditRole = (id) => {
        dispatch(editRoleOfUser(id));
    };

    useEffect(() => {
        dispatch(getAllUsers());
        if (deletedUserId !== "") {
            setDeletedUserId(""); // Reset deleted user ID
        }
    }, [dispatch, deletedUserId]); // Add deletedUserId as a dependency

    const handleSortClick = (columnIndex) => {
        const clickedColumn = TABLE_HEAD[columnIndex];

        // Toggle sorting order if the same column is clicked again
        if (sortColumn === clickedColumn) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(clickedColumn);
            setSortOrder("asc");
        }
    };

    const sortedUsers = allUsers
        .filter(
            (user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((user) => user._id !== deletedUserId) // Filter out the deleted user
        .sort((a, b) => {
            if (sortColumn === "Name") {
                return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } 
            else if (sortColumn === "Role") {
                return sortOrder === "asc" ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role);
            }
            else if (sortColumn === "Email") {
                return sortOrder === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
            }
             else if (sortColumn === "Id") {
                return sortOrder === "asc" ? a._id.localeCompare(b._id) : b._id.localeCompare(a._id);
            } else if (sortColumn === "Created At") {
                return sortOrder === "asc"
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });

    const displayedUsers = sortedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);


    const handleSelecedUser = (id) => {
        navigate(`${id}`)
    }
    return (
        <Card className=" w-full">
            {/* <CardHeader floated={false} shadow={false} className="rounded-none"> */}
            <figure className="relative sm:h-[50vh] h-[30vh] w-full">
                <img
                    className="h-full w-full rounded-xl"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                />
                <figcaption className="absolute bottom-8 left-2/4 flex flex-wrap-reverse w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div>
                        <Typography variant="h5" color="blue-gray"  style={{wordBreak:"break-word",marginBottom:"0px"}}>
                         Users Panel
                        </Typography>
                    </div>

                </figcaption>
            </figure>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-2 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Users
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                    <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                </div>
              
            </CardHeader>
              
            <CardBody className="overflow-scroll px-0 w-[100vw] sm:w-auto">
                <table className="mt-1 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 pt-3 transition-colors hover:bg-blue-gray-50"
                                    onClick={() => handleSortClick(index)}
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon
                                                strokeWidth={2}
                                                className={`h-4 w-4 ${sortColumn === head ? "text-blue" : ""
                                                    }`}
                                            />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user, index) => {
                            const isLast = index === allUsers.length - 1;
                            const classes = isLast ? "px-4 pt-2" : "px-4 pt-2 border-b border-blue-gray-50";

                            return (
                                <tr key={user._id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={user.avatar.url} alt={user.name} size="sm" className="cursor-pointer" onClick={() => handleSelecedUser(user._id)} />
                                            <div className="flex flex-col">
                                            
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user.email}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user.role}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user._id}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.createdAt.slice(0, 10)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {/* <Tooltip content="Make Admin">
                                            <IconButton variant="text" color="blue-gray">
                                                <PencilIcon
                                                    className="h-4 w-4"
                                                    onClick={() => handleEditRole(user._id)}
                                                />
                                            </IconButton>
                                        </Tooltip> */}
                                        <Tooltip content="Delete User">
                                            <IconButton variant="text" color="blue-gray">
                                                <TrashIcon
                                                    className="h-4 w-4"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                />
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
                    Page {currentPage} of {Math.ceil(sortedUsers.length / usersPerPage)} (Total Users: {allUsers && allUsers.length})
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === Math.ceil(sortedUsers.length / usersPerPage)}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
