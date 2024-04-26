import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    regularPrice: {
        type: Number,
        required: true,
    },

    discountPrice: {
        type: Number,
        require: true,
    },

    bathrooms: {
        type: Number,
        required: true,
    },

    bedrooms: {
        type: Number,
        required: true,
    },

    furnished: {
        type: Boolean,
        required: true,
    },

    parking: {
        type: Boolean,
        require: true,
    },

    type: {
        type: String,
        required: true,
    },

    offer: {
        type: Boolean,
        require: true,
    },

    imageUrl: {
        type: Array,
        required: true,
    },

    useRef: {
        type: String,
        required: true,
    },
}, { timestamps: true })


export default mongoose.model("listing", ListingSchema);

// export default Listing;