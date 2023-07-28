# Create a new SQS queue
resource "aws_sqs_queue" "data_mapping_sqs" {
  name = var.environment == "dev" ? "dev-entry-data-mapping-sqs" : "prod-entry-data-mapping-sqs"
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.data_maping_dlq.arn
    maxReceiveCount     = 2
  })
}
