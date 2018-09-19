FROM ubuntu:18.04

LABEL name="jasonscrape" \
      version="0.1"

ENV DEBIAN_FRONTEND=noninteractive
ENV DISPLAY :0

RUN apt-get update
RUN apt-get -yq install virtualenv python-pip git nodejs npm runit wget unzip
RUN apt-get -yq install xorg chromium-browser xserver-xorg-video-dummy --no-install-recommends
RUN virtualenv --python python3 /usr/local/GoogleScraper

RUN bash -c ' \
    cd /usr/local/GoogleScraper && \
    wget https://chromedriver.storage.googleapis.com/2.42/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip \
'

COPY ./Docker/runit/. /etc/service/
RUN bash -c ' \
    chmod o+x /etc/service/*/run \
'
RUN ["/bin/bash", "-c", "perl -pi -e 's/^(runsvdir)\\s*-P\\s*(.*)/\\1 \\2/' /etc/runit/2"]
RUN ["/bin/bash", "-c", "perl -pi -e 's/^(exec env)\\s*-\\w*\\s*(.*)$/\\1 \\2/' /etc/runit/2"]

COPY . /tmp/GoogleScraper

RUN bash -c ' \
    cd /usr/local/GoogleScraper && \
    source /usr/local/GoogleScraper/bin/activate && \
    pip install /tmp/GoogleScraper && \
    cp -r /tmp/GoogleScraper/api / \
'

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

ENTRYPOINT ["runit"]
