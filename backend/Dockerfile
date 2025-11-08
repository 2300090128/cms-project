# Stage 1: Build the application with Maven
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the Maven project files
# Assumes pom.xml is in the ./backend directory
COPY pom.xml .

# Copy the source code
COPY src ./src

# Build the application and create the executable JAR
RUN mvn clean install -DskipTests

# Stage 2: Create the final lightweight image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the executable JAR from the build stage
# The JAR name must match the artifactId and version in pom.xml
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
