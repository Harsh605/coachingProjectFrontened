import React from 'react'
import { useNavigate } from 'react-router-dom'

const Rewards = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                <h1 className="bigHeading pt-3 pb-3 sm:pb-8 font-semibold xl:text-4xl lg:text-3xl md:text-3xl text-2xl text-white lg:leading-[2.5rem] 2xl:leading-[3.7rem]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4361EE] to-[#4CC9F0]">
                        Rewards
                    </span>
                </h1>
                <div className="mt-1 sm:mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    <div className="group relative cursor-pointer" onClick={()=>navigate("rewards")}>
                        <div className="flex justify-center items-center bg-gradient-to-b from-[#000120] to-[#3b39aa] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-40">
                            <h3 className="text-sm text-white fs-3 text-center">
                                Rewards
                            </h3>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Rewards