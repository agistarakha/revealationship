import S3 from "aws-sdk/clients/s3";

export default async function getImgUrl(key: string) {
  const client_s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
    signatureVersion: "v4",
  });

  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 600,
    };

    const url: string = await client_s3.getSignedUrlPromise(
      "getObject",
      fileParams
    );
    return url;
  } catch (error) {
    return null;
  }
}
