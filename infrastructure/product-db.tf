resource "aws_dynamodb_table" "product_db" {
  name           = "product_db"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10

  # Define primary key
  hash_key       = "ProductID"
  range_key      = "SKUNumber"

  attribute {
    name = "ProductID"
    type = "S"  # S represents String data type
  }

  attribute {
    name = "SKUNumber"
    type = "S"  # S represents String data type
  }
}