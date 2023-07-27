# Create a new SQS queue
resource "aws_sqs_queue" "data_validator_sqs" {
  name = "entry-data-validator-sqs"
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.data_validator_dlq.arn
    maxReceiveCount = 2
  })
}

# Allow the S3 bucket to write to the SQS queue
resource "aws_sqs_queue_policy" "s3_to_sqs_write_permission" {
  queue_url = aws_sqs_queue.data_validator_sqs.id
  policy    = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sqs:SendMessage",
      "Resource": "${aws_sqs_queue.data_validator_sqs.arn}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_s3_bucket.arrival_bucket.arn}"
        }
      }
    }
  ]
}
POLICY
}