import Image from "next/image";
import Link from "next/link";

import ButtonPrimary from "@/components/custom-buttons/ButtonPrimary";
import ButtonSecondary from "@/components/custom-buttons/ButtonSecondary";
import WhyChooseUs from "@/components/home-page/WhyChooseUs";
import Collections from "@/components/home-page/Collections";
import HomeBanner from "@/components/home-page/HomeBanner";
import ProductLists from "@/components/home-page/ProductLists";

export default function Home() {
	return (
		<main className="bg-white dark:bg-[#1E1E1E]">
			{/* Banner */}
			<HomeBanner />

			{/* Services Card */}
			<section className="relative py-16 xl:py-0">
				<div className="xl:absolute inset-0 flex flex-col gap-12 lg:flex-row justify-center items-center lg:gap-10 z-10">
					{[
						{
							image: "/assets/mdi_style.svg",
							text: "Wide range of styles",
						},
						{
							image: "/assets/fluent-mdl2_passive-authentication.svg",
							text: "Uncompromising quality",
						},
						{
							image: "/assets/message-circle.svg",
							text: "Exceptional Customer service",
						},
					].map(({ image, text }, index) => (
						<div
							key={index}
							className="w-[290px] h-[135px] xl:w-[344px] bg-white rounded-2xl py-[15px] px-10 shadow-incentives-shadow text-center dark:bg-[#1E1E1E] dark:border-2 dark:border-dark-brown"
						>
							<Image
								src={image}
								width={32}
								height={32}
								alt=""
								className="w-auto h-auto mx-auto"
							/>
							<p className="dark:text-white pt-2 text-black font-work-sans text-xl sm:text-2xl font-semibold leading-normal tracking-[-0.48px]">
								{text}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Who Are We */}
			<section className="bg-light-gray dark:bg-[#2E2E2E] px-[5%] 2xl:px-[74px] pt-8 xl:pt-[158px] pb-[140px]">
				<div className="">
					<div className="relative text-center md:text-start">
						<h2 className="text-gradient font-open-sans font-bold text-2xl xs:text-3xl sm:text-[34px] leading-[120%]">
							WHO WE ARE
						</h2>
						<hr className="w-[158px] xs:w-[200px] sm:w-[225px] h-[3px] bg-gold-gradient absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-0 outline-none border-none" />
					</div>

					<div className="mt-4 sm:mt-6 flex flex-col items-center justify-center md:justify-between md:flex-row md:items-start gap-10 xl:gap-12 2xl:gap-6">
						<div>
							<h3 className="text-light-black dark:text-gray-300 font-open-sans text-xl sm:text-[2rem] font-normal sm:leading-[28px] underline text-center md:text-start mb-6">
								We love what we do at DNBL
							</h3>
							<p className="text-[#1E1E1E] dark:text-gray-200 text-justify font-open-sans text-base lg:text-lg xl:text-2xl xl:leading-[40px] font-normal tracking-[0.02rem] pb-8 lg:pb-[22px] 2xl:w-[716px]">
								D&apos;Nobles Limited Fashion House envisions a world where
								Nigerian elegance and heritage are celebrated globally through
								premium fashion. We aim to bridge cultures with exquisite
								products embodying Nigeria&apos;s vibrant traditions and
								sophisticated craftsmanship. Our goal is to inspire pride and
								connection among the Nigerian diaspora and fashion enthusiasts
								worldwide.
							</p>

							<div className="w-[263px] mx-auto md:mx-0">
								<ButtonSecondary
									type="button"
									label="Read More"
									// onClick={() => router.push("/about-us")}
								/>
							</div>
						</div>

						<div className="shrink-0 relative md:w-[220px] lg:w-[300px] xl:w-[509px] xl:h-[394px]">
							{[
								"/assets/banner-model-1.jpg",
								"/assets/banner-model-2.jpg",
								"/assets/banner-model-3.jpg",
							].map((src, idx) => (
								<Image
									key={idx}
									src={src}
									alt={`Nigerian fashion model ${idx + 1}`}
									width={500}
									height={500}
									className={`rounded-[50%] ${
										idx === 0
											? "max-xl:hidden absolute top-0 left-0"
											: idx === 1
											? "max-md:hidden absolute top-0 right-0"
											: "md:absolute md:top-[150px] lg:top-[150px] lg:left-0 xl:left-1/4 xl:bottom-0"
									} w-[200px] h-[200px] xl:w-[264px] xl:h-[264px] object-cover`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Collections */}
			<Collections />

			{/* Products Display */}
			<ProductLists />

			{/* Why Choose Us */}
			<section className="pt-[89px] px-[5%] 2xl:pl-[95px] 2xl:pr-[105px] pb-24 sm:pb-[164px] bg-white dark:bg-[#1E1E1E] relative">
				<h2 className="home-heading text-black dark:text-white mb-10 sm:mb-[60px] relative z-10">
					WHY CHOOSE US?
				</h2>

				<div className="relative z-10">
					<WhyChooseUs />
				</div>

				{/* Ribbons */}
				<div className="absolute top-0 right-0 max-sm:hidden">
					<Image
						src="/assets/yellow-rectangle.svg"
						alt="Decorative yellow rectangle"
						width={294}
						height={445}
						className="w-auto h-auto object-cover"
					/>
				</div>
				<div className="absolute bottom-[210px] right-0 2xl:bottom-[150px] 2xl:right-[55px] max-sm:hidden">
					<Image
						src="/assets/yellow-bullet-group.svg"
						alt="Decorative yellow bullets"
						width={272}
						height={168}
						className="w-auto h-auto object-cover"
					/>
				</div>
			</section>

			{/* Get in Touch */}
			<section className="px-[5%] pt-[54.8px] pb-[88px] items-center bg-[#FFF6E9] dark:bg-[#3A3A3A]">
				<div className="md:w-[719.72px] mx-auto">
					<p className="font-extrabold text-base xs:text-xl text-gold-text font-open-sans text-center">
						GET IN TOUCH
					</p>
					<h2 className="text-2xl xs:text-3xl text-center font-bold font-open-sans text-[#333] dark:text-white my-5 xs:mt-6 xs:mb-[27px]">
						Your Feedback Matters: Embrace a Journey of Collaboration with Us!
					</h2>
					<div className="max-w-[580px] mx-auto px-[5%]">
						<p className="pb-2 text-[#767676] dark:text-gray-300 font-semibold">
							At DNBL:
						</p>
						<ul className="list-disc flex flex-col gap-2 justify-center text-[#767676] dark:text-gray-300 text-xs xl:text-sm leading-[20px] font-open-sans mb-6 sm:mb-[44.96px]">
							<li>
								We welcome feedbacks and partnership requests to improve our
								platform and services.
							</li>
							<li>
								You can contact us for bulk purchases or to become a sales
								middleman.
							</li>
							<li>
								You can also place orders for your Bespoke/Custom made wears, by
								reaching out to the customer support via our&nbsp;
								<Link
									href="https://wa.link/gfswrn"
									className="font-bold text-brown-gold underline"
								>
									WhatsApp
								</Link>
								&nbsp;platform.
							</li>
						</ul>
					</div>

					<div className="w-[200px] mx-auto">
						<ButtonPrimary
							type="button"
							label="Contact Us"
							// onClick={() => router.push("/contact-us")}
						/>
					</div>
				</div>
			</section>
		</main>
	);
}

export const dynamic = "force-dynamic";
