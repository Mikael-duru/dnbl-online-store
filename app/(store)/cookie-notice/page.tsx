import React from "react";

const CookieNotice = () => {
	return (
		<main className="bg-white dark:bg-[#2E2E2E]">
			<section className="mx-auto px-[5%] py-8 xl:px-[100px] font-open-sans">
				<h1 className="text-2xl sm:text-3xl font-bold mb-6 xl:text-center">
					D'Nobles Limited Cookie Notice
				</h1>

				<p className="policy-text pb-4">
					This Cookie Notice provides information on how D'Nobles Limited ("we,"
					"our," or "us") uses cookies when you visit our website. Any personal
					data provided to or collected by D'Nobles Limited via cookies and
					other tracking technologies is controlled by us. Please familiarize
					yourself with our cookie practices.
				</p>

				<h2 className="policy-heading text-xl font-semibold mb-2">
					Cookies and How We Use Them
				</h2>
				<p className="policy-text">
					A cookie is a small file of letters and numbers that websites send to
					your browser, which is stored on your device, such as a computer,
					phone, tablet, or any other device. Cookies enable us to distinguish
					you from other users of our website and mobile applications, helping
					us provide you with a more personalized browsing experience. For
					example, we use cookies to:
				</p>

				<ul className="list-disc list-inside pl-6 pb-4">
					<li className="policy-list pb-2">
						Recognize and count the number of visitors and see how they move
						around our sites (this helps us improve our website functionality,
						ensuring users can easily find what they are looking for).
					</li>
					<li className="policy-list pb-2">
						Identify your preferences, such as language settings, saved items,
						and stored shopping cart contents.
					</li>
					<li className="policy-list">
						Send newsletters and marketing messages tailored to your interests.
					</li>
				</ul>

				<p className="policy-text pb-4">
					Our third parties, including search engines, analytics service
					providers, social media networks, and advertising companies, may also
					set cookies when you use our site.
				</p>

				<h2 className="policy-heading text-xl font-semibold mb-2">
					Cookie Preferences
				</h2>
				<p className="policy-text">
					We use cookies to collect information and store your online
					preferences. By managing your cookie preferences, you can enable or
					disable specific sets of cookies based on predefined categories:
				</p>

				<ul className="policy-list list-disc list-inside pl-6 pb-4">
					<li className="policy-list pb-2">
						<strong>Strictly Necessary Cookies:</strong> Essential for the
						website's operation, enabling functionalities such as the shopping
						cart and checkout process. These cookies cannot be disabled.
					</li>
					<li className="policy-list pb-2">
						<strong>Analytics Cookies:</strong> Help us understand how you use
						our site, improve navigation, and identify popular features,
						enhancing your overall experience.
					</li>
					<li className="policy-list pb-2">
						<strong>Functional Cookies:</strong> Allow the site to remember
						choices you make and provide personalized features. The information
						collected is anonymized and does not track browsing activity on
						other sites.
					</li>
					<li className="policy-list pb-2">
						<strong>Targeting Cookies:</strong> Track your visits and activities
						on our site to help us make our website and advertising more
						relevant to your interests. Some information gathered by targeting
						cookies may be shared with third parties one day.
					</li>
					<li className="policy-list pb-2">
						<strong>Third-Party Cookies:</strong> Placed by third parties that
						provide services to us, such as advertising and analytics. These
						cookies function similarly to our own and help us enhance your
						experience.
					</li>
					<li className="policy-list pb-2">
						<strong>Persistent Cookies:</strong> Remain on your device for a
						predetermined period, activated each time you visit our site.
					</li>
					<li className="policy-list">
						<strong>Session Cookies:</strong> Temporary cookies that remain on
						your device only while you browse our site. They are deleted when
						you close your browser.
					</li>
				</ul>

				<h2 className="policy-heading text-xl font-semibold mb-2">Consent</h2>
				<p className="policy-text pb-4">
					Before placing cookies on your device, we will show a prompt
					requesting your consent. By giving consent, you enable us to provide
					you with the best possible experience. You may choose to enable or
					disable different categories of cookies. Additionally, you can manage
					cookies through your browser settings. For instructions on how to
					control cookies in various browsers, please refer to the help menu of
					your browser or device documentation.
				</p>

				<h2 className="policy-heading text-xl font-semibold mb-2">
					Changes to this Cookie Policy
				</h2>
				<p className="policy-text pb-4">
					We may update this Cookie Policy from time to time. Any changes will
					be highlighted and will become binding upon your first use of our site
					after the changes are made. Please check this page periodically to
					stay informed about any updates.
				</p>

				<h2 className="policy-heading text-xl font-semibold mb-2">
					Further Information
				</h2>
				<p className="policy-text pb-4">
					If you have questions about how we process your personal data or wish
					to exercise your legal rights, please contact us at{" "}
					<a
						href="mailto:Dnblfashion@denobleslimited.com"
						className="text-blue-600 hover:underline"
					>
						Dnblfashion@denobleslimited.com
					</a>
					.
				</p>
			</section>
		</main>
	);
};

export default CookieNotice;
