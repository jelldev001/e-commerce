import React from 'react'

const SummaryCart = () => {
    return (
        <div className='mx-auto'>
            <div className='flex flex-warp gap-4'>
                {/* left */}
                <div className='w-2/4'>
                    <div className='bg-gray-200 rounded-md shadow-md p-4 space-y-4 '>
                        <h1 className='font-bold text-lg'>Location</h1>
                        <textarea className='w-full bg-white' name="" id=""></textarea>
                        <button className='bg-sky-400 px-4 rounded-md text-white hover:bg-sky-600
                        hover:translate-y-1 hover:duration-200 hover:scale-105 hover:cursor-pointer py-2'>Save Address</button>
                    </div>
                </div>
                {/* right */}
                <div className='w-2/4'>
                    <div className='bg-gray-200 rounded-md shadow-md p-4 space-y-4'>
                        <h1 className='font-bold text-lg'>your order</h1>
                        {/* item list  */}
                        <div className=''>
                            <div className='flex justify-between items-end'>
                                {/* left */}
                                <div>
                                    <p>Title : Asus</p>
                                    <p>count : 1*9333 </p>
                                </div>
                                {/* right */}
                                <div>
                                    <p className='text-green-400'> $9333</p>
                                </div>
                            </div>
                        </div>
                        {/* total */}
                        <div>
                            <div className='flex justify-between'>
                                <p>ค่าจัดส่ง</p>
                                <p className='text-red-500'>000</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>ส่วนลด</p>
                                <p className='text-red-500'>000</p>
                            </div>
                        </div>
                        {/* total */}
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>ยอดรวมสุทธิ</p>
                                <p className='font-bold text-green-400'>000</p>
                            </div>
                        </div>
                        <div>
                            <button className=''>check in </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCart