import Image from "next/image";
import React from "react";

function AboutUs() {
	const aboutUsInfos = [
		{
			title: "Our Story",
			content: `
        D'Nobles Fashion House envisions a world where Nigerian elegance and heritage are celebrated globally through premium fashion. 
        We aim to bridge cultures with exquisite products embodying Nigeria's vibrant traditions and sophisticated craftsmanship. 
        Our goal is to inspire pride and connection among the Nigerian diaspora and fashion enthusiasts worldwide, making our brand synonymous with quality, community, and cultural excellence.
      `,
			underlineWidth: "w-[145px] sm:w-[227px] lg:w-[305px]",
			reverse: false,
		},
		{
			title: "Our Mission",
			content: `
        Our journey began with a vision to connect the Nigerian diaspora with their roots through premium-quality products and services. 
        Our brand is a testament to the rich cultural heritage and elegance of Nigeria. Inspired by the vibrant traditions and sophisticated craftsmanship of our homeland, 
        we aim to bring a piece of Nigeria to you, no matter where you are in the world.
      `,
			underlineWidth: "w-[182px] sm:w-[290px] lg:w-[387px]",
			reverse: true,
		},
		{
			title: "Our Values",
			content: `
        At the heart of our brand are our core values: <br />
        <strong>- Quality:</strong> We are committed to offering only the finest products that meet the highest standards of craftsmanship. <br />
        <strong>- Community:</strong> We believe in the power of community and aim to create a space where the Nigerian diaspora can connect, share, and support each other. <br />
        <strong>- Cultural Pride:</strong> We celebrate our heritage and are dedicated to promoting and preserving the rich traditions of Nigeria.
      `,
			underlineWidth: "w-[167px] sm:w-[265px] lg:w-[361px]",
			reverse: false,
		},
	];

	return (
		<main className="bg-white dark:bg-[#1E1E1E]">
			{/* Banner */}
			<section className="relative">
				<Image
					src="/assets/About-banner.png"
					alt="About Us Banner"
					width={1440}
					height={429}
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-banner-layer w-full h-full z-10"></div>

				{/* Headings */}
				<div className="absolute top-[40%] 2xl:top-[168px] left-1/2 -translate-x-1/2 z-20">
					<h1 className="text-white text-center font-open-sans font-bold text-[28px] leading-[1px] sm:text-6xl sm:leading-[1px] lg:text-7xl lg:leading-[1px] xl:text-8xl xl:leading-[28px] xl:pl-8">
						About Us
					</h1>
					<h2 className="w-[250px] sm:w-[544px] mx-auto text-white text-center italic font-open-sans text-[10px] sm:text-lg lg:text-2xl font-bold leading-normal pt-3 sm:pt-[27px] 2xl:pr-[35px]">
						Our Story, Our Mission, and Our Vision
					</h2>
				</div>

				{/* Core values card */}
				<div className="max-sm:hidden absolute z-30 bottom-[1px] left-1/2 -translate-x-1/2">
					<div className="flex gap-6 xl:gap-[46px] justify-center items-center w-[644px]">
						{["Our Story", "Our Mission", "Our Values"].map((text) => (
							<p
								className="bg-white dark:bg-[#1E1E1E] dark:border dark:border-dark-brown py-1 lg:py-2 px-3 lg:px-4 font-open-sans lg:text-2xl italic font-bold"
								key={text}
							>
								<span className="text-gradient">{text}</span>
							</p>
						))}
					</div>
				</div>
			</section>

			{/* Body */}
			<section className="max-2xl:px-[5%] px-[100px] max-2xl:py-[10%] pt-[170px] pb-[167px]">
				<div className="flex flex-col gap-10 md:gap-20 lg:gap-[130px]">
					{aboutUsInfos.map((aboutUsInfo, index) => (
						<div
							key={index}
							className={`flex flex-col ${
								aboutUsInfo.reverse ? "md:flex-row-reverse" : "md:flex-row"
							} justify-center items-center gap-14 lg:gap-[74px]`}
						>
							<div className="flex flex-col gap-4 2xl:gap-10">
								<div className="relative">
									<h2 className="text-gradient font-open-sans font-bold text-3xl sm:text-5xl lg:text-[64px] sm:leading-[120%]">
										{aboutUsInfo.title}
									</h2>
									{/* Underline */}
									<hr
										className={`${aboutUsInfo.underlineWidth} h-[3px] bg-gold-gradient absolute bottom-1 lg:bottom-2 left-0 outline-none border-none`}
									/>
								</div>
								<p
									className="text-black dark:text-white font-open-sans text-sm max-sm:leading-[24px] sm:text-base lg:text-xl 2xl:text-[30px] font-normal xl:leading-[40px] tracking-[0.47px] sm:w-[60ch] md:w-[99.5%]"
									dangerouslySetInnerHTML={{ __html: aboutUsInfo.content }}
								/>
							</div>

							{/* Image Section */}
							<div className="hidden shrink-0 md:flex justify-center items-center xl:gap-[29.5px] xl:w-[430.5px] h-full">
								<div className="flex flex-col gap-[31px]">
									<Image
										src="/assets/about-img-1.png"
										alt="Woman working"
										width={200}
										height={200}
										className="object-cover"
									/>
									<Image
										src="/assets/about-img-2.png"
										alt="Woman working"
										width={200.5}
										height={200}
										className="object-cover hidden xl:inline-block"
									/>
								</div>

								<div className="flex flex-col gap-[31px] xl:-mb-20">
									<Image
										src="/assets/about-img-2.png"
										alt="Woman working"
										width={200.5}
										height={200}
										className="object-cover hidden xl:inline-block"
									/>
									<Image
										src="/assets/about-img-1.png"
										alt="Woman working"
										width={200}
										height={200}
										className="object-cover hidden xl:inline-block"
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}

export default AboutUs;
