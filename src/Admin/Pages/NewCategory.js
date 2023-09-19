import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, deleteCategory, getCategories } from '../../slices/categoriesSlice';
import avatarImg from "../../../src/Images/Home/productImg.png"

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

const TABLE_HEAD = ["Name", "Parent", "createdAt", "updatedAt", ""];

const NewCategory = () => {
    const dispatch = useDispatch()

    const { data } = useSelector((state) => state.custom5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const [sortOrder, setSortOrder] = useState({
        column: "",
        order: "asc",
    });

    const [category, setCategory] = useState({
        name: "",
        parentId: ""
    })
    const { name, parentId } = category
    const coursesPerPage = 5;

    const handleChange = (e) => {
        const { name, value } = e.target
        setCategory({ ...category, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addCategory({ name, parentId })).then(() => {
            dispatch(getCategories()); // Fetch updated categories after deletion
        });
    }

    const filterCategories = (categoryList, targetId, ids) => {
        for (const category of categoryList) {
            if (category._id === targetId) {
                if (!ids.includes(category._id)) {
                    ids.push(category._id);
                }
                if (category.children.length > 0) {
                    for (const child of category.children) {
                        if (!ids.includes(child._id)) {
                            ids.push(child._id);
                        }
                        filterCategories(categoryList, child._id, ids);
                    }
                }
                break; // Exit loop after finding the targetId
            } else {
                filterCategories(category.children, targetId, ids);
            }
        }
    };

    const handleDeleteCat = (id) => {
        const ids = [];
        if (data.categoryList) {
            filterCategories(data.categoryList, id, ids);
        }

        if (data.categoryList) {
            dispatch(deleteCategory({ ids })).then(() => {
                dispatch(getCategories()); // Fetch updated categories after deletion
            });

        }
    };





    // console.log(data.categoryList)








    const flattenCategories = (category, flattenedCategories) => {
        flattenedCategories.push(category); // Add current category to the flattened array

        // Recursively flatten children categories
        if (category.children && category.children.length > 0) {
            category.children.forEach(child => flattenCategories(child, flattenedCategories));
        }
    };

    const flattenedCategories = [];
    data.categoryList && data.categoryList.forEach(category => flattenCategories(category, flattenedCategories));

    function getNameById(id) {
        for (const category of flattenedCategories) {
            if (category._id === id) {
                return category.name;
            }
            if (category.children.length > 0) {
                const childName = getNameByIdRecursive(category.children, id);
                if (childName) {
                    return childName;
                }
            }
        }
        return null;
    }

    function getNameByIdRecursive(categories, id) {
        for (const category of categories) {
            if (category._id === id) {
                return category.name;
            }
            if (category.children.length > 0) {
                const childName = getNameByIdRecursive(category.children, id);
                if (childName) {
                    return childName;
                }
            }
        }
        return null;
    }



    let filteredOrders;

    if (data.categoryList) {
        filteredOrders = flattenedCategories.filter((cat) => {
            const { name, createdAt, updatedAt } = cat;

            // Perform the filtering based on the search query
            return (
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                createdAt.toString().includes(searchQuery) ||
                updatedAt.toString().includes(searchQuery)

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


    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    return (
        <>
            <section className="max-w-xxl p-6 mx-auto bg-[#ffffff] rounded-md shadow-lg mb-4   dark:bg-gray-800 mt-2">
                <h1 className="text-xl font-bold text-black capitalize dark:text-white">Add Category</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="name">Course Name</label>
                            <input required id="name" onChange={handleChange} value={category.name} name="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-black dark:text-gray-200" htmlFor="select">Parent Id </label>
                            <select onChange={handleChange} value={category.parentId} name="parentId" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none ">
                                <option value="" hidden selected></option>
                                {flattenedCategories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                       
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-red focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </form>
            </section>

            {/*  */}

            <Card className="w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-1 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Category list
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
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
                <CardBody className="overflow-scroll px-0 sm:w-auto w-[100vw]">
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
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.categoryList && filteredOrders
                                .sort((a, b) => {
                                    switch (sortOrder.column) {
                                        case "Name":
                                            return sortOrder.order === "asc"
                                                ? a.name.localeCompare(b.name)
                                                : b.name.localeCompare(a.name);
                                        case "CreatedAt":
                                            return sortOrder.order === "asc"
                                                ? a.createdAt.localeCompare(b.createdAt)
                                                : b.createdAt.localeCompare(a.createdAt);
                                        case "UpdatedAt":
                                            return sortOrder.order === "asc"
                                                ? a.updatedAt.localeCompare(b.updatedAt)
                                                : b.updatedAt.localeCompare(a.updatedAt);
                                        default:
                                            return 0;
                                    }
                                })
                                .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)
                                .map(({ categoryImage, name, parentId, createdAt, updatedAt, _id }, index) => {
                                    const isLast = index === flattenedCategories.length - 1;
                                    const classes = isLast ? "px-4 pt-2" : "px-4 pt-2 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
                                            {/* <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <img src={categoryImage.url} alt={name} width="50px" />

                                                </div>
                                            </td> */}
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                                                    {getNameById(parentId)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal mb-0">
                                                    {createdAt.slice(0, 10)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal mb-0 ">
                                                    {updatedAt.slice(0, 10)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit Category">
                                                    <IconButton variant="text" color="blue-gray" >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Delete Category">
                                                    <IconButton variant="text" color="blue-gray" onClick={() => handleDeleteCat(_id)}>
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
                        Page {currentPage} of {Math.ceil(data.categoryList && flattenedCategories.length / coursesPerPage)}
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
                            disabled={currentPage === Math.ceil(data.categoryList && flattenedCategories.length / coursesPerPage)}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>

    )
}

export default NewCategory