resource "aws_s3_bucket" "processed_bucket" {
  bucket = "processed-bucket-${data.aws_caller_identity.current.account_id}"
}