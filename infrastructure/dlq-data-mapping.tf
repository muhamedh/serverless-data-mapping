resource "aws_sqs_queue" "data_maping_dlq" {
  name = var.environment == "dev" ? "dev-data-mapping-DLQ" : "prod-data-mapping-DLQ"
}
