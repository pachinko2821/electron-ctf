`docker compose up` then connect to vnc@5910

if it takes too long:
```
cd server/html
python3 -m http.server
cd ../../
npm i; npm run start
```