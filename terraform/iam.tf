data "aws_iam_policy_document" "iam-static-website-policy" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.dev-s3-static-website.arn,
      "${aws_s3_bucket.dev-s3-static-website.arn}/*",
    ]
  }
}
