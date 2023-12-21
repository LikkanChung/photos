# S3 LANDING BUCKET 1
data "aws_iam_policy_document" "iam-s3-landing-policy" {
  statement {
    principals {
      type        = ""
      identifiers = [""]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.s3-landing.arn,
      "${aws_s3_bucket.s3-landing.arn}/*",
    ]
  }
}

# S3 PROCESSED BUCKET 1
data "aws_iam_policy_document" "iam-s3-processed-policy" {
  statement {
    principals {
      type        = ""
      identifiers = [""]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.s3-processed.arn,
      "${aws_s3_bucket.s3-processed.arn}/*",
    ]
  }
}