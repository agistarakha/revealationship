import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import S3 from "aws-sdk/clients/s3";

export async function POST(req: NextRequest) {
  const client_s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: "v4",
  });

  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "sus.jpg",
      Expires: 600,
      ContentType: "jpg",
    };

    const url = await client_s3.getSignedUrlPromise("putObject", fileParams);

    return NextResponse.json({ success: true, url: url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
