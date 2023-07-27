resource "aws_schemas_registry" "data_mapping_schemas_registry" {
  name = "data_mapping_schemas_registry"
}

resource "aws_schemas_schema" "wrong_format_stateless_event_schema" {
  name          = "wrong_format_stateless_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for wrong_format_stateless_event_schema"

  content = jsonencode(file("./apispec/events/wrong-format-stateless-event.json"))
}

resource "aws_schemas_schema" "delete_stateless_event_schema" {
  name          = "delete_stateless_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for delete_stateless_event_schema"

  content = jsonencode(file("./apispec/events/delete-stateless-event.json"))
}

resource "aws_schemas_schema" "insert_statefull_event_schema" {
  name          = "insert_statefull_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for insert_statefull_event_schema"

  content = jsonencode(file("./apispec/events/insert-statefull-event.json"))
}

resource "aws_schemas_schema" "update_statefull_event_schema" {
  name          = "update_statefull_event_schema"
  registry_name = aws_schemas_registry.data_mapping_schemas_registry.name
  type          = "OpenApi3"
  description   = "The schema definition for update_statefull_event_schema"

  content = jsonencode(file("./apispec/events/update-stateless-event.json"))
}