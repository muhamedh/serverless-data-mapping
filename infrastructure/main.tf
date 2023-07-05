# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.63.0" 
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
  required_version = ">= 1.1.0"
}

module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"
  version = "4.18.0"

  function_name = "data-mapping"
  description   = "Data mapping Lambda"
  handler       = "handler.handler"
  runtime       = "node18"

  source_path = "../functions/dataMapping/src"

  tags = {
    Name = "data-mapping"
  }
}