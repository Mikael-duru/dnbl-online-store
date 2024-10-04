import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "@/components/ProductCard";

function Slider({ prods }: any) {
	return (
		<Carousel>
			<CarouselContent className="flex">
				{prods?.map((prod: any) => (
					<div className="w-[260px] shrink-0" key={prod._id}>
						<CarouselItem>
							<ProductCard key={prod._id} product={prod} />
						</CarouselItem>
					</div>
				))}
			</CarouselContent>
			<CarouselPrevious className="max-sm:hidden " />
			<CarouselNext className="max-sm:hidden" />
		</Carousel>
	);
}

export default Slider;
