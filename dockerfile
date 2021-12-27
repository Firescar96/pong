FROM node
ENV PORT 80

WORKDIR /root

ADD dist dist
ADD app.js .
ADD server server
ADD node_modules node_modules

CMD node app.js