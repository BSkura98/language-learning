#!/usr/bin/env bash

terraform init -reconfigure -backend-config "./configuration/backend.tf"
terraform apply
