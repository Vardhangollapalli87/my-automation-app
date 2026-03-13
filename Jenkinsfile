// pipeline {
//     agent any

//     stages {

//         stage('Checkout from GitHub') {
//             steps {
//                 git branch: 'main',
//                     url: 'https://github.com/Vardhangollapalli87/my-automation-app'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 sh '''
//                 docker build -t my-automation-app:${BUILD_NUMBER} .
//                 docker tag my-automation-app:${BUILD_NUMBER} vardhangollapalli/my-automation-app:${BUILD_NUMBER}
//                 '''
//             }
//         }

//         stage('Push Docker Image') {
//             environment {
//                 DOCKER_IMAGE = "vardhangollapalli/my-automation-app:${BUILD_NUMBER}"
//                 REGISTRY_CREDENTIALS = credentials('docker')
//             }
//             steps {
//                 script {
//                     def dockerImage = docker.image("${DOCKER_IMAGE}")
//                     docker.withRegistry('https://index.docker.io/v1/', "docker") {
//                         dockerImage.push()
//                     }
//                 }
//             }
//         }

        

//     stage('Start Minikube if not running') {
//     steps {
//         sh '''
//         if ! minikube status | grep -q "apiserver: Running"; then
//             echo "Minikube is not running. Starting now..."
//             minikube start --driver=docker
//         fi
//         '''
//     }
// }

//         stage('Deploy to Kubernetes') {
//             steps {
//                 sh '''
//                 # Replace image tag inside deployment.yaml
//                 sed -i "s/IMAGE_TAG/${BUILD_NUMBER}/g" k8s/deployment.yaml

//                 # Load image into Minikube
//                 minikube image load vardhangollapalli/my-automation-app:${BUILD_NUMBER}

//                 # Apply manifests
//                 kubectl apply -f k8s/deployment.yaml
//                 kubectl apply -f k8s/service.yaml
//                 '''
//             }
//         }
//     }
// }



// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "vardhangollapalli/my-automation-app"
//     }

//     stages {

//         stage('Checkout from GitHub') {
//             steps {
//                 git branch: 'main',
//                     url: 'https://github.com/Vardhangollapalli87/my-automation-app'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 bat """
//                 docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .
//                 docker tag %IMAGE_NAME%:%BUILD_NUMBER% %IMAGE_NAME%:latest
//                 """
//             }
//         }

//         stage('Push Docker Image') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
//                     bat """
//                     docker login -u %USER% -p %PASS%
//                     docker push %IMAGE_NAME%:%BUILD_NUMBER%
//                     docker push %IMAGE_NAME%:latest
//                     """
//                 }
//             }
//         }

//         // stage('Deploy to Kubernetes') {
//         //     steps {
//         //         bat """
//         //         set KUBECONFIG=C:\\Users\\vardh\\.kube\\config
//         //         kubectl set image deployment/my-automation-app-deployment ^
//         //         my-automation-app=%IMAGE_NAME%:%BUILD_NUMBER%
//         //         """
//         //     }
//         // }

//         // stage('Show Application URL') {
//         //     steps {
//         //         bat """
//         //         echo ========================================
//         //         echo Application deployed successfully
//         //         echo Access your app at:
//         //         minikube service my-automation-app-service --url
//         //         echo ========================================
//         //         """
//         //     }
//         // }



//         stage('Deploy to Kubernetes') {
//             steps {
//                 bat """
//                 set KUBECONFIG=C:\\Users\\vardh\\.kube\\config
//                 kubectl config use-context minikube
//                 kubectl set image deployment/my-automation-app-deployment ^
//                 my-automation-app=%IMAGE_NAME%:%BUILD_NUMBER%
//                 """
//             }
//         }

//         stage('Show Application URL') {
//             steps {
//                 // bat """
//                 // set KUBECONFIG=C:\\Users\\vardh\\.kube\\config
//                 // echo ========================================
//                 // echo Application deployed successfully
//                 // echo Access your app at:
//                 // minikube service my-automation-app-service --url
//                 // echo ========================================
//                 // """

//                 bat """
//                     echo ========================================
//                     echo Application deployed successfully
//                     echo Access your Node app at:
//                     echo http://192.168.49.2:32000
//                     echo ========================================
//                 """
//             }
//         }

//     }
// }





pipeline {
    agent any

    environment {
        IMAGE_NAME = "vardhangollapalli/my-automation-app"
        KUBECONFIG = "/home/jenkins/.kube/config"   // adjust if your kubeconfig is elsewhere
    }

    stages {

        stage('Checkout from GitHub') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vardhangollapalli87/my-automation-app'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$BUILD_NUMBER .
                docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $IMAGE_NAME:$BUILD_NUMBER
                    docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl config use-context minikube
                kubectl set image deployment/my-automation-app-deployment \
                my-automation-app=$IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }

        stage('Show Application URL') {
            steps {
                sh '''
                MINIKUBE_IP=$(minikube ip)
                NODE_PORT=$(kubectl get svc my-automation-app-service -o jsonpath="{.spec.ports[0].nodePort}")

                echo "========================================"
                echo "Application deployed successfully"
                echo "Access your Node app at:"
                echo "http://$MINIKUBE_IP:$NODE_PORT"
                echo "========================================"
                '''
            }
        }
    }
}