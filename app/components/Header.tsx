import SearchBar from "./SearchBar"

function Header() {

    return (
        <div className="md:h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-7">
            <div className="text-center md:mt-10">
                <h1 className="text-white sm:text-5xl text-4xl font-bold mb-4">
                    Find your table for any occasion
                </h1>
                <SearchBar />
            </div>
        </div>
    )
}

export default Header