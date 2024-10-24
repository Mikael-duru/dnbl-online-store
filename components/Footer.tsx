"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import {
	RiInstagramLine,
	RiFacebookFill,
	RiTwitterXFill,
	RiTiktokFill,
} from "react-icons/ri";
import Image from "next/image";
// import { getUniqueCategoriesMaterialsSizes } from "@/lib/actions/filterActions";

const footerAboutDnbl = [
	{ title: "About Us", link: "/about-us" },
	{ title: "Contact Us", link: "/contact-us" },
	{ title: "Terms & Conditions", link: "/terms-of-use" },
	{ title: "Privacy Policy", link: "/privacy-policy" },
	{ title: "Cookie Notice", link: "/cookie-notice" },
];

interface FooterProps {
	uniqueCategories: string[]; // Assuming uniqueCategories is an array of strings
}

// Work on this
const Footer: React.FC<FooterProps> = ({ uniqueCategories }) => {
	const pathname = usePathname();

	return (
		<footer className="bg-[#1E1E1E] dark:border-t-2 dark:border-t-dark-brown  px-[5%] lg:pt-[68px] py-10 lg:pb-[113px] xl:px-[105px] relative">
			<div className="flex flex-col gap-16 xl:flex-row xl:items-center 2xl:gap-[156px] mb-5">
				<div className="grid gap-8">
					<Link href={"/"} className="shrink-0 w-[120px] sm:w-[138px]">
						<Image
							src="/assets/logo-white.svg"
							width={138}
							height={60}
							alt="DNBL logo"
							className="w-auto h-auto"
						/>
					</Link>

					<div className="flex items-start gap-4">
						<Link
							href="https://www.instagram.com/dnbl_fashion?igsh=Ym8yaDBxZXZ0emJj&utm_source=qr"
							target="_blank"
							className="hover:text-gold-text hover:border-gold-text duration-200 text-white border-[1.5px] border-border-gray text-xl p-[6px] rounded-full"
						>
							<RiInstagramLine />
						</Link>
						<Link
							href="https://www.facebook.com/profile.php?id=61560331935864&mibextid=LQQJ4d"
							target="_blank"
							className="hover:text-gold-text hover:border-gold-text duration-200 text-white border-[1.5px] border-border-gray text-xl p-[6px] rounded-full"
						>
							<RiFacebookFill />
						</Link>
						<Link
							href="https://x.com/dnbl_fashion"
							target="_blank"
							className="hover:text-gold-text hover:border-gold-text duration-200 text-white border-[1.5px] border-border-gray p-[6px] rounded-full text-[19.5px]"
						>
							<RiTwitterXFill />
						</Link>
						<Link
							href="https://www.tiktok.com/@dnbl_fashion?_t=8pPQBAP2NWE&_r=1"
							target="_blank"
							className="hover:text-gold-text hover:border-gold-text duration-200 text-white border-[1.5px] border-border-gray text-xl p-[6px] rounded-full"
						>
							<RiTiktokFill />
						</Link>
					</div>
				</div>

				<div className="flex flex-col items-start gap-8 md:gap-10 md:flex-row lg:gap-24">
					<div className="md:w-[230px] shrink-0">
						<h2 className="pb-3 text-gradient text-lg font-semibold font-open-sans uppercase">
							Useful Links
						</h2>
						<ul className="flex flex-col items-start gap-1">
							{uniqueCategories?.map((category, index) => (
								<li
									key={index}
									className={`font-roboto text-base font-normal capitalize ${
										pathname === `/products-category/${category}`
											? "text-[#B47B2B]"
											: "text-[#B6B6B6]"
									} hover:text-[#B47B2B]`}
								>
									<Link href={`/products-category/${category}`}>
										{category}'s Product
									</Link>
								</li>
							))}
							<li
								className={`pt-1 font-roboto text-base font-normal capitalize ${
									pathname === "/size-chart-description"
										? "text-[#B47B2B]"
										: "text-[#B6B6B6]"
								}`}
							>
								<Link href="/size-chart-description">
									How to take measurements
								</Link>
							</li>
						</ul>
					</div>

					<div className="lg:pr-8 xl:pr-0 shrink-0">
						<h2 className="pb-3 text-gradient text-lg font-semibold font-open-sans uppercase">
							About DNBL
						</h2>
						<ul className="flex flex-col items-start gap-1">
							{footerAboutDnbl.map(({ title, link }) => (
								<li
									key={title}
									className={`font-roboto text-base font-normal ${
										pathname === link ? "text-[#B47B2B]" : "text-[#B6B6B6]"
									} hover:text-[#B47B2B]`}
								>
									{" "}
									<Link href={link}>{title}</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="grid gap-3">
						<h2 className="text-gradient font-open-sans text-lg font-normal">
							Subscribe to our newsletter
						</h2>
						<p className="text-[#B6B6B6] text-base font-open-sans font-normal">
							Stay in touch with latest updates from DNBL.
						</p>
						<NewsletterForm />
					</div>
				</div>
			</div>

			<hr className="absolute left-0 right-0 bottom-38 h-[0.682px] border-b-4 border-dark-brown bg-dark-brown" />

			<p className="pt-3 text-white text-sm text-center font-semibold font-open-sans">
				© 2024 DNBL. All rights reserved
			</p>
		</footer>
	);
};

export default Footer;
