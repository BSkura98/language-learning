resource "aws_security_group" "ll_db_security_group" {
  name_prefix = "${var.project}-"
  
  ingress {
    from_port = 3306
    to_port = 3306
    protocol = "tcp"
    cidr_blocks = [for ip in var.db_allowed_ips: "${ip}/32"]
  }
}

resource "aws_db_instance" "ll_db_instance" {
  allocated_storage    = 10
  db_name              = format("%s%s", replace(var.project, "-", ""), "database")
  identifier           = format("%s%s", replace(var.project, "-", ""), "database")
  engine               = "mysql"
  engine_version       = "8.0.32"
  instance_class       = "db.t3.micro"
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.ll_db_security_group.id]
  publicly_accessible  = true
}
