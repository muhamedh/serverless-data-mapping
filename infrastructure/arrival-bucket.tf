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
resource "aws_s3_bucket_policy" "allow_access_from_lambda_functions" {
  bucket = aws_s3_bucket.arrival_bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_lambda_functions.json
}

data "aws_iam_policy_document" "allow_access_from_lambda_functions" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [module.data_validator.lambda_function_arn]
    }

    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = [
      aws_s3_bucket.arrival_bucket.arn,
      "${aws_s3_bucket.arrival_bucket.arn}/*",
    ]
  }
}