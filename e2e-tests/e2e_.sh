echo "Uploading file to S3 bucket"
aws s3 cp ./10000_1.xml s3://dev-arrival-bucket-426643868142/product/

echo "Give service time to process file"
sleep 2

echo "Sending request to API gateway"
response=curl -X GET "https://rw6e59xnkd.execute-api.us-east-1.amazonaws.com/dev/10000/OM_kp]e"

echo $response
