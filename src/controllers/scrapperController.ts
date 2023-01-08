import { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";
import { isEmpty } from "lodash";

import { Product } from "../models/product";

async function scrapeItemPage(url: string, baseUrl: string): Promise<any> {
    try {
        const response = await axios.get(url);
        const pageUrl = !isEmpty(baseUrl) ? url : baseUrl + url;
        const $ = cheerio.load(response.data);
        const name = $(".product-title").text().trim();
        const netWeight = $(".options-selection__option-name")
            .map((i, el) => $(el).text().trim())
            .get();
        const ingredients = $(".ingredients")
            .map((i, el) => $(el).text().trim())
            .get();
        const skus = $(".sku")
            .map((i, el) => $(el).text().trim())
            .get();
        const nutrition = $(".nutrition").text().trim();
        const sizes = $(`.options-selection__option-value-name`)
            .map((i, el) => $(el).text().trim())
            .get();
        const price = $(".money").text().trim();
        const description = $(".station-tabs-content-inner").text().trim();
        const images = $(".product-gallery--loaded-image")
            .map((i, el) => $(el).attr("src"))
            .get();
        let vegetarian = $(".station-tabs-content-inner").text().trim();
        let isVegetarian = vegetarian.includes("vegetarian");

        return {
            pageUrl,
            name,
            sizes,
            skus,
            netWeight,
            price,
            ingredients,
            nutrition,
            description,
            images,
            vegetarian: isVegetarian,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}

async function scrapeProductPage(
    url: string,
    baseUrl: string,
    count: number
): Promise<any> {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const name = $(".productitem--title").text().trim();
        const itemUrls = $(`.productgrid--item `)
            .map((i, el) => $(el).attr("data-product-quickshop-url"))
            .get();
        for (const itemUrl of itemUrls) {
            const product = await scrapeItemPage(
                `${baseUrl}${itemUrl}`,
                baseUrl
            );

            const existingProduct = await Product.findOne({
                name: product.name,
            });
            if (!existingProduct) {
                const newProduct = new Product(product);
                await newProduct.save();
                count++;
            }
        }
        return count;
    } catch (error: any) {
        throw new Error(error);
    }
}

async function scrapeEndpoint(req: Request, res: Response) {
    const { url, baseUrl } = req.body;

    try {
        console.log("Job Started");
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const productUrls = $(`.navmenu-link`)
            .map((i, el) => $(el).attr("data-href"))
            .get();
        let count = 0;
        let numberOfData;
        for (let i = 0; i < 2; i++) {
            numberOfData = await scrapeProductPage(
                `${baseUrl}${productUrls[i]}`,
                baseUrl,
                count
            );
        }
        console.log("Job Completed!");
        return res.status(200).json({
            success: true,
            message: `Successfully Scrapped ${numberOfData} Records From The Website! `,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Scrapped Data From The Website",
        });
    }
}

export { scrapeEndpoint };
