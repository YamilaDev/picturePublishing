# picturePublishing
# picturePublishing


1)Download Spring tool suite: https://spring.io/tools:
2)Download PgAdmin or some compatible client for PostgreSQL  : 
https://www.pgadmin.org/download/
3) Download or use postman online for test de services : https://web.postman.co/  


4) Open spring tool suite and right click on package explorer :  
	import -> Existing Maven Projects -> Next->Browse -> select the folder :  PicturePublishing\picturePublishing-backend -> check the pom.xml -> Finish.

5) Create Database :  
password: admin123  


run this script;
CREATE DATABASE "PicturePublishing"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

6) Right click on the project folder -> Run As -> Spring boot App 

7) For test the Rest services you can use postman , in the folder PicturePublishing, is the collection for import  ->  PicturePublishing/picturePublishing.postman_collection.json

8) Run this script for create user admin : 
INSERT INTO users(userName, email, password)
VALUES ("admin", "admin@gmail.com","admin123");
(or you can create it from the rest api )



9) For test with the frontend app ,open terminal in  : 
/PicturePublishing/picturePublishing-frontend/
and run commands :  
npm install 
npm start
# picturePublishing
