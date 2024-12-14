FROM node:21


WORKDIR /usr/src/app

# Копируем весь проект
COPY . .

# Устанавливаем зависимости
RUN npm install

# Указываем порт для сервера
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "start"]
