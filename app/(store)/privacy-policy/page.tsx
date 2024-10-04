import React from "react";

function PrivacyNotice() {
	return (
		<main className="bg-white dark:bg-[#2E2E2E]">
			<section className="mx-auto px-[5%] py-8 xl:px-[100px] font-open-sans">
				<h1 className="text-2xl sm:text-3xl font-bold mb-6 xl:text-center">
					D&apos;Nobles Limited Privacy Notice
				</h1>

				<ol className="space-y-4 list-decimal list-inside font-semibold">
					<li className="policy-list">
						<h2 className="policy-heading">About This Notice</h2>
						<p className="policy-text">
							This Privacy Notice explains how D&apos;Nobles Limited collects,
							uses, and safeguards your personal information when you visit our
							website. It also outlines your rights concerning your personal
							data and how you can exercise them.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">Who We Are</h2>
						<p className="policy-text">
							D&apos;Nobles Limited is a fashion brand specializing in African
							prints and unique clothing designs. Our platform enables customers
							to explore and purchase our products online. This website is
							managed by D&apos;Nobles Limited, and any personal data collected
							is controlled by us.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">The Data We Collect About You</h2>
						<p className="policy-text">
							Personal data includes any information that can identify an
							individual. We collect personal data to offer personalized fashion
							products and improve our services. This data includes information
							you provide to us, such as your name, contact details, and payment
							information, as well as data automatically collected about your
							interactions with our website or mobile app.
						</p>
						<p className="policy-text">
							We gather data like contact details (e.g., name, address, email),
							demographic information (e.g., age, gender), payment information
							(e.g., credit card details), and data about your activities on our
							website, such as pages viewed and products searched.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">Cookies and Other Identifiers</h2>
						<p className="policy-text">
							Cookies are small files placed on your device to distinguish you
							from other users and enhance your browsing experience. For more
							details on our use of cookies, please refer to our Cookie Policy.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">How We Use Your Personal Data</h2>
						<p className="policy-text">
							We use your personal data to operate our business, deliver and
							improve our products and services, manage customer relationships,
							process orders, conduct marketing, and comply with legal
							obligations.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">
							Legal Basis for Processing Personal Data
						</h2>
						<p className="policy-text">
							We process personal data based on various legal grounds, including
							your consent (e.g., for marketing purposes), our legitimate
							business interests (e.g., understanding customer needs),
							fulfilling contractual obligations (e.g., processing orders), and
							compliance with legal requirements.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">How We Share Your Personal Data</h2>
						<p className="policy-text">
							We may share your personal data with third parties to deliver
							products and services, process payments, analyze data, provide
							marketing assistance, and prevent fraud. When we share your data,
							we require these third parties to handle it according to our
							Privacy Notice and applicable laws.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">International Transfers</h2>
						<p className="policy-text">
							We may transfer your personal data to other countries as permitted
							by applicable laws. We take steps to ensure your data remains
							protected regardless of its location.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">Data Retention</h2>
						<p className="policy-text">
							We retain your personal data only as long as necessary to fulfill
							the purposes outlined in this Privacy Notice, comply with legal
							obligations, resolve disputes, or enforce agreements. We regularly
							review and securely delete or anonymize data when it is no longer
							needed.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">Data Security</h2>
						<p className="policy-text">
							We implement appropriate security measures to protect your
							personal data against unauthorized access, use, or disclosure.
							Access is limited to authorized personnel who require the
							information to perform their job functions.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">Your Legal Rights</h2>
						<p className="policy-text">
							You have the right to access, correct, or delete your personal
							data, object to or restrict processing, and withdraw consent for
							marketing communications. You may also close your account at any
							time by contacting us.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">Data Controllers & Contact</h2>
						<p className="policy-text">
							If you have questions or concerns about this Privacy Notice or
							wish to exercise your rights regarding your personal data, please
							contact our Data Protection Officer at
							Customersupport@denobleslimited.com.
						</p>
					</li>

					<li className="policy-list">
						<h2 className="policy-heading">
							Related Practices and Information
						</h2>
						<ul className="list-disc list-inside policy-text">
							<li className="policy-list">
								<a
									href="/cookie-notice"
									className="text-gold-text hover:underline"
								>
									Cookie Notice
								</a>
							</li>
							<li className="policy-list">
								<a
									href="/terms-of-use"
									className="text-gold-text hover:underline"
								>
									Terms and Conditions
								</a>
							</li>
						</ul>
					</li>
				</ol>
			</section>
		</main>
	);
}

export default PrivacyNotice;
