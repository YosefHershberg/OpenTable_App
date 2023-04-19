import React from 'react'

function Title({name}: {name: string}) {
    return (
        <div className="mt-4 border-b pb-6">
            <h1 className="font-bold sm:text-4xl md:text-6xl text-2xl">{name}</h1>
        </div>
    )
}

export default Title