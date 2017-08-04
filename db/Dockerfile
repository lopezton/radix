FROM mongo

MAINTAINER Tony Lopez <tony.lopez1013@gmail.com>

ADD init-scripts.js /init/init-scripts.js

# Conversion from WIN to UNIX
RUN sed -i 's/\r//' /init/init-scripts.js

RUN chmod a+x /init/init-scripts.js

EXPOSE 27017

ENTRYPOINT [ "mongod" ]