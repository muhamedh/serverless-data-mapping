module "data_validator" {
  source = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name = "data-validator"
  description   = "Data mapping Lambda"
  handler       = "handler.handler"
  runtime       = "nodejs18.x"
  create_package      = false
  s3_existing_package = {
    bucket = "data-mapping-lambda-code"
    key    = "dataValidatorCode.zip"
  }

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
  number_of_policies = 1

  policies = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
  ]

  tags = {
    Name = "data-validator"
  }
}