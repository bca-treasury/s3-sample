require('dotenv').config();

const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint: process.env.AWS_ENDPOINT || 's3.ap-southeast-1.amazonaws.com',
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
});

const file = fs.readFileSync('test.txt');

const main = async () => {
  if (process.argv[2]) {
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'test/test.txt',
    }).promise()

    return;
  }

  const uploadedFile = await s3.putObject({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: 'test/test.txt',
    Body: file,
  }).promise()

  console.log(uploadedFile)

  const getFile = await s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: 'test/test.txt',
  })

  console.log(getFile)
}

main();
