import React from "react";

const Tab = ({ name, selected, handleClick }) => {
	return (
		<div
			className={` ${
				selected && "border-b-[#2056A7] border-[3px] border-transparent"
			} pb-[6px] cursor-pointer `}
			onClick={() => handleClick(name)}
		>
			<h2
				className={`sf600 text-[1rem] leading-[1.5rem] ${
					selected ? "text-[#2056A7]" : "text-[#7E849B]"
				}  `}
			>
				{name}
			</h2>
		</div>
	);
};

export default Tab;
