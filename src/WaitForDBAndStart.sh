#!/bin/sh

# Wait for the database to be reachable
RETRIES=10

while ! pg_isready -p 5432 -h pg-database
do
    if [[ $RETRIES -eq 0 ]]
    then
        echo "Could not connect to the database!"
        exit 1
    else
        echo "Trying to connect to database..."
        RETRIES=$((RETRIES-1))
        sleep 3
    fi
done

echo "Succesfully connected to database! Continuing..."

# Setup and start express server
npx prisma migrate dev --name init
npm run start
