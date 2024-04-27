import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="p-3 border rounded-lg"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="3"
            required
          />

          <textarea
            type="text"
            className="p-3 border rounded-lg"
            id="description"
            placeholder="Description"
            required
          />

          <input
            type="text"
            className="p-3 border rounded-lg"
            id="address"
            placeholder="Address"
            minLength="8"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bedrooms"
                required
                className="p-3 border border-grey-300 rounded-lg"
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bathrooms"
                required
                className="p-3 border border-grey-300 rounded-lg"
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                id="regularPrice"
                required
                className="p-3 border border-grey-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                id="discountPrice"
                required
                className="p-3 border border-grey-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-grey-600 ml-2">
              The first image will be the cover (max-6)
            </span>
          </p>

          <div className="flex">
            <input
              type="file"
              className="p-3 border border-grey-300 rounded w-full"
              id="images"
              accept="image/*"
              multiple
            />

            <button className="p-3 border rounded border-green-700 uppercase text-green-700 hover:shadow-lg disabled:opacity-80 ml-3">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
