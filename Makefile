target: install dev

install:
	cd api && npm install &
	cd web && npm install 

start:
	cd api && npm run dev &
	cd web && npm run dev