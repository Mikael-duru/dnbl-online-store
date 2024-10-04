"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import toast from "react-hot-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

import Button from "@/components/Button";

function PasswordResetCode() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success(
			`You submitted the following ${JSON.stringify(data, null, 2)}`
		);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<section className="flex min-h-screen items-center justify-center bg-white shrink-0">
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-[133px] w-full justify-center items-center xl:justify-start bg-white sm:p-5 text-center sm:text-start">
				<div className="max-lg:hidden relative rounded-3xl overflow-hidden max-w-full md:max-w-[50%] lg:max-w-[50%]">
					<Image
						src="/assets/signIn-banner.png"
						alt="DNBL Fashion"
						width={700}
						height={984}
						className="max-w-full w-auto object-cover bg-blend-multiply"
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

				<div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0">
					{/* Heading */}
					<h1 className="heading">Enter verification code</h1>

					{/* Headline */}
					<p className="headline">Please check your email for the code.</p>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="pin"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup className="gap-2 sm:gap-5 mb-5 justify-self-center">
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<p className="font-fredoka text-sm font-light leading-[22.4px] text-black mb-5 text-center">
								Resend OTP in 60:00
							</p>

							<div className="flex items-center justify-center gap-2 mb-8">
								<p className="font-libre-franklin font-normal text-base leading-[23.2px]">
									Didn’t get the code?
								</p>
								<button
									type="submit"
									className="font-libre-franklin font-medium text-base leading-[23.2px] text-[#B47B2B]"
								>
									Resend
								</button>
							</div>

							<div className="w-[280px] sm:w-full mx-auto">
								<Button type="submit" label="Reset Password" />
							</div>

							<div className="flex items-center justify-center mt-10 lg:hidden">
								<Image
									src="/assets/logo-black.svg"
									width={60}
									height={60}
									alt="DNBL logo"
								/>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</section>
	);
}

export default PasswordResetCode;
