<p align="center">
  <img src="assets/reelx_api.svg" width="150" title="Reelx API">
</p>
<h2 align="center">Reelx API</h2>
<br />

## Description

This API is built using [Express](https://expressjs.com/) framework with [TypeScript](https://www.typescriptlang.org/) and utilizes a [MongoDB](https://www.mongodb.com/) database to store information. You can interact with the API by making HTTP requests to the provided endpoints.

## Prerequisites

Make sure you have the following installed on your system:

Node.js (version 18.16.x or higher)  
npm (version 9.6.x or higher)

## Getting Started

To run and build the project locally, follow the steps below:

### Install Dependencies

We need to install the dependencies required by our project. Run the following command in your terminal:

```shell
npm install
```

### Add necessary env variables

Refer to `.env.template` file. Create your own `.env ` files and fil-in the missing values for each environment variable.

### Run the Development Server

To run the development server, use the following command:

```shell
npm run dev
```

### Build for Production

To build it for production using the following command:

```shell
npm run build
```

This will create an optimized build of your app in the `dist` directory

### Run Production build

To test production build before release run:

```shell
npm start
```

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/). Feel free to use, modify, and distribute it as per the terms of the license.
