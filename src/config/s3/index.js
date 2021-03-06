const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  bucketRegion,
  accessKeyId,
  secretAccessKey,
});

// fn to download file from s3 bucket
const getImage = (imageKey) => {
  const downloadParams = {
    Key: `${imageKey}`,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};

module.exports = {
  s3,
  getImage,
};
