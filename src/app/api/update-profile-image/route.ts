import { uploadProfileToCloudinary } from "@/lib/cloudinary";

export const POST = async (req: Request) => {
  const file = (await req.formData()).get("file");
  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }
  const arrBuffer = await (file as File).arrayBuffer();
  const buffer = Buffer.from(arrBuffer);
  await uploadProfileToCloudinary(buffer, "24240033.png");
  return new Response("OK");
};
