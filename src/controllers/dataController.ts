import { Request, Response } from "express";
import { isEmpty } from "lodash";

import { Product } from "../models/product";

const getData = async (req: Request, res: Response) => {
    const { url } = req.query;
    let filter: any;
    try {
        if (url) {
            filter = { pageUrl: { $regex: url } };
        }
        const response = await Product.find(filter);
        if (isEmpty(response)) {
            return res.status(200).json({
                success: true,
                message: "No Scrapped Data Present!",
            });
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to fetch data!" });
    }
};

export { getData };
