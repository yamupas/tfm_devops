FROM nginx:alpine
 # use a volume is mor efficient and speed that filesystem
VOLUME /tmp
RUN rm -rf /usr/share/nginx/html/*
COPY /Frontend/nginx.conf /etc/nginx/nginx.conf
COPY /Frontend/zmejapp_prep /usr/share/nginx/html/zmejapp_prep
#COPY /Frontend/zmejapp_prod /usr/share/nginx/html
#expose app and 80 for nginx app
EXPOSE 80 81
CMD ["nginx", "-g", "daemon off;"]

