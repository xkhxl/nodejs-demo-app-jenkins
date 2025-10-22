pipeline {
  agent any

  environment {
    IMAGE_NAME = "xkhxl/nodejs-demo-app"
    IMAGE_TAG  = "${env.BUILD_ID}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        script {
          bat 'node --version || echo skipped'
          bat 'npm --version || echo skipped'
          bat 'npm install'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
          bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest"
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          bat """
            docker login -u %DOCKER_USER% -p %DOCKER_PASS%
            docker push %IMAGE_NAME%:%IMAGE_TAG%
            docker push %IMAGE_NAME%:latest
          """
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          bat """
            docker stop nodejs-demo-app || echo skipped
            docker rm nodejs-demo-app || echo skipped
            docker run -d --name nodejs-demo-app -p 3000:3000 %IMAGE_NAME%:%IMAGE_TAG%
          """
        }
      }
    }
  }

  post {
    always {
      echo "Build finished: ${currentBuild.fullDisplayName}"
    }
    failure {
      echo "Build failed — check console output"
    }
  }
}
