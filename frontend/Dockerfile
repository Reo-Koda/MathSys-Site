# ベースイメージとしてNode.jsを使用
FROM node:14-alpine

WORKDIR /app

# 依存関係ファイルを先にコピーしてキャッシュ活用
COPY package*.json ./
RUN npm install

# アプリのソースコードをコピー
COPY . .

# コンテナ内でアプリを起動
EXPOSE 3000
CMD ["npm", "start"]
