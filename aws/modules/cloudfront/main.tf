locals {
  s3_origin_id = "${var.project}-s3-origin"
  logging_bucket_name = "${var.project}-cloudfront-logs"
}

resource "aws_s3_bucket" "s3_bucket_web_deployment" {
  bucket = "${var.project}-web-deployment"
}

resource "aws_s3_bucket_acl" "s3_bucket_web_deployment_acl" {
  bucket = aws_s3_bucket.s3_bucket_web_deployment.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "s3_bucket_web_deployment_policy" {
  bucket = aws_s3_bucket.s3_bucket_web_deployment.id
  policy = jsonencode({
    Version = "2012-10-17"
    Id = "PolicyForCloudFrontPrivateContent"
    Statement = [
      {
        Sid = "Allow-Public-Access-To-Bucket",
        Effect = "Allow",
        Principal = {
          AWS: [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
        },
        Action = "s3:GetObject",
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.s3_bucket_web_deployment.id}/*"
        ]
      }
    ]
  })
}

resource "aws_s3_bucket" "logging_bucket" {
  bucket = local.logging_bucket_name
}

resource "aws_s3_bucket_acl" "logging_bucket_acl" {
  bucket = aws_s3_bucket.logging_bucket.id
  acl    = "private"
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.s3_bucket_web_deployment.bucket_regional_domain_name
    origin_id                = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logging_bucket.bucket_domain_name
    prefix          = "${var.project}-cloudfront-log"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["GB", "PL"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  custom_error_response {
    error_code = 403
    response_page_path = "/index.html"
    error_caching_min_ttl = 10
    response_code = 200
  }

  custom_error_response {
    error_code = 404
    response_page_path = "/index.html"
    error_caching_min_ttl = 10
    response_code = 200
  }
}

resource "aws_cloudfront_origin_access_control" "access_control" {
  name                              = "${var.project} cloudfront origin access control"
  description                       = ""
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
