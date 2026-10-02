pipeline {
    agent any 

    environment {
        APP_NAME = "devflow"
        REGISTRY = "docker.io/technura"
    }

    stages {
        stage ("Build") {
            steps {
                sh './mvnw clean package -DskipTests'
            }
        }

        stage ("Test") {
            steps {
                sh './mvnw test'
            }
        }

        stage ("Archive Artifact") {
            steps {
                archiveArtifacts(artifacts: 'target/*.jar', fingerprint: true)
            }
        }

        stage ("Docker Build") {
            steps {
                sh """
                    docker build \
                        -t ${REGISTRY}/${APP_NAME}:${BUILD_NUMBER} \
                        -t ${REGISTRY}/${APP_NAME}:latest \
                        .
                """
            }
        }

        stage ("Deploy") {
            when{
                branch 'main'
            }

            steps {
                sh './deploy.sh'
            }
        }
    }

    post{
        always {
            junit(testResults: 'target/surefire-reports/*.xml', allowEmptyResults: true)
            
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
} 