module "eventbridge" {
  source = "terraform-aws-modules/eventbridge/aws"
  version = "2.3.0"

  bus_name = "data-mapping-service-bus"
  tags = {
    Name = "data-mapping-service-bus"
  }
}