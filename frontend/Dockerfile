# ベースイメージ
FROM node:24-slim

# 作業ディレクトリ
WORKDIR /usr/src/app

# 依存関係だけ先にコピーしてインストール
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .
