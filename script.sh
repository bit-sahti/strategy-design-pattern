docker run \
    --name postgres \
    -e POSTGRES_USER=thais \
    -e POSTGRES_PASSWORD="thais" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username thais --dbname heroes

CREATE TABLE warriors(id serial primary key, name varchar (255) not null);

#mongo

docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=thais \
    -e MONGO_INITDB_ROOT_PASSWORD="thais" \
    -p 27017:27017 \
    -d \
    mongo:5

    docker logs mongodb
