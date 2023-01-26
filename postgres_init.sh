#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER todo_user WITH PASSWORD 'todo_user_password';
	CREATE DATABASE todo_app;
	GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo_user;
EOSQL
