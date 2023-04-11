terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
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
      Project = var.project
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

  project                    = var.project
  db_username                = var.db_username
  db_password                = var.db_password
  database_security_group_id = module.vpc.database_security_group_id
}

module "vpc" {
  source = "./modules/vpc"

  project         = var.project
  db_allowed_ips  = var.db_allowed_ips
  default_vpc_id  = var.default_vpc_id
  vpc_subnet_1_id = var.vpc_subnet_1_id
}
