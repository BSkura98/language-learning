data "aws_vpc" "default_vpc" {
  id = var.default_vpc_id
}

resource "aws_security_group" "database" {
  name = "${var.project}-security-group-database"
}

resource "aws_security_group_rule" "access_from_lambda_to_database" {
  type                     = "ingress"
  from_port                = 3306
  to_port                  = 3306
  protocol                 = "tcp"
  security_group_id        = aws_security_group.database.id
  source_security_group_id = aws_security_group.lambda.id
}

resource "aws_security_group_rule" "access_from_ips_to_database" {
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  security_group_id = aws_security_group.database.id
  cidr_blocks       = [for ip in var.db_allowed_ips : "${ip}/32"]
}

resource "aws_security_group_rule" "access_from_database" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.database.id
}

resource "aws_security_group" "lambda" {
  name = "${var.project}-sg-lambda"
}

resource "aws_security_group_rule" "access_from_lambda" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lambda.id
}

resource "aws_security_group" "translate_vpc_endpoint" {
  name = "${var.project}-sg-translate_vpc_endpoint"
}

resource "aws_security_group_rule" "access_to_translate_endpoint" {
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.translate_vpc_endpoint.id
}

resource "aws_security_group_rule" "access_from_lambdas_to_translate_vpc_endpoint" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.translate_vpc_endpoint.id
}

# resource "aws_vpc_endpoint" "translate" {
#   vpc_id              = data.aws_vpc.default_vpc.id
#   service_name        = "com.amazonaws.us-east-1.translate"
#   vpc_endpoint_type   = "Interface"
#   private_dns_enabled = true

#   security_group_ids = [
#     aws_security_group.translate_vpc_endpoint.id,
#   ]

#   subnet_ids = [var.vpc_subnet_1_id]
# }
