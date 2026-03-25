export async function getCloudinaryUrl(publicId: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${publicId}`,
    {
      headers: { Authorization: `Basic ${credentials}` },
      next: { revalidate: false, tags: [publicId] },
    },
  );

  if (!res.ok) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
  }

  const data = await res.json();
  return `https://res.cloudinary.com/${cloudName}/image/upload/v${data.version}/${publicId}`;
}
