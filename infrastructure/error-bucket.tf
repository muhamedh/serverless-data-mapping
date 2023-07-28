resource "aws_s3_bucket" "error_bucket" {
  bucket = var.environment == "dev" ? "dev-error-bucket-${data.aws_caller_identity.current.account_id}" : "prod-error-bucket-${data.aws_caller_identity.current.account_id}"
}