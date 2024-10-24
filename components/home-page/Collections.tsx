import Image from "next/image";
import Link from "next/link";

import { getCollections } from "@/lib/actions/actions";

const Collections = async () => {
	const collections = await getCollections();

	return !collections ? null : (
		<section className="pt-[38px] px-[5%] xl:px-[74px] pb-10 bg-light-brown-gold dark:bg-[#2E2E2E] dark:border-t dark:border-t-dark-brown">
			<h2 className="home-heading text-black dark:text-white pb-2 sm:pb-4">
				Collections
			</h2>

			<p className="text-sm leading-[22px] text-center text-[#333] dark:text-old-price-text pb-8 sm:px-5 lg:px-0 sm:max-w-[880px] sm:mx-auto">
				At DNBL, we bring you exclusive collections inspired by the beauty of
				every season. From bold prints to elegant styles, our seasonal
				collections are designed to help you express your individuality and
				embrace the vibrant essence of Nigerian culture.
			</p>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8 pb-11">
				{collections.map((collection: CollectionType) => (
					<Link
						href={`/collections/${collection._id}`}
						key={collection._id}
						className="hover:scale-110 transition-all ease-in-out"
					>
						<Image
							key={collection._id}
							src={collection.image}
							alt={collection.title}
							width={500}
							height={400}
							className="rounded-lg cursor-pointer w-[300px] h-[170px]"
						/>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Collections;
