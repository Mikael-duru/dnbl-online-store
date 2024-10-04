import React from "react";

type InputProps = {
	label: string;
	name: string;
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
};

const Input: React.FC<InputProps> = ({ name, label, value, onChange }) => {
	return (
		<div>
			<label htmlFor={name} className="label-heading">
				{label}
			</label>
			<input
				type={name}
				id={name}
				required
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="mt-2 block w-full p-4 border border-gold-border shadow-sm ring-1 ring-inset ring-gray-300 rounded-md text-[#101928] dark:text-white placeholder:text-[#98A2B3] dark:placeholder:text-gray-400 text-sm leading-[20.3px] focus:outline-none focus:ring-2 focus:ring-gold-border"
			/>
		</div>
	);
};

export default Input;
