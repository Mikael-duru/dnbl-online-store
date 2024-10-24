import CollectionsList from "@/components/CollectionsList";
import { getCollectionDetails } from "@/lib/actions/actions";
import React from "react";

const CollectionDetails = async ({
	params,
}: {
	params: { collectionId: string };
}) => {
	const collectionDetails = await getCollectionDetails(params.collectionId);

	return <CollectionsList collectionDetail={collectionDetails} />;
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
