module "data_mapping" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name  = "data-mapping"
  description    = "Data mapping Lambda"
  handler        = "handler.handler"
  runtime        = "nodejs18.x"
  create_package = false
  s3_existing_package = {
    bucket = "data-mapping-lambda-code"
    key    = "dataMappingCode.zip"
  }
  create_current_version_allowed_triggers = false
  cloudwatch_logs_retention_in_days = 5
  maximum_retry_attempts = 0
  allowed_triggers = {
    sqs = {
      service    = "sqs"
      source_arn = aws_sqs_queue.data_mapping_sqs.arn
    }
  }

  event_source_mapping = {
    sqs = {
      event_source_arn        = aws_sqs_queue.data_mapping_sqs.arn
      function_response_types = ["ReportBatchItemFailures"]
    }
  }

  attach_policies    = true
  number_of_policies = 2

  policies = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
    "${aws_iam_policy.data_mapping_policy.arn}"
  ]

  tags = {
    Name = "data-mapping"
  }

  environment_variables = {
    archive_bucket = aws_s3_bucket.archive_bucket.id,
    error_bucket = aws_s3_bucket.error_bucket.id,
    processed_bucket = aws_s3_bucket.processed_bucket.id,
    product_database = aws_dynamodb_table.product_db.name
  }
}
#Created Policy for IAM Role
resource "aws_iam_policy" "data_mapping_policy" {
  name        = "data-mapping-policy"
  description = "A policy which encompases all needed permissions"


  policy = jsonencode(
    {
      "Version" = "2012-10-17"
      "Statement" = [
        {
          "Effect" = "Allow"
          "Action" = "s3:GetObject"
          "Resource" = "${aws_s3_bucket.archive_bucket.arn}/*"
        },
        {
          "Effect" = "Allow"
          "Action" = ["dynamodb:PutItem","dynamodb:Query","dynamodb:Scan"]
          "Resource" = "${aws_dynamodb_table.product_db.arn}"
        }
      ]
  })
}