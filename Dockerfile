FROM node as base 
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . .

FROM base as development
ENV PORT=4000
EXPOSE ${PORT} 
CMD ["npm","run","start-dev"]

FROM base as production
ENV PORT=4000
EXPOSE ${PORT} 
CMD ["npm","start"]