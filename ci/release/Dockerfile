
FROM golang:alpine as goBuilder
WORKDIR "/go/src/github.com/hjin-me/weekly-report"
COPY ./api ./api
RUN go build -v -o /go/bin/app ./api/app.go

# TODO
FROM alpine:3.7
ENV PROJECT_NAME weekly-report
ENV GIN_MODE release
COPY ./dist/weekly-report /var/www/static/weekly-report
RUN ls -al /var/www/static
COPY --from=goBuilder /go/bin/app /usr/local/bin/app
EXPOSE 8787
CMD app
