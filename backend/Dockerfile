#@Author: Felipe Marcelus 
#@id: 2017192


#TODO: setting is still not working, if running the project, run by "node index.js"
#DEFINING THE BASE IMAGE TO BUILD
FROM node:8.15.1-alpine

#CREATING THE APPS WITHIN THE /ROOT
RUN mkdir -p root/apps

#DEFINING THE RECENTLY CREATED FOLDER AS THE WORKDIRECTORY
WORKDIR /root/apps

#COPYING THE FILES FROM THE SAME LEVEL AS THIS DOCKERFILE TO THE WORKDIRECTORY
COPY . /root/apps

CMD ["node" , "/root/apps/index.js"]
