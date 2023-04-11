variable "project" {
  type        = string
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

variable "database_security_group_id" {
  description = "Security group id for database"
  type        = string
}
