resource "aws_sqs_queue" "stream_processor_dlq" {
  name = "stream-processor-DLQ"
}
