# Jenkins CI/CD Pipeline

## Objective
Automate the build and deployment of a Node.js application using Jenkins and Docker.

---

## Jenkins Pipeline Stages

1. **Checkout**  
   Pull the latest code from GitHub.

2. **Install & Test**  
   - Verify Node.js and npm versions.  
   - Install dependencies using `npm install`.  
   - Run tests (if any).

3. **Build Docker Image**  
   - Build Docker image with `docker build -t <image_name>:<tag> .`  
   - Tag the image as `latest`.

4. **Push to DockerHub**  
   - Authenticate with DockerHub credentials.  
   - Push the image to DockerHub registry.

5. **Deploy**  
   - Stop and remove any existing container.  
   - Run a new container from the built image, exposing port 3000.

---

## Jenkins Configuration

- **Pipeline**: Pipeline project.  
- **SCM**: Git repository URL pointing to this project.  
- **Build Triggers**: Poll SCM every 5 minutes  

---

- **SCM**: Git repository URL: https://github.com/xkhxl/nodejs-demo-app-jenkins.git  
- **Docker Image**: xkhxl/nodejs-demo-app  
- **DockerHub Credentials ID**: dockerhub-creds  

---

