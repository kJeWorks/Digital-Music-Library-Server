
## Installation

```bash
$ npm install
```

## Setup before running the app

<ul>
  <li>
    Create a ".env" file in the root folder of the project 
  </li>
  <li>
    In the ".env> file add these lines:

      DB_USER=<YOUR MSSQL USERNAME>
      DB_PASSWORD=<YOUR MSSQL PASSWORD>
      DB_NAME=<THE PREFERRED DATABASE NAME (MAKE SURE TO CREATE IT BEFORE, OTHERWISE IT WON'T WORK)>
      DB_HOST=<DATABASE HOST>
      DB_PORT=<DATABASE PORT>
      # these 2 can be left like this
      DB_TRUST_SERVER_CERTIFICATE=true
      DB_SYNCHRONIZE=false
      
  </li>
  <li>
    after this everything should be fine, just use the commands below to run the server
  </li>
</ul>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
