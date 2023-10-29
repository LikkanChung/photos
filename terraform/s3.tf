
resource "aws_s3_bucket" "dev-s3-static-website" {
  bucket = "dev-s3-static-website"
}

resource "aws_s3_bucket_public_access_block" "dev-s3-static-website-public-access" {
  bucket = aws_s3_bucket.dev-s3-static-website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "dev-s3-static-website-ownership" {
  bucket = aws_s3_bucket.dev-s3-static-website.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "dev-s3-static-website-acl" {
  depends_on = [
    aws_s3_bucket_public_access_block.dev-s3-static-website-public-access,
    aws_s3_bucket_ownership_controls.dev-s3-static-website-ownership,
  ]

  bucket = aws_s3_bucket.dev-s3-static-website.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "dev-s3-static-website-config" {
  bucket = aws_s3_bucket.dev-s3-static-website.id
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "dev-s3-static-website-policy" {
  bucket = aws_s3_bucket.dev-s3-static-website.id
  policy = data.aws_iam_policy_document.iam-static-website-policy.json

}

module "dev-s3-static-website-files" {
  source = "hashicorp/dir/template"

  base_dir = "${path.root}/frontend"
}

resource "aws_s3_object" "dev-s3-static-website-file-upload" {
  bucket = aws_s3_bucket.dev-s3-static-website.id

  for_each = module.dev-s3-static-website-files.files

  key          = each.key
  content_type = each.value.content_type

  source  = each.value.source_path
  content = each.value.content
  etag    = each.value.digests.md5

}