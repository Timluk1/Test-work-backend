FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Компилируем TypeScript в JavaScript
RUN npm run build

# Указываем команду для запуска приложения
CMD ["node", "dist/index.js"]
