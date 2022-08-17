FROM node:18

RUN mkdir /app

# .dockerignore controls which files/directories are not copied
COPY . /app/
WORKDIR /app

# get environment and persist for runtime
ARG ENV=DEV
ENV ENVIRONMENT=$ENV

RUN if [ "$ENVIRONMENT" = "PROD" ] ; then npm install --production; else npm install; fi
RUN if [ "$ENVIRONMENT" = "PROD" ] ; then npm run build; fi

EXPOSE 9001
