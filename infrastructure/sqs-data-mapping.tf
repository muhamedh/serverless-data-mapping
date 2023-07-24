# Create a new SQS queue
resource "aws_sqs_queue" "data_mapping_sqs" {
  name = "entry-data-mapping-sqs"
}
