const Loader = () => {
    return (
        <div className="p-[20px] animate-pulse bg-gray-200 h-auto w-[90%] pb-12 mx-auto mb-16 flex flex-col space-y-[20px] border rounded-md">
            <div className='flex space-x-[10px]'>
                <div className=" bg-white animate-pulse rounded-[4px] h-[48px] w-[48px] flex items-center justify-center">
                    <span className="w-12 h-4 bg-white animate-pulse"></span>
                </div>
                <div className='flex flex-col justify-between items-start animate-pulse bg-white'>
                    <h2 className="w-16 h-4 animate-pulse bg-white"></h2>
                    <h1 className="w-20 h-4 animate-pulse bg-white"></h1>
                </div>
            </div>
            <div className='rounded-[20px] w-[60%] lg:w-[20%] h-[10rem] lg:h-[16rem] animate-pulse bg-white'>
                <div className='w-[20%] max-h-[500px] lg:max-h-[300px] rounded-[12px]' />
            </div>
            <div className='w-full flex justify-end animate-pulse'>
                <button className={`py-4 lg:py-6 px-12 lg:px-16 bg-white rounded-[6px]`}></button>
            </div>
        </div>
    )
};

export default Loader;