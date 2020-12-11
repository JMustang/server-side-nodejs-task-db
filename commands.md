# commands used in creating the API

yarn dev

sudo -u postgres psql

\l

nome do banco de dados => server_side_nodejs_task_db

\c server_side_nodejs_task_db

create table tasks (
id serial primary key,
title text not null,
description text,
status integer,
created_at timestamp,
updated_at timestamp
);

insert into tasks (
title, description, status, created_at, updated_at
) values (
'title one',
'description',
1,
current_timestamp,
current_timestamp
);

# select \* from tasks;

create table users (
id serial primary key,
active boolean,
name text not null,
email text unique not null,
password text not null,
created_at timestamp,
updated_at timestamp
);

create table roles (
id serial primary key,
role text unique not null,
created_at timestamp,
updated_at timestamp
);

create table user_roles (
user_id integer,
role_id integer
);

drop table tasks;

create table tasks (
id serial primary key,
user_id integer,
title text not null,
description text,
status integer,
created_at timestamp,
updated_at timestamp
);

alter table user_roles add foreign key (user_id) references users (id);

alter table user_roles add foreign key (role_id) references roles (id);

alter table tasks add foreign key (user_id) references users (id);

insert into roles (
role, created_at, updated_at
) values (
'USER', current_timestamp, current_timestamp
),
(
'ADMIN', current_timestamp, current_timestamp
);

insert into users (
active, name, email, password, created_at, updated_at
) values (
true,
'System Administrator',
'sys.admin@email.com',
--sysadmin123
'$2y$10$UsdCkuR7s8m456jfj2S.IedB1ZHWOINdT2grZ3xJVTlSUlfUEtGzK',
current_timestamp,
current_timestamp
);

insert into user_roles (
user_id, role_id
) values (
(select id from users where email = 'sys.admin@email.com'),
(select id from roles where role = 'USER')
), (
(select id from users where email = 'sys.admin@email.com'),
(select id from roles where role = 'ADMIN')
);

insert into tasks (
user_id, title, description, status, created_at, updated_at
) values (
(select id from users where email = 'sys.admin@email.com'),
'Recriar Tabelas',
'Recriar Tabelas',
1,
current_timestamp,
current_timestamp
);

yarn add bcryptjs

yarn add jsonwebtoken
