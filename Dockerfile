# A node.js v10 box
FROM node:13.12.0-alpine

# Create a working directory 
RUN mkdir /app

# Switch to working directory
WORKDIR /app

# copy app
COPY . ./

# Install dependencies ... package.json from ./api is now in the root of container (so it's referenced here!)
RUN npm install

#RUN npm i --save-dev @types/lodash

RUN npm rebuild node-sass

RUN npm run build

# start app in development mode
CMD ["npm", "start"]
