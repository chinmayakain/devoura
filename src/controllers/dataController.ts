import { NextFunction, Request, Response } from "express";
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

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: "Server is healthy!",
        timestamp: Date.now(),
    };
    try {
        return res.json(healthcheck);
    } catch (error: any) {
        healthcheck.message = error;
        return res.status(503).json({
            message: `Server has crashed! ${healthcheck.message}`,
        });
    }
};

export { getData, healthCheck };
