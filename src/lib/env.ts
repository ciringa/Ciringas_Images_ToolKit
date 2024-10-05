import "dotenv/config"
import { z } from "zod"

export const {HOST,PORT} = z.object({
    HOST:z.string(),
    PORT:z.string()
}).parse(process.env)
