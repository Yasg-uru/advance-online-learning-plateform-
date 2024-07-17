import {z} from "zod";
export const ResourceSchema=z.object({
    resourceType:z.enum(["PDF","Link","Image"]),
    url:z.string().url("Invalid url format")
})