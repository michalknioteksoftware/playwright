FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /tests

COPY package*.json ./
RUN npm install

COPY . .

ENV BASE_URL=http://host.docker.internal:8000

CMD ["bash", "-c", "tail -f /dev/null"]

