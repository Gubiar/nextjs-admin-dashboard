import { NextApiRequest, NextApiResponse } from "next";

export default async function postRegister(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const body = req.body;
            console.log(body);

        } catch (e) {
            console.log({ e });
            return res.status(500).json({
                message: "Server Error",
                success: false,
            });
        }
    } else {
        return res.status(405).json({
            message: "Invalid request type",
            success: false,
        });
    }
}
