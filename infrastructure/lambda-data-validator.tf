module "data_validator" {
  source = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name = "data-validator"
  description   = "Data mapping Lambda"
  handler       = "handler.handler"
  runtime       = "nodejs18.x"
  create_package      = false
  s3_existing_package = {
    bucket = "data-mapping-lambda-code"
    key    = "dataValidatorCode.zip"
  }

  tags = {
    Name = "data-validator"
  }
}