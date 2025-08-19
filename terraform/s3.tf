# LANDING 
resource "aws_s3_bucket" "s3-landing" {
  bucket = "lkc-landing-1"
}

resource "aws_s3_bucket_policy" "s3-landing-policy" {
  bucket = aws_s3_bucket.s3-landing.id
  policy = data.aws_iam_policy_document.iam-s3-landing-policy.json
}

# PROCESSED
resource "aws_s3_bucket" "s3-processed" {
  bucket = "lkc-processed-1"
}

resource "aws_s3_bucket_policy" "s3-processed-policy" {
  bucket = aws_s3_bucket.s3-processed.id
  policy = data.aws_iam_policy_document.iam-s3-processed-policy.json
}
