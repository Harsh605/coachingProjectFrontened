import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleUserAdmin } from '../../slices/userSlice'
import SingleUserBuyTable from '../Compontents/SingleUserBuyTable'
import { Typography } from "@material-tailwind/react";

const SingleUser = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { SingleUserAdmin } = useSelector((state) => state.custom2);

    useEffect(() => {
        dispatch(getSingleUserAdmin(id))
    }, [dispatch])
    return (

        SingleUserAdmin &&
        <>
            <figure className="relative h-[50vh] w-full">
                <img
                    className="h-full w-full rounded-xl"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                />
                <figcaption className="absolute bottom-8 left-2/4 flex flex-wrap-reverse w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div>
                        <Typography variant="h5" color="blue-gray"  style={{wordBreak:"break-word"}}>
                            {SingleUserAdmin.name} ({SingleUserAdmin.role})
                        </Typography>
                        <Typography color="gray" className="mt-2 font-normal" style={{wordBreak:"break-word"}}>
                            {SingleUserAdmin.email}
                        </Typography>
                      
                    </div>
                    <img
                        className="h-20 w-20 rounded-full"
                        src={SingleUserAdmin.avatar.url}
                        alt="nature image"
                    />
                </figcaption>
            </figure>

            <div>
                <SingleUserBuyTable />
            </div>
        </>




    )
}

export default SingleUser