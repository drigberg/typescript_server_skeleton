# typescript_server_skeleton

## Usage

```bash
docker-compose up
```

## Testing

The command below will spin up the containers, run tests, and shut down.

```bash
docker-compose -f docker-compose.yml -f docker-compose.override-test.yml up --abort-on-container-exit
```
