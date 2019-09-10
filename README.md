# City-Clear
## A Web Services and Applications Project

https://www.unibo.it/en/teaching/course-unit-catalogue/course-unit/2019/412604

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

## API Documentation
All the API documentation, concenring the available REST calls can be viewed at the following link:  
https://app.swaggerhub.com/apis/chiara.volonnino/city-clear/1.0.0 


## Presentation
A brief presentation of the project can be found in downloads: 
https://bitbucket.org/cvglteam/asw-19/downloads/

## Team members
Chiara Volonnino (chiara.volonnino@studio.unibo.it)  
Giulia Lucchi (giulia.lucchi2@studio.unibo.it)   

