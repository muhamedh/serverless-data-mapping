resource "aws_api_gateway_rest_api" "product_api" {
  name        = "Product Information API"
  description = "API exposing mapped product information"
  body        = file("./openapi/openapi.yaml")
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
