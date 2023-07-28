resource "aws_s3_bucket" "processed_bucket" {
  bucket = var.environment == "dev" ? "dev-processed-bucket-${data.aws_caller_identity.current.account_id}" : "prod-processed-bucket-${data.aws_caller_identity.current.account_id}"
}