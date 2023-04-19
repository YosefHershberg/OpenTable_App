import React from 'react'

interface Props {
    inputs: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        city: string;
        password: string;
    },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    signinMode: boolean,
    isPassowrdType: boolean,
    setIsPasswordType: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthInputs(
    {
        inputs,
        handleInputChange,
        signinMode,
        isPassowrdType,
        setIsPasswordType
    }: Props) {
    return (
        <div>
            {!signinMode && <div className="my-2 sm:flex justify-between text-sm">
                <input
                    type="text"
                    name='firstName'
                    className="border rounded p-2 py-3 sm:w-[49%] w-full sm:mb-0 mb-2"
                    placeholder='First Name'
                    value={inputs.firstName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name='lastName'
                    className="border rounded p-2 py-3 sm:w-[49%] w-full"
                    placeholder='Last Name'
                    value={inputs.lastName}
                    onChange={handleInputChange}
                />
            </div>}
            <div className="my-3 flex justify-between text-sm">
                <input
                    type="text"
                    name='email'
                    className="border rounded p-2 py-3 w-full"
                    value={inputs.email}
                    placeholder='Email'
                    onChange={handleInputChange}
                />
            </div>
            {!signinMode && <div className="my-2 sm:flex justify-between text-sm">
                <input
                    type="text"
                    name='phone'
                    className="border rounded p-2 py-3 sm:w-[49%] w-full sm:mb-0 mb-2"
                    placeholder='Phone Number'
                    onChange={handleInputChange}
                    value={inputs.phone}
                />
                <input
                    type="text"
                    name='city'
                    className="border rounded p-2 py-3 sm:w-[49%] w-full"
                    placeholder='City'
                    onChange={handleInputChange}
                    value={inputs.city}
                />
            </div>}
            <div className="my-3 flex justify-between text-sm">
                <input
                    type={isPassowrdType ? "password" : 'text'}
                    name='password'
                    className="border rounded p-2 py-3 w-full"
                    placeholder='Password'
                    onChange={handleInputChange}
                    value={inputs.password}
                />
            </div>
            <div className="flex items-center my-3">
                <input
                    className='mr-2'
                    id='showPassword'
                    type="checkbox"
                    checked={!isPassowrdType}
                    onChange={() => setIsPasswordType(prev => !prev)}
                />
                <label className='font-light text-sm' htmlFor="showPassword">Show Password</label>
            </div>
        </div>
    )
}
