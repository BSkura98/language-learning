resource "aws_cognito_user_pool" "language_learning_user_pool" {
  name = "${var.project}-user-pool"

  mfa_configuration = "OPTIONAL"
  sms_authentication_message = "Your code is {####}"

  username_attributes = [
    "email"
  ]

  sms_configuration {
    external_id    = "${var.project}-sms-configuration-external-id"
    sns_caller_arn = aws_iam_role.verification_sms_role.arn
  }

  password_policy {
    minimum_length = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers = true
    temporary_password_validity_days = 7
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }

    recovery_mechanism {
      name     = "verified_phone_number"
      priority = 2
    }
  }
}

resource "aws_iam_role" "verification_sms_role" {
  name = "${var.project}-verification-sms-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "cognito-idp.amazonaws.com"
        }
      },
    ]
  })

  inline_policy {
    name = "sms_role_inline_policy"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["sns:Publish"]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
    })
  }
}