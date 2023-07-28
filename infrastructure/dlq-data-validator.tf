resource "aws_sqs_queue" "data_validator_dlq" {
  name = var.environment == "dev" ? "dev-data-validator-DLQ" : "prod-data-validator-DLQ"
}
