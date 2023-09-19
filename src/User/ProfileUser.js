import React, { useState } from 'react'
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import ProfileUpdatedDialog from '../Admin/Compontents/ProfileDialog';
import ChangePasswordDialog from '../Admin/Compontents/ChangePasswordDialog';
import { Button } from '@mui/material';

const ProfileUser = ({ userData }) => {
    const [open , setOpen] = useState(false)
    const [open2 , setOpen2] = useState(false)
    const [name,setName] = useState(userData?.name)
    const [email,setEmail] = useState(userData?.email)
    const [avatar,setAvatar] = useState(userData?.avatar.url)

    const handleChangeProfile = () => {
        setOpen(true)
    }
    return (
        <>
            <figure className="relative h-[50vh] w-full">
            <ChangePasswordDialog open={open2} setOpen={setOpen2}/>
            <ProfileUpdatedDialog open={open} setOpen={setOpen} name={name} setName={setName} avatar={avatar} setAvatar={setAvatar} email={email} setEmail={setEmail}/>
                <img
                    className="h-full w-full rounded-xl"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                />
                <figcaption className="absolute bottom-8 left-2/4 flex flex-wrap-reverse w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div>
                        <Typography variant="h5" color="blue-gray" style={{ wordBreak: "break-word" }}>
                            {userData?.name} ({userData?.role})
                            <span onClick={handleChangeProfile}>
                            <Tooltip content="Update Profile">
                                    <IconButton variant="text" color="black">
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                </Tooltip>
                            </span>
                        </Typography>
                      
                        <Typography color="gray" className="mt-2 font-normal" style={{ wordBreak: "break-word" }}>
                            {userData?.email}
                        </Typography>

                    </div>
                    <img
                        className="h-20 w-20 rounded-full"
                        src={userData?.avatar.url}
                        alt="nature image"
                    />
                </figcaption>
            </figure>
            <Button variant='contained' onClick={()=>setOpen2(true)}>Change Password</Button>
        </>
    )
}

export default ProfileUser