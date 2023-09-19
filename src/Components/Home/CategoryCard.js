import React from "react"

const CategoryCard = ({ catName, catId }) => {
    return (
        <>
            <div key={catId} className="group relative cursor-pointer">
                <div className="flex justify-center items-center bg-gradient-to-b from-[#000120] to-[#3b39aa] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-40">
                     <h3 className="text-sm text-white fs-3 text-center">
                            {catName}
                        </h3>
                </div>
                
            </div>
        </>
    )
}

export default CategoryCard