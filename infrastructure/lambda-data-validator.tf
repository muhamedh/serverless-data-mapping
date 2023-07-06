module "lambda_function" "data-validator" {
  source = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name = "data-validator"
  description   = "Data mapping Lambda"
  handler       = "handler.handler"
  runtime       = "nodejs18.x"

  source_path = "../functions/dataValidator/dist"

  tags = {
    Name = "data-validator"
  }
}