# Create a new S3 bucket
resource "aws_s3_bucket" "archive_bucket" {
  bucket = var.environment == "dev" ? "dev-archive-bucket-${data.aws_caller_identity.current.account_id}" : "prod-archive-bucket-${data.aws_caller_identity.current.account_id}"
}