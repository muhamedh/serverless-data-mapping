resource "aws_sqs_queue" "stream_processor_dlq" {
  name = var.environment == "dev" ? "dev-stream-processor-DLQ" : "prod-stream-processor-DLQ"
}
