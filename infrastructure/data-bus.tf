module "eventbridge" {
  source  = "terraform-aws-modules/eventbridge/aws"
  version = "2.3.0"
  bus_name = var.environment == "dev" ? "dev-data-mapping-service-bus" : "prod-data-mapping-service-bus" 
  tags = {
    Name = var.environment == "dev" ? "dev-data-mapping-service-bus" : "prod-data-mapping-service-bus"
  }
}