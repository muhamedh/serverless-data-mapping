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
resource "aws_s3_bucket_policy" "allow_access_from_data_validator_lambda" {
  bucket = aws_s3_bucket.arrival_bucket.id
  policy = data.aws_iam_policy_document.lambda_data_validator_policy_statement.json
}
data "aws_iam_policy_document" "lambda_data_validator_policy_statement" {
  version = "2012-10-17"
  statement {
    actions = [
      "s3:GetObject"
    ]
    resources = [
      module.data_validator.lambda_function_arn
    ]
  }
}