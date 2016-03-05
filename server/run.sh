
export MAVEN_OPTS="-Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000"
mvn jetty:run -Dspring.profiles.active=swagger-ui