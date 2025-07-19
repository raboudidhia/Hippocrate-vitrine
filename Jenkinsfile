pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Must match NodeJS name in Global Tool Configuration
    }
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
                    bat 'npm install'
                }
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }
        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                dir('client') {
                    bat 'npm test'
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t %BACKEND_IMAGE% .'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                dir('client') {
                    bat 'docker build -t %FRONTEND_IMAGE% .'
                }
            }
        }
        stage('Export Docker Images') {
            steps {
                bat 'docker save -o hippocrate-backend.tar %BACKEND_IMAGE%'
                bat 'docker save -o hippocrate-frontend.tar %FRONTEND_IMAGE%'
            }
        }
    }
}