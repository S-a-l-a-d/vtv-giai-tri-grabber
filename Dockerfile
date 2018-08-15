FROM mhart/alpine-node
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4000
CMD npm start
