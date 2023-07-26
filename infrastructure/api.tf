resource "aws_api_gateway_rest_api" "product_api" {
  name        = "Product Information API"
  description = "API exposing mapped product information"
  body        = data.template_file.aws_api_product_openapi_document
}

resource "aws_api_gateway_deployment" "product_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.product_api.id
  stage_name  = "dev"
}

resource "aws_api_gateway_stage" "product_api_stage" {
  stage_name    = "dev"
  rest_api_id   = aws_api_gateway_rest_api.product_api.id
  deployment_id = aws_api_gateway_deployment.product_api_deployment.id
}

data "template_file" "aws_api_product_openapi_document" {
  template = file("./apispec/openapi.yaml")

  vars = {
    API_GATEWAY_ROLE_ARN = aws_iam_role.product_api_gw_role.arn
    READ_TIMEOUT                 = "1000"
    DYNAMO_PRODUCT_TABLE         = aws_dynamodb_table.product_db.id
  }
}

resource "aws_iam_role" "product_api_gw_role" {
  name               = "product-API-gateway-role"
  assume_role_policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Action: "sts:AssumeRole",
        Effect: "Allow",
        Principal: {
          Service: "apigateway.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "product_api_gw_policy" {
  name        = "product-API-gateway-policy"
  description = "Policy giving access to dynamoDB read"

  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Action: ["dynamodb:GetItem","dynamodb:Query","dynamodb:Scan"],
        Effect: "Allow",
        Resource: "${aws_dynamodb_table.product_db.arn}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "api_gw_policy_attachment" {
  policy_arn = aws_iam_policy.product_api_gw_policy.arn
  role       = aws_iam_role.product_api_gw_role.name
}