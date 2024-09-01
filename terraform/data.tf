data "aws_caller_identity" "current" {}

data "aws_ssm_parameter" "github_pat" {
    name = var.github_personal_access_token_secret_path
    with_decryption = true
}