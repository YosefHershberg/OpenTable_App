import React from 'react'

function Images({ images }: { images: string[] }) {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                {`${images.length} photo${images.length !== 1 && 's'}`}
            </h1>
            {/* <div className="flex justify-center w-full"> */}
                <div className="flex flex-wrap justify-center">
                    {images.map(imageUrl => {
                        return (
                            <img
                                key={imageUrl}
                                className="w-56 h-44 mr-1 mb-1"
                                src={imageUrl}
                                alt=""
                            />)
                    })
                    }
                </div>
            {/* </div> */}
        </div>
    )
}

export default Images