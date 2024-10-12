import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	// Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface DNBLVerifyEmailProps {
	firstName: string;
	otp: string;
}

// const baseUrl = process.env.LOCAL_HOST_URL
// 	? `http://${process.env.LOCAL_HOST_URL}`
// 	: "";

export default function DNBLVerifyEmail({
	firstName,
	otp,
}: DNBLVerifyEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>DNBL Email Verification</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={coverSection}>
						<Section style={imageSection}>
							<Text>DNBL Logo</Text>
							{/* <Img
								src={`${baseUrl}/assets/logo-white.svg`}
								width="75"
								height="45"
								alt="DNBL's Logo"
							/> */}
						</Section>
						<Section style={upperSection}>
							<Heading style={h1}>Verify your email address</Heading>

							<Text style={subHeading}>Hello {firstName}!,</Text>

							<Text style={mainText}>
								Thank you for trusting us with your fashion needs. We want to
								make sure it&apos;s really you. Please enter the following
								verification code when prompted. If you don&apos;t want to
								create an account, you can ignore this message.
							</Text>
							<Section style={verificationSection}>
								<Text style={verifyText}>Verification code</Text>

								<Text style={codeText}>{otp}</Text>
								<Text style={validityText}>
									(This code is valid for 10 minutes)
								</Text>
							</Section>

							<Text style={subText}>
								Return to the{" "}
								<Link
									href="http://localhost:3000/sign-up/auth/email-verification"
									style={link}
								>
									verification page
								</Link>
								.
							</Text>

							<Text style={subText}>
								If you have any questions or need assistance, feel free to reach
								out to our customer support at{" "}
								<Link
									href="mailto:Customersupport@denobleslimited.com"
									style={link}
								>
									Customersupport@denobleslimited.com
								</Link>
								.
							</Text>
						</Section>
						<Hr />
						<Section style={lowerSection}>
							<Text style={cautionText}>
								D&apos;Nobles Limited Fashion House will never email you and ask
								you to disclose or verify your password, credit card, or banking
								account number.
							</Text>
						</Section>
					</Section>
					<Text style={footerText}>
						This message was produced and distributed by D&apos;Nobles Limited
						Fashion House, 4, Layosipe Street, Itamerin, Ago-Iwoye Ogun State. ©
						2024. All rights reserved. DNBL is a registered trademark of{" "}
						<Link
							href="https://www.denobleslimited.com/"
							target="_blank"
							style={link}
						>
							Denobleslimited.com
						</Link>
						. View our{" "}
						<Link
							href="https://www.denobleslimited.com/privacy-policy"
							target="_blank"
							style={link}
						>
							privacy policy
						</Link>
						.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#fff",
	color: "#212121",
};

const container = {
	padding: "20px",
	margin: "0 auto",
	backgroundColor: "#eee",
};

const h1 = {
	color: "#333",
	textAlign: "center" as const,
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "20px",
	fontWeight: "bold",
	marginBottom: "15px",
};

const link = {
	color: "#2754C5",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	textDecoration: "underline",
};

const text = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	margin: "24px 0",
};

const imageSection = {
	backgroundColor: "#252f3d",
	padding: "20px 0",
	textAlign: "center" as const,
	color: "#fff",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "30px",
	fontWeight: "bold",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const subHeading = {
	...text,
	color: "#B47B2B",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "18px",
	fontWeight: "bold",
	marginBottom: "0px",
};

const footerText = {
	...text,
	fontSize: "12px",
	padding: "0 20px",
};

const verifyText = {
	...text,
	margin: 0,
	fontWeight: "bold",
};

const codeText = {
	...text,
	fontWeight: "bold",
	fontSize: "36px",
	margin: "10px 0",
};

const validityText = {
	...text,
	margin: "0px",
	color: "#B47B2B",
};

const verificationSection = {
	textAlign: "center" as const,
};

const mainText = { ...text, marginBottom: "14px" };

const subText = {
	...text,
};

const cautionText = { ...text, margin: "0px" };
