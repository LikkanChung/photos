resource "aws_cognito_user_pool" "cognito-admin-user-pool-1" {
  name = "lkc-cognito-admin-user-pool-1"

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
  
  alias_attributes         = ["email"] 
  auto_verified_attributes = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = true
    invite_message_template {
      email_message = var.cognito_user_invite_email_message
      email_subject = var.cognito_user_invite_email_subject
      sms_message   = var.cognito_user_invite_sms_message
    }
  }

  password_policy {
    minimum_length                   = var.cognito_user_password_policy_min_length
    require_lowercase                = var.cognito_user_password_policy_require_lowercase
    require_numbers                  = var.cognito_user_password_policy_require_numbers
    require_uppercase                = var.cognito_user_password_policy_require_uppercase
    require_symbols                  = var.cognito_user_password_policy_require_symbols
    temporary_password_validity_days = var.cognito_user_password_policy_temp_password_validity_days
  }

  mfa_configuration = "ON"
  software_token_mfa_configuration {
    enabled = true
  }
}

resource "aws_cognito_user_pool_domain" "cognito-admin-user-pool-domain" {
    domain = "lkc-ultimate-auth"
    user_pool_id = aws_cognito_user_pool.cognito-admin-user-pool-1.id
}

# resource "aws_cognito_identity_pool" "cognito-admin-identity-pool-1" {
#     identity_pool_name = "lkc-cognito-admin-user-identity-1"
#     allow_unauthenticated_identities = false
#     allow_classic_flow = false
# }