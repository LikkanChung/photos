variable "github_personal_access_token_secret_path" {
    description = "Path to Github Personal Access token in AWS Parameter Store"
    type = string
    nullable = false
    default = "/github_personal_access_token_secret_path"
}

variable "cognito_user_invite_email_message" {
  type    = string
  default = <<-EOF
    Your username is "{username}" and temporary password is "{####}". Please reach out to an admin if you have issues signing in.
  EOF
}

variable "cognito_user_invite_email_subject" {
  type    = string
  default = <<-EOF
    AWS Conginto: New user
  EOF
}

variable "cognito_user_invite_sms_message" {
  type    = string
  default = <<-EOF
    Your username is "{username}" and temporary password is "{####}".
  EOF
}

variable "cognito_user_password_policy_min_length" {
  type        = number
  default     = 8
  description = "The minimum nmber of characters for Cognito user passwords"
}

variable "cognito_user_password_policy_require_lowercase" {
  type        = bool
  default     = true
  description = "Whether or not the Cognito user password must have at least 1 lowercase character"
}

variable "cognito_user_password_policy_require_numbers" {
  type        = bool
  default     = true
  description = "Whether or not the Cognito user password must have at least 1 number"
}

variable "cognito_user_password_policy_require_uppercase" {
  type        = bool
  default     = true
  description = "Whether or not the Cognito user password must have at least 1 uppercase character"
}

variable "cognito_user_password_policy_require_symbols" {
  type        = bool
  default     = true
  description = "Whether or not the Cognito user password must have at least 1 special character"
}

variable "cognito_user_password_policy_temp_password_validity_days" {
  type        = number
  default     = 7
  description = "The number of days a temp password is valid. If user does not sign-in during this time, will need to be reset by an admin"
}
