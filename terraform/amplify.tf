resource "aws_amplify_app" "amplify-frontend" {
  name       = "frontend"
  repository = "https://github.com/LikkanChung/photos"
  access_token = data.aws_ssm_parameter.github_pat.value
  platform = "WEB"

  enable_auto_branch_creation = true
  enable_branch_auto_build    = true
  enable_branch_auto_deletion = true
  enable_basic_auth           = false

  auto_branch_creation_patterns = [
    "frontend"
  ]

  auto_branch_creation_config {
    # Enable auto build for the created branches
    enable_auto_build = true
  }

  # The default build_spec added by the Amplify Console for React.
  build_spec = <<-EOT
    version: 1.0
    frontend:
      phases:
        preBuild:
          commands:
            - cd frontend
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: frontend/dist
        files:
          - '**/*'
      cache:
        paths:
          - frontend/node_modules/**/*
  EOT

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/assets/<*>"
    target = "/assets/<*>"
    status = "200"
  }

  custom_rule {
    source = "/<*>.js"
    target = "/<*>.js"
    status = "200"
  }

  custom_rule {
    source = "/<*>.css"
    target = "/<*>.css"
    status = "200"
  }

  custom_rule {
    source = "/favicon.ico"
    target = "/favicon.ico"
    status = "200"
  }

  custom_rule {
    source = "/index.html"
    target = "/index.html"
    status = "200"
  }

  custom_rule {
    source = "/<*>"
    target = "/index.html"
    status = "200"
  }

  environment_variables = {
    ENV = "test"
  }
}

resource "aws_amplify_branch" "amplify-frontend-dev-branch" {
  app_id = aws_amplify_app.amplify-frontend.id
  branch_name = "admin-frontend"

  framework = "React"
  stage = "DEVELOPMENT"
}