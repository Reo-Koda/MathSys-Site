FROM golang:1.24-alpine

WORKDIR /app

COPY ./go.mod .
COPY ./go.sum .

# mod ファイル内のパッケージ達を全てダウンロード
RUN go mod download

CMD [ "go", "run", "main.go" ]