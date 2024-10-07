import * as React from "react";
import {
	Html,
	Text,
	Heading,
	Container,
	Link,
	Hr,
	Tailwind,
	Section,
	Body,
	Head,
	Img,
} from "@react-email/components";

interface EmailTemplateProps {
	firstName: string;
	otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	otp,
}) => (
	<Html>
		<Head />
		<Tailwind>
			<Body className="min-h-screen font-sans bg-white m-0 p-0 text-base">
				<Container className="min-h-screen max-w-[800px] mx-auto my-5 p-5 rounded-lg shadow-md">
					<Section className="text-center">
						<Heading className="text-lg md:text-2xl text-[#333]">
							Welcome to DNBL Online Store
						</Heading>
					</Section>
					<Hr className="pt-2 pb-10 mb-4 border-none h-[1px] w-full bg-gray-300 " />
					<Section className="px-4">
						<Text className="text-[#333]">
							Hello <span className="text-[#B47B2B]">{firstName}!,</span>
						</Text>
						<Text className="text-[#333]">
							Thank you for registering with us. To complete your registration,
							please use the OTP code below to verify your email:
						</Text>
						<Text className="text-3xl font-bold my-20 text-center text-[#B47B2B]">
							{otp}
						</Text>
						<Text className="text-[#333]">
							For security purposes, this code will expire in 10 minutes.
						</Text>
						<Text className="text-[#333]">
							If you did not request this, please disregard it or contact our
							support team immediately.
						</Text>
						<Text className="text-[#333]">Need Help?</Text>
						<Text className="text-[#333]">
							If you have any questions or need assistance, feel free to reach
							out to our customer support at{" "}
							<Link href="mailto:Customersupport@denobleslimited.com">
								Customersupport@denobleslimited.com
							</Link>
							.
						</Text>
						<Text className="text-[#333]">
							Thank you for trusting{" "}
							<span className="text-[#B47B2B] font-bold">
								D&apos;Nobles Fashion House
							</span>{" "}
							with your fashion needs.
						</Text>
						<Text className="text-[#333]">
							Best regards,
							<br />
							<span className="text-lg text-[#B47B2B] font-bold">
								DNBL Fashion House Team
							</span>
						</Text>
						<Text className="text-[#333]">Your Fashion, Our Passion</Text>
						<Section className="my-5">
							{/* Social Icons */}
							<Link
								href="https://www.denobleslimited.com/"
								title="Website"
								className="inline-block mr-2"
							>
								<Img
									src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
									alt="Website"
									className="w-5 h-5"
								/>
							</Link>
							<Link
								href="https://www.facebook.com/profile.php?id=61560331935864&mibextid=LQQJ4d"
								title="Facebook"
								className="inline-block mr-2"
							>
								<Img
									src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
									alt="Facebook"
									className="w-5 h-5"
								/>
							</Link>
							<Link
								href="https://www.instagram.com/dnbl_fashion?igsh=Ym8yaDBxZXZ0emJj&utm_source=qr"
								title="Instagram"
								className="inline-block mr-2"
							>
								<Img
									src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
									alt="Instagram"
									className="w-5 h-5"
								/>
							</Link>
							{/* <Link
							href="https://x.com/dnbl_fashion"
							title="Twitter"
							className="inline-block mr-2"
						>
							<Img
								src="https://i.postimg.cc/sXhTvwYw/twitter.png"
								alt="Twitter"
								className="w-5 h-5"
							/>
						</Link> */}
							<Link
								href="https://www.tiktok.com/@dnbl_fashion?_t=8pPQBAP2NWE&_r=1"
								title="TikTok"
								className="inline-block"
							>
								<Img
									src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
									alt="TikTok"
									className="w-5 h-5"
								/>
							</Link>
						</Section>
					</Section>
					<Section className="text-center text-gray-600 mt-5 text-sm">
						<Text>
							Your Fashion, Our Passion
							<br />
							<Link
								href="https://www.denobleslimited.com/privacy-policy"
								className="text-blue-600 underline"
							>
								Privacy Policy
							</Link>{" "}
							|{" "}
							<Link
								href="https://www.denobleslimited.com/terms-of-use"
								className="text-blue-600 underline"
							>
								Terms of Service
							</Link>
							<br />
							<span className="text-gray-400">
								4, Layosipe Street, Itamerin
								<br />
								Ago-Iwoye
								<br />
								Ogun State, Nigeria
							</span>
						</Text>
						<Text>
							Note: This is an automated message, please do not reply directly
							to this email.
						</Text>
					</Section>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);
