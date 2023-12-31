module "data_validator" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"
  function_name  =  var.environment == "dev" ? "dev-data-validator" : "prod-data-validator"
  description    = "Data validator Lambda"
  handler        = "handler.handler"
  runtime        = "nodejs18.x"
  create_package = false
  s3_existing_package = {
    bucket = "data-mapping-lambda-code"
    key    = "dataValidatorCode.zip"
  }
  create_current_version_allowed_triggers = false
  cloudwatch_logs_retention_in_days       = 5
  maximum_retry_attempts                  = 0
  timeout = 15
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
    Name = var.environment == "dev" ? "dev-data-validator" : "prod-data-validator"
  }

  environment_variables = {
    entry_data_mapping_sqs = aws_sqs_queue.data_mapping_sqs.url
    arrival_bucket         = aws_s3_bucket.arrival_bucket.id
    archive_bucket         = aws_s3_bucket.archive_bucket.id
    error_bucket           = aws_s3_bucket.error_bucket.id
    event_bus_name         = module.eventbridge.eventbridge_bus_name
  }
}
#Created Policy for IAM Role
resource "aws_iam_policy" "data_validator_policy" {
  name        =  var.environment == "dev" ? "dev-data-validator-policy" : "prod-data-validator-policy"
  description = "A policy which encompases all needed permissions."


  policy = jsonencode(
    {
      "Version" = "2012-10-17"
      "Statement" = [
        {
          "Effect"   = "Allow"
          "Action"   = ["s3:GetObject","s3:ListBucket"]
          "Resource" = "${aws_s3_bucket.arrival_bucket.arn}/*"
        },
        {
          "Effect"   = "Allow"
          "Action"   = ["s3:PutObject", "s3:ListBucket"]
          "Resource" = "${aws_s3_bucket.archive_bucket.arn}/*"
        },
        {
          "Effect"   = "Allow"
          "Action"   = ["s3:PutObject", "s3:ListBucket"]
          "Resource" = "${aws_s3_bucket.error_bucket.arn}/*"
        },
        {
          "Effect"   = "Allow"
          "Action"   = "s3:DeleteObject"
          "Resource" = "${aws_s3_bucket.arrival_bucket.arn}/*"
        },
        {
          "Effect"   = "Allow"
          "Action"   = "sqs:SendMessage*"
          "Resource" = "${aws_sqs_queue.data_mapping_sqs.arn}"
        },
        {
          "Effect"   = "Allow"
          "Action"   = "sqs:SendMessage*"
          "Resource" = "${aws_sqs_queue.data_validator_dlq.arn}"
        },
        {
          "Effect"   = "Allow"
          "Action"   = "events:PutEvents"
          "Resource" = "${module.eventbridge.eventbridge_bus_arn}"
        }
      ]
  })
}