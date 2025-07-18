pipeline {
    agent any
    tools {
        nodejs 'NodeJS' 
    environment {
        BACKEND_IMAGE = 'hippocrate-backend:latest'
        FRONTEND_IMAGE = 'hippocrate-frontend:latest'
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/raboudidhia/Hippocrate-vitrine.git', branch: 'main', credentialsId: 'github-token'
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }
        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                dir('client') {
                    sh 'npm test'
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${BACKEND_IMAGE} .'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                dir('client') {
                    sh 'docker build -t ${FRONTEND_IMAGE} .'
                }
            }
        }
        stage('Export Docker Images') {
            steps {
                sh 'docker save -o hippocrate-backend.tar ${BACKEND_IMAGE}'
                sh 'docker save -o hippocrate-frontend.tar ${FRONTEND_IMAGE}'
            }
        }
    }
}
}