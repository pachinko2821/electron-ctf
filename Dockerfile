FROM ubuntu:latest

RUN apt update && DEBIAN_FRONTEND=noninteractive apt install -y tightvncserver nodejs npm python3
COPY . /tmp/app
RUN cd /tmp/app; npm i; npm run make-lin
RUN DEBIAN_FRONTEND=noninteractive apt install -y $(find . -iname "*.deb" -type f)

WORKDIR /opt/server

COPY ./server/html ./

RUN useradd -s /bin/bash -m ctf
COPY ./flag.txt /home/ctf/flag.txt
RUN chown root:ctf /home/ctf/flag.txt
RUN chmod 640 /home/ctf/flag.txt

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

USER ctf
ENV USER=ctf
ENV HOME=/home/ctf

CMD /entrypoint.sh
