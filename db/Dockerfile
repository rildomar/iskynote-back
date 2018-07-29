FROM mysql:5.7

ADD my.cnf /etc/mysql/conf.d/my.cnf
RUN chown -R mysql:root /var/lib/mysql/

ENV MYSQL_ROOT_PASSWORD siemens  
ENV MYSQL_DATABASE siemens  
ENV MYSQL_USER siemens  
ENV MYSQL_PASSWORD siemens

#ADD setup.sql /docker-entrypoint-initdb.d
