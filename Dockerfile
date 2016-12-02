FROM node
WORKDIR /app
COPY . .
RUN npm install --silent
RUN ls
ENV NODE_PATH .
EXPOSE 3000
CMD ["./run.sh"]
