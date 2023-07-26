module "stream_processor" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name  = "stream-processor"
  description    = "Stream processor Lambda"
  handler        = "handler.handler"
  runtime        = "nodejs18.x"
  create_package = false
  s3_existing_package = {
    bucket = "data-mapping-lambda-code"
    key    = "streamProcessorCode.zip"
  }
  create_current_version_allowed_triggers = false
  cloudwatch_logs_retention_in_days = 5
  maximum_retry_attempts = 0

  allowed_triggers = {
    dynamodb = {
      principal  = "dynamodb.amazonaws.com"
      source_arn = aws_dynamodb_table.product_db.stream_arn
    }
  }

  event_source_mapping = {
    dynamodb = {
      event_source_arn  = aws_dynamodb_table.product_db.stream_arn
      starting_position = "LATEST"
      filter_criteria = {
        pattern = jsonencode({
          eventName : ["INSERT"]
        })
      }
    }
  }

  attach_policies    = true
  number_of_policies = 2

  policies = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaDynamoDBExecutionRole",
    "${aws_iam_policy.stream_processor_policy.arn}"
  ]

}
#Created Policy for IAM Role
resource "aws_iam_policy" "stream_processor_policy" {
  name        = "stream-processor-policy"
  description = "A policy which encompases all needed permissions."


  policy = jsonencode(
    {
      "Version" = "2012-10-17"
      "Statement" = [
        {
          "Effect" = "Allow"
          "Action" = "events:PutEvents"
          "Resource" = "${module.eventbridge.eventbridge_bus_arn}"
        }
      ]
  })
}