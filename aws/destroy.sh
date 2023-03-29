#!/usr/bin/env bash

terraform init -reconfigure -backend-config "./configurations/backend.tf"
terraform destroy -var-file="secret.tfvars"
