CREATE USER todo_user WITH PASSWORD 'todo_user_password';
CREATE DATABASE todo_app;
GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo_user;
