terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }

  backend "s3" {
    region = "us-east-1"
    key    = "terraform.tfstate"
  }
}

provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["~/.aws/credentials"]

  default_tags {
    tags = {
      Project     = var.project
    }
  }
}

module "cognito" {
  source = "./modules/cognito"

  project = var.project
}

module "cloudfront" {
  source = "./modules/cloudfront"

  project = var.project
}

module "rds" {
  source = "./modules/rds"

  project = var.project
  db_username = var.db_username
  db_password = var.db_password
  db_allowed_ip = var.db_allowed_ip
}
