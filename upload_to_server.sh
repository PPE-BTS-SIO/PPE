tar -czvf server.tar.gz node_server/ && scp -rp -P 2222 ./server.tar.gz pi@78.237.195.145:"Dev/ppe_web/" && ssh pi@78.237.195.145 -p 2222 "cd /home/pi/Dev/ppe_web && tar -xzvf server.tar.gz && sudo rm -r server.tar.gz"

