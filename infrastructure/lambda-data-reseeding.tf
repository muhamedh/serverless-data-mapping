module "lambda_function" "data-reseeding" {
  source = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name = "data-reseeding"
  description   = "Data reseeding Lambda"
  handler       = "handler.handler"
  runtime       = "nodejs18.x"

  source_path = "../functions/dataReseeding/dist"

  tags = {
    Name = "data-reseeding"
  }
}