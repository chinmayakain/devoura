import mongoose, { Schema } from "mongoose";

interface IProduct {
    pageUrl: String;
    name: string;
    sizes: string[];
    skus: string[];
    netWeight: string[];
    price: string;
    ingredients: string[];
    nutrition: string;
    description: string;
    images: string[];
    vegetarian: boolean;
}

const ProductSchema = new Schema<IProduct>({
    pageUrl: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    sizes: {
        type: [String],
        trim: true,
    },
    skus: {
        type: [String],
        trim: true,
    },
    netWeight: {
        type: [String],
        trim: true,
    },
    price: {
        type: String,
        trim: true,
    },
    ingredients: {
        type: [String],
        trim: true,
    },
    nutrition: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    images: {
        type: [String],
        trim: true,
    },
    vegetarian: Boolean,
});

const Product = mongoose.model("Product", ProductSchema);

export { Product };
