# CI/CD Health Dashboard Deployment Guide

This guide explains how to provision infrastructure with Terraform and deploy the CI/CD Health Dashboard so that it is publicly reachable over HTTP. The Terraform code lives in the [`Infra`](Infra) directory and provisions an EC2 instance, installs Docker, clones the application repository, and starts the Docker Compose stack.

## Prerequisites

1. **AWS account & credentials**
   - Configure credentials via `aws configure`, environment variables, or an AWS profile that Terraform can use.
   - Ensure you have permissions to manage EC2, VPC, IAM, and related networking resources.
2. **Terraform v1.4+** installed locally.
3. **Existing EC2 key pair (optional but recommended)** if you need SSH access for troubleshooting. Record the key pair name and the path to the private key.
4. **Accessible Git repository** that hosts this project. The EC2 instance clones the repository defined by `app_repository_url`.

## Prepare configuration

1. Copy the sample variables file and adjust it:
   ```bash
   cp Infra/terraform.tfvars.example Infra/terraform.tfvars
   ```
2. Update `Infra/terraform.tfvars`:
   - `project_name`: Name prefix for tagging resources.
   - `aws_region`: AWS region to deploy into.
   - `instance_type`: Instance size (defaults to `t3.micro`).
   - `key_pair_name`: Uncomment and set if you created an EC2 key pair.
   - `ssh_allowed_cidrs`: Restrict to trusted networks if SSH is enabled.
   - `app_repository_url`: Git URL of your CI/CD Health Dashboard repository.
   - `app_branch`: Branch to deploy.
   - `app_env_content`: Environment variables written to `.env` before `docker compose up`. Update secrets such as `JWT_SECRET`.
3. (Optional) Review [`Infra/userdata.sh.tpl`](Infra/userdata.sh.tpl) if you want to customize the bootstrap script.

## Deploy infrastructure

Run the following commands from the repository root:

```bash
cd Infra
terraform init
terraform plan
terraform apply
```

Confirm the plan and wait for the apply to finish. Terraform outputs the EC2 public IP along with the frontend and backend URLs.

## Access the application

Once Terraform finishes, the Docker Compose stack will take a few minutes to download images, build the frontend/backend, and start the containers. Afterwards, browse to the frontend URL reported in the Terraform outputs (default `http://<public-ip>:3000`). The backend API is exposed on port 4000 if you need to test it directly.

## Updating the deployment

- **Redeploy latest code**: Run `terraform apply` again after pushing changes to the Git branch specified in `app_branch`. The userdata script will fetch the newest commit and restart the Compose stack.
- **Changing environment variables**: Edit `app_env_content` in `terraform.tfvars` and re-run `terraform apply`. Terraform will reprovision the instance to apply the new configuration. For small tweaks without reprovisioning, SSH to the instance and modify `/opt/<project-name>/app/.env`, then run `docker compose up -d`.
- **Scaling**: Increase `instance_type` or duplicate the module in Terraform if you need multiple nodes. For production-grade deployments consider ALB/AutoScaling, remote state, and a managed database instead of the local Postgres container.

## Troubleshooting

- Check EC2 instance logs in the AWS Console or via `journalctl -u cloud-init` to verify the bootstrap script completed successfully.
- SSH into the instance (if enabled) to inspect Docker services:
  ```bash
  ssh -i path/to/key.pem ubuntu@<public-ip>
  sudo docker compose -f /opt/<project-name>/app/docker-compose.yml ps
  ```
- Ensure the security group allows inbound traffic from your network to ports 3000/4000 (and 22 if SSH is enabled).

## Tear down

When you no longer need the infrastructure:

```bash
cd Infra
terraform destroy
```

Terraform will remove the EC2 instance, security group, and associated resources, freeing up AWS costs.
