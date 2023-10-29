terraform {
  backend "remote" {
    organization = "lkcultimate"

    workspaces {
      name = "aws-lkc-ultimate"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
}

module "terraform" {
  source = "./terraform"
}