# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.6.2" 
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
  required_version = ">= 1.1.0"
}

provider "aws" {
  region = "us-east-1"
}

module "lambda_function" "data-mapping" {
  source = "terraform-aws-modules/lambda/aws"
  version = "5.2.0"

  function_name = "data-mapping"
  description   = "Data mapping Lambda"
  handler       = "handler.handler"
  runtime       = "nodejs18.x"

  source_path = "../functions/dataMapping/dist"

  tags = {
    Name = "data-mapping"
  }
}