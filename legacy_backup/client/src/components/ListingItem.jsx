import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg overflow-hidden rounded-lg transition-shadow w-full sm:w-[250px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrl[0]}
          alt="listing image"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>

          <div className="flex gap-1 items-center">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full ">
              {listing.address}
            </p>
          </div>
          <div className="text-sm text-gray-600 line-clamp-2 ">
            {listing.description}
          </div>
          <p className="text-slate-500 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-us")
              : listing.regularPrice.toLocaleString("en-us")}
            {listing.type === "rent" && " / Month"}
          </p>

          <div className="text-slate-800 flex gap-4">
            <div className="font-semibold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </div>
            <div className="font-semibold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
