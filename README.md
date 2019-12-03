# City-Clear
This project is creted to the course of "Web Services and Applications Project" AA.2018/2019, available from the following link https://www.unibo.it/en/teaching/course-unit-catalogue/course-unit/2019/412604.

This project lies in the context of environmental sustainability, in particular with regard to urban decor in the region
of Emilia Romagna and in detail for the Municipality of Cesena. The aim of our work is to improve our city, to 
raise public awareness, to notify cities' problem and  to encourage collaboration between citizens.

## Use Requirements

In order to use in ***local*** the system all that is needed: 


```
	# install dependencies
	npm install

	# serve with hot reload at localhost:8080
	npm run serve

	# build for production with minification
	npm run build
```

In order to use in ***Heroku*** the system all that is needed: 
Create heroku account, create new application and download Heroku CLI. For deploy run:

```
	# If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
	heroku login

	# clone the repository in local machine
	heroku git:clone -a asw-19-city-clear
	cd asw-19-city-clear

	# Deploy your changes
	git add .
	git commit -am "make it better"
	git push heroku master
```

In order to use in ***Docker*** the system that is needed:
For deploy run:

```
	#go to folder with Dockerfile
	sudo docker build -t city-cleaner .
	
	#ID: id image created
	sudo docker run -p 8080:8080 -p 5051:5051 -it ID
	
	#Get container IP and lanch application with container ip
	sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ID
```

## Presentation and documentation

- [A brief presentation in Italian language](presentation.pdf)  
- [A complete API documentation, concerning the available REST calls](report.pdf)  

## Team members
Chiara Volonnino (chiara.volonnino@studio.unibo.it)  
Giulia Lucchi (giulia.lucchi2@studio.unibo.it)   

