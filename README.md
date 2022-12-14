<h1 align="center">Association Manager REST API</h1>
<h4 align="center">Mael KERICHARD (@Pixselve) - Romain BRIEND (@Yami2200)</h4>
<p align="center">
   <img src="https://img.shields.io/badge/-ESIR-orange" alt="ESIR">
   <img src="https://img.shields.io/badge/-TypeScript-blue" alt="TypeScript">
   <img src="https://img.shields.io/badge/-NestJS-red" alt="NestJS">
</p>

---

This project provides a REST API made with NestJS for managing associations. The API provides powerful tools to manage
the associations, such as creating, updating, and deleting members, managing meeting minutes, and more.

## ✨ How to use

We released a Docker image for anyone to use. It is available
on [GitHub Packages](https://github.com/pixselve-school/tp1-wm/pkgs/container/tp1-wm).

```bash
docker run -p 3000:3000 ghcr.io/pixselve-school/tp1-wm:master --env-file .env
```

Or use a `docker-compose.yml` file:

```yaml
version: "3.9"
services:
  backend:
    image: ghcr.io/pixselve-school/tp1-wm:master
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_USERNAME=postgres
      - DB_PASSWORD=postgres
      - DB_DATABASE=postgres
      - DEFAULT_USER_PASS=admin
      - DEFAULT_USER_EMAIL=admin@administration.fr
      - FRONTEND_URL=http://localhost:4200/
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: postgres
    volumes:
      - ./db-data:/var/lib/postgresql/data
```

You can find a complete docker compose file including the frontend and backend, a RabbitMQ instance, a PostgreSQL and a
SMTP server in the [projet-al](https://github.com/pixselve-school/projet-al) repository. (REQUIRED for feature like : email verification)

### Environment variables

| Name                 | Value                                                                        | Example                          | Required |
|----------------------|------------------------------------------------------------------------------|----------------------------------|----------|
| `DB_HOST`            | The host of the database. It should be a PostgreSQL database.                | 127.0.0.1                        | ✅        |
| `DB_USERNAME`        | The username of the database.                                                | postgres                         | ✅        |
| `DB_PASSWORD`        | The password of the database.                                                | postgres                         | ✅        |
| `DB_DATABASE`        | The name of the database.                                                    | postgres                         | ✅        |
| `DEFAULT_USER_EMAIL` | If the database is empty, a default user with this email will be created.    | admin@administration.fr          | ✅        |
| `DEFAULT_USER_PASS`  | If the database is empty, a default user with this password will be created. | admin                            | ✅        |
| `RABBITMQ_URL`       | The url pointing to a RabbitMQ instance.                                     | amqp://guest:guest@rabbitmq:5672 | ❌        |

## 🧱 Build from source

### Requirements

- Node.js
- PostgreSQL
- RabbitMQ (optional)

### Installation

```bash
git clone
cd tp1-wm
npm install
```

### Configuration

The configuration is done through environment variables. You can find the list of environment variables in the
[Environment variables](#environment-variables) section.

### Running

```bash
npm run build
npm run start
```

## 🏠 Architecture

![](http://www.plantuml.com/plantuml/svg/jLB1JiCm3BtdAyouiYC7UjfrTsu8fgpnDcj9NALk4KByEqs3j4LP9r1PgbRLi_tUY_LMhUWWdRFgJWxe41ghoIlX1eHXooBim530MeYzQe_a6nsq0qiUvQD1u207LggskcrXUBac7NlXKm60rmuhw7Me3pf4W4m5v0Nt6DHNERNfMWpj-4q4PxNrQJHMOi_w0Xlsw6L2VRnj1K8EXr_NH0ozoP4fpGdtZdmdc0Hh7efUCasZ1Vz1ODEpvAj9-2-t4jZYvQKK8uN1Wkpa0Pqccx4D3L98x2XSGFKUCzLcu7xdOBAc7WFj20TmosnH-nDOZmQV-OZ-IiRKHBnW-NB_-1IVXp7qhyktxE9mTYfOv2iXi_WJRwgaa_F6oWzXIcvvvXfDGRaHRnRCQTxCGyQRAbSfP-nqpFqDTbhopZIwGcywPxy1)

This database architecture is designed to track and organize information about associations, users, events, minutes, and
roles.

The `association`, `event`, `minute`, and `role` entities each have a many-to-one relationship with the `association`
entity, as they each contain a foreign key to the association table. This allows events, minutes, and roles to be
organized and tracked by association.

The `association` and `user` entities have a many-to-many relationship, which is represented by
the `association_users_user` junction table. This junction table allows multiple users to be associated with multiple
associations, and vice versa.

The `minute_voters_user` junction table represents a many-to-many relationship between the `minute` and `user` entities,
allowing multiple users to vote on multiple minutes.

### API

We have created a REST API for the database described in the schema above. In designing the API, we chose to stay
closely aligned with the structure of the database in order to make it easy to understand and use.

One of the main reasons for this decision was to maintain consistency between the database and the API. By using a
similar structure for both, it is easier for developers to understand how the data is organized and how to access it
through the API.

Additionally, staying closely aligned with the database structure allows us to leverage the existing relationships
between the entities in the database, such as the many-to-many relationships between associations and users, or between
minutes and voters. This can simplify the design of the API and make it more intuitive for users.
