<h1 align="center">Books API</h1>

This system is part of a technical challenge, which consists of building a simple book API service.

## Development
1. Install project dependencies: 

```
yarn install
```

2. Set the needed environment variables in ```.env``` file for database access.
	- change files with ```.js``` to ```.ts``` and ```dist``` to ```src```.
	- change TYPEORM_HOST environment variable to ```localhost```.

3. Run database migrations: 

```
yarn migration
```

4. Start the server:
```
yarn dev
```

## Docker way
1. Run docker compose: 
```docker-compose up```; This command will run migrations and start the server.
