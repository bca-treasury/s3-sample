require('dotenv').config();

const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint: process.env.AWS_ENDPOINT || 's3.ap-southeast-1.amazonaws.com',
});

const file = fs.readFileSync('test.txt');

const main = async () => {
  const uploadedImage = await s3.upload({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: 'test/test.txt',
    Body: file,
  }).promise()


  console.log(uploadedImage.Location)
}

main();
