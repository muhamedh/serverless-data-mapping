module "data_validator" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name  = "data-validator"
  description    = "Data mapping Lambda"
  handler        = "handler.handler"
  runtime        = "nodejs18.x"
  create_package = false
  s3_existing_package = {
    bucket = "data-mapping-lambda-code"
    key    = "dataValidatorCode.zip"
  }
  create_current_version_allowed_triggers = false
  allowed_triggers = {
    sqs = {
      service    = "sqs"
      source_arn = aws_sqs_queue.data_validator_sqs.arn
    }
  }

  event_source_mapping = {
    sqs = {
      event_source_arn        = aws_sqs_queue.data_validator_sqs.arn
      function_response_types = ["ReportBatchItemFailures"]
    }
  }

  attach_policies    = true
  number_of_policies = 2

  policies = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
    "${aws_iam_policy.data_validator_policy.arn}"
  ]

  tags = {
    Name = "data-validator"
  }
}
#Created Policy for IAM Role
resource "aws_iam_policy" "data_validator_policy" {
  name        = "data-validator-read-from-s3-role"
  description = "A policy which allows the lambda to read from arrival S3 bucket."


  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : [
            "s3:GetObject"
          ],
          "Resource" : "${aws_s3_bucket.arrival_bucket.arn}/*"
        }
      ]
  })
}
