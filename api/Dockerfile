FROM ubuntu:18.04

LABEL name="jasonscrape" \
      version="0.1"

RUN apt-get update
RUN apt-get -yq install virtualenv python-pip git nodejs npm dumb-init
RUN virtualenv --python python3 /usr/local/GoogleScraper

ENV BUILD master-1
ENV BIND_PORT 3000
ENV BIND_HOST 0.0.0.0

RUN bash -c ' \
    cd /usr/local/GoogleScraper && \
    source /usr/local/GoogleScraper/bin/activate && \
    cd /tmp && git clone https://github.com/redtorchinc/GoogleScraper/ && \
    pip install /tmp/GoogleScraper && \
    mkdir /app && cp -r /tmp/GoogleScraper/api / \
'

# RUN ls -l / /api

WORKDIR /api

RUN npm install || \
    ((if [ -f npm-debug.log ]; then \
        cat npm-debug.log; \
    fi) && false)

EXPOSE 3000
ENV SCRAPER_ROOT /usr/local/GoogleScraper

CMD ["npm", "run", "build"]

ENTRYPOINT [ "dumb-init" , "--"]
CMD ["npm", "run", "start:dev"]
# CMD ["npm", "run", "start"]
