locals {
  tags = {
    Project     = var.project
  }
}

resource "aws_s3_bucket" "test-bucket" {
  bucket = "language-learning-test-bucket-980709759274907"
}
