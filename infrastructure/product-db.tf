resource "aws_dynamodb_table" "product_db" {
  name             = var.environment == "dev" ? "dev-product_db" : "prod-product_db"
  billing_mode     = "PROVISIONED"
  read_capacity    = 5
  write_capacity   = 5
  stream_view_type = "NEW_IMAGE"
  stream_enabled   = true

  # Define primary key
  hash_key  = "ProductID"
  range_key = "SKUNumber"

  attribute {
    name = "ProductID"
    type = "S" # S represents String data type
  }

  attribute {
    name = "SKUNumber"
    type = "S" # S represents String data type
  }

  lifecycle {
    ignore_changes = [read_capacity, write_capacity]
  }
}
resource "aws_appautoscaling_target" "product_table_read_target" {
  max_capacity       = 25
  min_capacity       = 5
  resource_id        = "table/${aws_dynamodb_table.product_db.name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "product_table_read_policy" {
  name               =  var.environment == "dev" ? "dev-DynamoDBReadCapacityUtilization:${aws_appautoscaling_target.product_table_read_target.resource_id}" : "prod-DynamoDBReadCapacityUtilization:${aws_appautoscaling_target.product_table_read_target.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.product_table_read_target.resource_id
  scalable_dimension = aws_appautoscaling_target.product_table_read_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.product_table_read_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }

    target_value = 70.0
  }
}

resource "aws_appautoscaling_target" "product_table_write_target" {
  max_capacity       = 25
  min_capacity       = 5
  resource_id        = "table/${aws_dynamodb_table.product_db.name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "product_table_write_policy" {
  name               = var.environment == "dev" ? "dev-DynamoDBWriteCapacityUtilization:${aws_appautoscaling_target.product_table_write_target.resource_id}" : "prod-DynamoDBWriteCapacityUtilization:${aws_appautoscaling_target.product_table_write_target.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.product_table_write_target.resource_id
  scalable_dimension = aws_appautoscaling_target.product_table_write_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.product_table_write_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }

    target_value = 70.0
  }
}