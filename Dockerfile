FROM ubuntu:18.04

LABEL name="jasonscrape" \
      version="0.1"

RUN apt-get update
RUN apt-get -yq install virtualenv python-pip git nodejs npm dumb-init
RUN virtualenv --python python3 /usr/local/GoogleScraper

COPY . /tmp/GoogleScraper
RUN bash -c ' \
    cd /usr/local/GoogleScraper && \
    source /usr/local/GoogleScraper/bin/activate && \
    pip install /tmp/GoogleScraper && \
    mkdir /app && cp -r /tmp/GoogleScraper/api / \
'

# RUN bash -c ' \
#    cd /usr/local/GoogleScraper && \
#    source /usr/local/GoogleScraper/bin/activate && \
#    cd /tmp && git clone https://github.com/redtorchinc/GoogleScraper/ && \
#    pip install /tmp/GoogleScraper && \
#    mkdir /app && cp -r /tmp/GoogleScraper/api / \
# '

# RUN ls -l / /api

WORKDIR /api

RUN rm -rf node_modules/ && npm install || \
    ((if [ -f npm-debug.log ]; then \
        cat npm-debug.log; \
    fi) && false)
RUN npm run build

EXPOSE 80
ENV SCRAPER_ROOT /usr/local/GoogleScraper
ENV BIND_PORT 80
ENV BIND_HOST 0.0.0.0

ENTRYPOINT [ "dumb-init" , "--"]
# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "start"]
