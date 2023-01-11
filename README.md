
# Welcom to Devoura! 👋


## About

> Devoura is a web scraper server that allows users to extract data from websites and receive the results in a structured format such as CSV or JSON. Provides a web interface and API for users to easily scrape data from any webpage with a simple HTTP request.Built with Node.js, Express, Cheerio and TypeScript fast and reliable data extraction from mostly food based ecommerce websites.


## Demo

[Demo Link](https://devoura-production.up.railway.app/)


## Run Locally

Clone the project

```bash
  git clone https://github.com/chinmayakain/devoura.git
```

Go to the project directory

```bash
  cd devoura
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Authors

- [@chinmayanaik](https://www.github.com/chinmayakain)

## API Reference

#### Health Check

```http
  GET /healthCheck/
```

#### List all items

```http
  GET /api/listData/
```
#### Scrape pages

```http
  GET /api/scrapeData/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url`      | `string` | **Required** url of page to be scraped |
| `baseUrl`      | `string` | (optional) based url of page to be scraped |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_DB_URI`


## Features or Limitations

- Currenlty limited to a certain website for data scraping.


## Deployment

<p align="center">
  <img src="https://railway.app/brand/logo-light.png" width="250">
<p>

 
<div align="center">
    <h1>
        <a href="https://railway.app/">
            Deployed on Railway
        </a>
    </h1>
</div>
