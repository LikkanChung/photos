resource "aws_amplify_app" "amplify-admin-frontend" {
  name       = "admin-frontend"
  repository = "https://github.com/LikkanChung/photos"
  access_token = data.aws_ssm_parameter.github_pat.value
  platform = "WEB"

  enable_auto_branch_creation = true
  enable_branch_auto_build    = true
  enable_branch_auto_deletion = true
  enable_basic_auth           = false

  auto_branch_creation_patterns = [
    "admin-frontend"
  ]

  auto_branch_creation_config {
    # Enable auto build for the created branches
    enable_auto_build = true
  }

  # The default build_spec added by the Amplify Console for React.
  build_spec = <<-EOT
    version: 0.1
    frontend:
      phases:
        preBuild:
          commands:
            - cd admin-frontend
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: ./admin-frontend/build
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  environment_variables = {
    ENV = "test"
  }
}

resource "aws_amplify_branch" "amplify-admin-frontend-dev-branch" {
  app_id = aws_amplify_app.amplify-admin-frontend.id
  branch_name = "admin-frontend"

  framework = "React"
  stage = "DEVELOPMENT"
}