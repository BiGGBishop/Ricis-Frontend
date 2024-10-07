"use client";
import React, { useEffect, useState } from "react";

// FPI stands for form progress indicator
const FPI = ({ length, shade }) => {
	const [currentForm, setCurrentForm] = useState(1);

	useEffect(() => {
		setCurrentForm(shade ? shade : 1);
	}, [shade]);

	const circles = Array.from({ length: length }, (_, index) => (
		<div
			key={index}
			className={`w-[1.5rem] h-[1.5rem] rounded-full ${
				index < currentForm ? "bg-blue-500" : "border border-gray-300"
			}`}
		/>
	));

	const lines = Array.from({ length: length - 1 }, (_, index) => (
		<div
			key={index}
			className={`flex-1 h-[4px] ${
				index < currentForm - 1
					? "bg-blue-500"
					: "border-t border-b border-gray-300"
			}`}
		/>
	));

	return (
		<div className='flex items-center '>
			{circles.map((circle, index) => (
				<React.Fragment key={index}>
					{circle}
					{index < lines.length && lines[index]}
				</React.Fragment>
			))}
		</div>
	);
};

export default FPI;
