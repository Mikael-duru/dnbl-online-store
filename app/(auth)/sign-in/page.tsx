import LoginForm from "@/components/LoginForm";
import Image from "next/image";

function SignIn() {
	return (
		<section className="flex min-h-screen items-center justify-center bg-white max-2xl:dark:bg-[#2E2E2E]">
			<div className="flex flex-col lg:flex-row gap-2 lg:gap-10 xl:gap-[133px] w-full justify-center items-center xl:justify-start bg-white dark:bg-[#2E2E2E] px-[5%] sm:p-5 overflow-hidden">
				{/* Image Container */}
				<div className="relative rounded-3xl max-h-screen overflow-hidden max-w-full md:max-w-[50%] lg:max-w-[50%] max-lg:mt-5">
					<Image
						src="/assets/signIn-banner.png"
						alt="DNBL Fashion"
						width={700}
						height={984}
						className="max-w-full h-[65vh] sm:h-[80vh] object-cover lg:h-auto" // Set height for mobile and auto for larger screens
					/>
					<div className="absolute inset-0 bg-sign-in-layer"></div>
					<Image
						src="/assets/white-logo.png"
						alt="DNBL Fashion"
						width={196}
						height={88}
						className="max-xl:w-[26%] absolute top-7 left-4 md:left-[28px] z-10"
					/>
				</div>

				{/* Login Form */}
				<div className="flex-grow max-h-screen overflow-y-auto">
					<LoginForm />
				</div>
			</div>
		</section>
	);
}

export default SignIn;
