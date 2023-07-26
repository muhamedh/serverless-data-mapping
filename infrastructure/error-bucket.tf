resource "aws_s3_bucket" "error_bucket" {
  bucket = "error-bucket-${data.aws_caller_identity.current.account_id}"
}