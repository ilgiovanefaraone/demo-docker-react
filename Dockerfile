# pull the base image
FROM node:12.18.2

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start app in develop mod 
#CMD ["npm", "start"]


# build app for production with minification
 RUN npm run build