import { uploadProfileToCloudinary } from "@/lib/cloudinary";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request) => {
  const id = uuidv4();
  const file = (await req.formData()).get("file");
  if (!file || !(file instanceof File)) {
    return new Response("No file uploaded", { status: 400 });
  }
  const arrBuffer = await (file as File).arrayBuffer();
  const buffer = Buffer.from(arrBuffer);
  const extension = file.name.split(".").pop();
  const secureUrl = await uploadProfileToCloudinary(
    buffer,
    `${id}.${extension}`
  );
  return new Response(secureUrl ?? "");
};
