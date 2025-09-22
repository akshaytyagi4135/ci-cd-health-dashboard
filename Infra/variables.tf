variable "project_name" {
  description = "Name prefix used for tagging resources"
  type        = string
  default     = "ci-cd-health-dashboard"
}

variable "aws_region" {
  description = "AWS region where the infrastructure will be created"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type to provision"
  type        = string
  default     = "t3.micro"
}

variable "key_pair_name" {
  description = "Optional existing EC2 key pair name to associate with the instance"
  type        = string
  default     = null
}

variable "instance_ssh_user" {
  description = "Linux user that Terraform should configure for Docker access"
  type        = string
  default     = "ubuntu"
}

variable "ssh_allowed_cidrs" {
  description = "List of CIDR blocks allowed to reach the instance via SSH. Leave empty to disable SSH access."
  type        = list(string)
  default     = []
}

variable "app_repository_url" {
  description = "Git URL of the ci-cd-health-dashboard repository"
  type        = string
}

variable "app_branch" {
  description = "Git branch to deploy"
  type        = string
  default     = "main"
}

variable "app_env_content" {
  description = "Content for the app .env file used by docker-compose"
  type        = string
  default     = <<EOT
DATABASE_URL=postgresql://postgres:postgres@db:5432/pipeline
JWT_SECRET=supersecretjwtkey
PORT=4000
EOT
}
