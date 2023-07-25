module "eventbridge" {
  source = "terraform-aws-modules/eventbridge/aws"
  version = "2.3.0"

  bus_name = "data-mapping-service-bus"
  create_archives = true
  archives = {
    "data-mapping-service-bus-archive" = {
      description    = "Data Mapping Service Events Archive",
      retention_days = 1
      event_pattern  = <<PATTERN
      {
        "source": ["data-validator"]
      }
      PATTERN
    }
  }
  tags = {
    Name = "data-mapping-service-bus"
  }
}