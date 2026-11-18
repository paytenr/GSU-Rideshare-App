# GSU-Rideshare-App
GSU Rideshare is a ridesharing application designed for Georgia Southern University students. The project uses React for the frontend, Java Spring Boot for the backend, and MySQL for database storage.

**Before running the application, install:**
- Java JDK compatible with the Spring Boot version configured in pom.xml
- Node.js and npm
- MySQL (XAMPP)

# Setting Up MySQL
 1. Start MySQL using XAMPP and create the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS gsu_rideshare;
   ```

2. Configure the database connection in `gsurideshare-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gsu_rideshare
   spring.datasource.username=root
   spring.datasource.password=
   server.port=8081
   ```
Update the credentials if your MySQL setup is different.

3. Add sample drivers and rides:
   - Open `gsurideshare-backend/src/main/resources/sample-rides.sql`.
   - Connect to the gsu_rideshare database in your SQL editor.
   - Run the SQL script to add the sample drivers, vehicles, and rides.

Use npm run dev during development for Node's watch mode.

***Note:** MySQL, Spring Boot (port `8081`), and React must all be running for the application to work.*
