resource "aws_sqs_queue" "data_validator_dlq" {
  name = "data-validator-DLQ"
}
