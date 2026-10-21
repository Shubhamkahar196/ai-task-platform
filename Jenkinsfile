pipeline{
    agent any
    environment{
        DOCKER_USER='shubhamkah'
        IMAGE_TAG="latest"
         DOCKER_HOST = 'tcp://docker:2375'
    }

    stages{
        stage('Clean'){
            steps{
              cleanWs()
            }
        }

        stage("validate"){
            steps{
                sh 'docker --version'
                // sh 'trivy --version'
            }
        }

        stage('Clone'){
            steps{
                git url: 'https://github.com/Shubhamkahar196/ai-task-platform.git',
                    branch: 'main'
            }
        }

        stage('Build image'){
            steps{
                  sh 'docker build -t $DOCKER_USER/ai-task-platform:$IMAGE_TAG .'
            }
        }

        // stage('Trivy scan'){
        //     steps{
        //          sh '''
        //             trivy image --exit-code 1 \
        //             --severity HIGH,CRITICAL \
        //             $DOCKER_USER/ai-task-platform:$IMAGE_TAG
        //         '''
        //     }
        // }
        
        stage("Push to docker hub"){
            steps{
                withCredentials([
                    usernamePassword(
                        credentailsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]){
                    sh '''
                        echo "$DOCKERHUB_PASS" | docker login \
                        -u "$DOCKERHUB_USER" --password-stdin

                        docker push "$DOCKER_USER/ai-task-platform:$IMAGE_TAG"

                        docker logout
                    '''
                }

            }
        }
    }
}

  

    
