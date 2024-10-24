import React from "react";

function Loader() {
	return (
		<div className="flex justify-center items-center h-[60vh] dark:bg-[#1E1E1E]">
			<div className="lds-ring w-[400px]">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Loader;
