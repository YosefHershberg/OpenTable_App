import React from 'react'

function Header({ name }: { name: string }) {

    function formatString(str: string) {
        let words = str.split("-");
        let formattedString = "";

        for (let i = 0; i < words.length; i++) {
            let word = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            if (i === words.length - 1) {
                formattedString += `(${word})`;
            } else {
                formattedString += `${word} `;
            }
        }

        return formattedString;
    }

    return (
        <div className="md:h-96 h-48 overflow-hidden">
            <div
                className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
            >
                <h1 className="md:text-7xl text-4xl text-white capitalize text-shadow text-center">
                    {formatString(name)}
                </h1>
            </div>
        </div>
    )
}

export default Header