variable "project" {
  type = string
  description = "Project name"
}

variable "db_username" {
  description = "Database administrator username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
}

variable "db_allowed_ips" {
  description = "IPs allowed to connect to database"
  type        = list(string)
  sensitive   = true
}
