# Create a new S3 bucket
resource "aws_s3_bucket" "arrival_bucket" {
  bucket = "arrival-bucket-${data.aws_caller_identity.current.account_id}"
}

# Create a new notification for the SQS queue when a new object is created and set the SQS as target
resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.arrival_bucket.id
  queue {
    queue_arn = aws_sqs_queue.data_validator_sqs.arn
    events    = ["s3:ObjectCreated:*"]
  }
}