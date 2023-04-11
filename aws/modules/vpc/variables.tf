variable "project" {
  type = string
  description = "Project name"
}

variable "db_allowed_ips" {
  description = "IPs allowed to connect to database"
  type        = list(string)
  sensitive   = true
}

variable "default_vpc_id" {
  description = "ID of default VPC"
  type        = string
  sensitive   = true
}

variable "vpc_subnet_1_id" {
  description = "ID of subnet 1 in default VPC"
  type        = string
  sensitive   = true
}
