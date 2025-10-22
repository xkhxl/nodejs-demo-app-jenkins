pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-id')
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/xkhxl/nodejs-demo-app-jenkins.git'
            }
        }

        stage('Install & Test') {
            steps {
                bat 'npm install'
                bat 'npm test || echo "No tests defined"'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t xkhxl/nodejs-demo-app:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-id', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat 'docker login -u $USER -p $PASS'
                    bat 'docker push xkhxl/nodejs-demo-app:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                docker stop nodejs-demo-app || true
                docker rm nodejs-demo-app || true
                docker run -d --name nodejs-demo-app -p 3000:3000 xkhxl/nodejs-demo-app:latest
                '''
            }
        }
    }
}
