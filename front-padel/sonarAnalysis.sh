#!/bin/bash -e
if [[ $# -ne 1 ]] && [[ $# -ne 4 ]]; then
  echo -e "ERROR:\nMissing options: $0 [release|branch ghprbPullId ghprbSourceBranch ghprbTargetBranch]"
  exit 1;
else
  if [ $# -eq 1 ]; then
    if [ "$1" != "release" ]; then
      echo -e "ERROR:\nMissing options: $0 [release|branch ghprbPullId ghprbSourceBranch ghprbTargetBranch]"
      exit 1;
    fi
  fi

  if [ $# -eq 4 ]; then
    if [ "$1" != "branch" ]; then
      echo -e "ERROR:\nMissing options: $0 [release|branch ghprbPullId ghprbSourceBranch ghprbTargetBranch]"
      exit 1;
    fi
  fi
  TYPE=$1
fi

VERSION=$(cat src/package.json | grep "\"version\"" | cut -d: -f2 | tr -d "\"\| \|,")
echo "Analysing version $VERSION"

sed -i "s/\${TIMESTAMP}/sonar/g" docker-compose-ci.yml

docker network rm 5gnow-front-sonar_default || true
docker network create 5gnow-front-sonar_default

docker-compose -f docker-compose-ci.yml build
docker-compose -f docker-compose-ci.yml run ci npm run test:ci

docker-compose -f docker-compose-ci.yml stop
docker-compose -f docker-compose-ci.yml rm -f
docker network rm 5gnow-front-sonar_default



if [ $? -ne 0 ];then
  exit 1
fi

case $TYPE in
  "release")
    sonar-scanner -Dsonar.projectKey=5gnow-front -Dsonar.projectName=5gnow-front -Dsonar.projectVersion=$VERSION -Dsonar.language=js -Dsonar.sources=src -Dsonar.sourceEncoding=UTF-8 -Dsonar.javascript.jstest.reportsPath=src/coverage/ -Dsonar.javascript.lcov.reportPaths=src/coverage/lcov.info -Dsonar.host.url=http://sonar-sonarqube-01.kite.lab
  ;;
  "branch")
    ghprbPullId=$2
    ghprbSourceBranch=$3
    ghprbTargetBranch=$4
    if [ $ghprbTargetBranch != "develop" ]; then
      echo -e "\n\n\e[1m\e[32mThis pull request does'nt go to merge with develop, then don't analyze\e[0m\n\n"
      exit 0
    fi

    START_DATE=$(date "+%s")
        
    sonar-scanner -Dsonar.projectKey=5gnow-front -Dsonar.projectName=5gnow-front -Dsonar.pullrequest.key=$ghprbPullId -Dsonar.pullrequest.branch=$ghprbSourceBranch -Dsonar.pullrequest.base=$ghprbTargetBranch -Dsonar.host.url=http://sonar-sonarqube-01.kite.lab

    while [[ -z $(curl -f -s -X POST "http://sonar-sonarqube-01.kite.lab/api/project_pull_requests/list?project=5gnow-front" | jq -r ".pullRequests[] | select(.key==\"$ghprbPullId\") | .analysisDate") ]]; do
      echo "Waiting for results at sonar"
      sleep 1
    done

    END_DATE=$(date -d $(curl -f -s -X POST "http://sonar-sonarqube-01.kite.lab/api/project_pull_requests/list?project=5gnow-front" | jq -r ".pullRequests[] | select(.key==\"$ghprbPullId\") | .analysisDate" ) +"%s")
    while [ "$START_DATE" -gt "$END_DATE" ]; do
      echo "Waiting for analysis results"
      END_DATE=$(date -d $(curl -f -s -X POST "http://sonar-sonarqube-01.kite.lab/api/project_pull_requests/list?project=5gnow-front" | jq -r ".pullRequests[] | select(.key==\"$ghprbPullId\") | .analysisDate" ) +"%s")
      sleep 1;
    done

    echo "http://sonar-sonarqube-01.kite.lab/dashboard?id=5gnow-front&pullRequest=$ghprbPullId"
    if [ $(curl -s -X POST "http://sonar-sonarqube-01.kite.lab/api/qualitygates/project_status?projectKey=5gnow-front&pullRequest=$ghprbPullId" | jq -r .projectStatus.status) == "OK" ]; then
      echo -e "\n\n\e[1m\e[32mOK, this pull request pass quality gate validations\e[0m\n\n"
      exit 0
    fi
    if [ $(curl -s -X POST "http://sonar-sonarqube-01.kite.lab/api/qualitygates/project_status?projectKey=5gnow-front&pullRequest=$ghprbPullId" | jq -r .projectStatus.status) == "ERROR" ]; then
      echo -e "\n\n\e[1m\e[31mError, this pull request does not pass quality gate validations\e[0m\n\n"
      exit 1
    fi
  ;;
esac
