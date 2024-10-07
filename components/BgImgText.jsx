import React from "react";

const BgImgText = ({ url, header, text, isLoading }) => {
	return (
		<div className={`${isLoading && "animate-pulse"}`}
			style={{
				backgroundImage: `url("${url}")`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
		>
			<div className='h-[167px] w-full bg-[rgb(0,0,0,0.85)] opacity-[0.75] relative'>
				<div className='absolute bottom-[20px] left-[25px] lg:left-[50px]'>
					<h2 className='sf700 text-[1rem] text-white'>{header}</h2>
					<h2 className='sf700 text-[30px] font-bold lg:text-[25px] leading-[57.6px] text-white'>
						{text}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default BgImgText;
