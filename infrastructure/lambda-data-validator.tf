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
  cloudwatch_logs_retention_in_days = 5
  maximum_retry_attempts = 0
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
  number_of_policies = 4

  policies = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
    "${aws_iam_policy.data_validator_policy.arn}",
    "${aws_iam_policy.put_archive_bucket_policy.arn}",
    "${aws_iam_policy.send_messages_to_data_mapping_sqs.arn}"
  ]

  tags = {
    Name = "data-validator"
  }

  environment_variables = {
    entry_data_mapping_sqs = aws_sqs_queue.data_mapping_sqs.url
    archive_bucket = aws_s3_bucket.archive_bucket.id
    event_bus_name = module.eventbridge.eventbridge_bus_name
  }
}
#Created Policy for IAM Role
resource "aws_iam_policy" "data_validator_policy" {
  name        = "data-validator-read-from-s3-policy"
  description = "A policy which allows the lambda to read from arrival S3 bucket."


  policy = jsonencode(
    {
      "Version" = "2012-10-17"
      "Statement" = [
        {
          "Effect" = "Allow"
          "Action" = "s3:GetObject"
          "Resource" = "${aws_s3_bucket.arrival_bucket.arn}/*"
        }
      ]
  })
}

resource "aws_iam_policy" "put_archive_bucket_policy" {
  name        = "data-validator-put-to-s3-policy"
  description = "A policy which allows the lambda to put items to archive S3 bucket."


  policy = jsonencode(
    {
      "Version" = "2012-10-17"
      "Statement" = [
        {
          "Effect" = "Allow"
          "Action" = "s3:PutObject"
          "Resource" = "${aws_s3_bucket.archive_bucket.arn}/*"
        }
      ]
  })
}

resource "aws_iam_policy" "send_messages_to_data_mapping_sqs" {
  name        = "data-validator-send-to-Sqs-policy"
  description = "A policy which allows the lambda to send messages to data mapping entry sqs"


  policy = jsonencode(
    {
      "Version" = "2012-10-17"
      "Statement" = [
        {
          "Effect" = "Allow"
          "Action" = "sqs:SendMessage*"
          "Resource" = "${aws_sqs_queue.data_mapping_sqs.arn}"
        }
      ]
  })
}
