module "data_mapping" {
  source = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name = "data-mapping"
  description   = "Data mapping Lambda"
  handler       = "handler.handler"
  runtime       = "nodejs18.x"

  source_path = "../functions/dataMapping/dist"

  tags = {
    Name = "data-mapping"
  }
}