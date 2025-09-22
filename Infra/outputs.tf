output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app.public_ip
}

output "frontend_url" {
  description = "Base URL for accessing the frontend"
  value       = "http://${aws_instance.app.public_ip}:3000"
}

output "backend_url" {
  description = "Base URL for accessing the backend API"
  value       = "http://${aws_instance.app.public_ip}:4000"
}
