resource "aws_schemas_registry" "data_mapping_schemas_registry" {
  name = var.environment == "dev" ? "dev_data_mapping_schemas_registry" : "prod_data_mapping_schemas_registry"
}

resource "aws_schemas_schema" "wrong_format_stateless_event_schema" {
  name          = var.environment == "dev" ? "dev_wrong_format_stateless_event_schema" : "prod_wrong_format_stateless_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for wrong_format_stateless_event_schema"

  content = (file("./apispec/events/wrong-format-stateless-event.json"))
}

resource "aws_schemas_schema" "delete_stateless_event_schema" {
  name          = var.environment == "dev" ? "dev_delete_stateless_event_schema" : "prod_delete_stateless_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for delete_stateless_event_schema"

  content = (file("./apispec/events/delete-stateless-event.json"))
}

resource "aws_schemas_schema" "insert_statefull_event_schema" {
  name          = var.environment == "dev" ? "dev_insert_statefull_event_schema" : "prod_insert_statefull_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for insert_statefull_event_schema"

  content = (file("./apispec/events/insert-statefull-event.json"))
}

resource "aws_schemas_schema" "update_statefull_event_schema" {
  name          = var.environment == "dev" ? "dev_update_statefull_event_schema" : "prod-update_statefull_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for update_statefull_event_schema"

  content = (file("./apispec/events/update-stateless-event.json"))
}