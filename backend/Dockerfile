# Goの公式イメージを使用
FROM golang:1.18-alpine

WORKDIR /app

# Goモジュールのキャッシュを活用するためにモジュール定義ファイルを先にコピー
COPY go.mod go.sum ./
RUN go mod download

# アプリのソースコードをコピー
COPY . .

# アプリケーションのビルド
RUN go build -o myapp

EXPOSE 8080
CMD ["./myapp"]
