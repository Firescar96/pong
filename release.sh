NODE_ENV='production'; pnpm run build-only
docker build -t gcr.io/firescar96/pong:current -f dockerfile .
docker push gcr.io/firescar96/pong:current
kubectl get pods | grep pong | awk '{print $1}' | xargs kubectl delete pod