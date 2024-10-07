import React from "react";

const TextComp = ({ header, text, children }) => {
	return (
		<div>
			<h1 className='sf700 font-[700] md:text-[24px] md:leading-[30px] text-[#000000CC] mb-[0.5rem]  '>
				{header}
			</h1>

			{text ? (
				<h2 className='sf400 text-[1.25rem] leading-[30px]  text-[#00000084] '>
					{text}
				</h2>
			) : (
				children
			)}
		</div>
	);
};

export default TextComp;
