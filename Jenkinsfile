pipeline {
    agent any

    stages{
        stage ("build") {
            steps{
                echo "Building application"
            }
        }

        stage ("test") {
            when{
                expression {
                    BRANCH_NAME == 'main'
                }
            }
            steps{
                echo "Testing application"
            }
        }

        stage ("deploy") {
            steps{
                echo "Deploying application"
            }
        }
    }
}