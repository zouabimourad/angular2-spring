set MAVEN_OPTS="-Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000"
mvn jetty:run -Dspring.profiles.active=swagger-ui