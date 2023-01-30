# Inventory-app

-   a simple inventory app utilizing CRUD operations to manipulate data on the back-end

# technoligies

-   for the ui : HTML,CSS and javascript
-   fro the api : Typescript, Nodejs + expressjs, postgresSQL

# to install and run (and other useful scripts)

-   app start: `npm run app:start`
-   server Install: `npm run  api:install`
-   Start server: `npm run api:start`
-   Run ui: `npm run "ui:start`

-- note that you need to creat a .env file with the following variables :
--- POSTGRES_HOST=localhost
--- POSTGRES_DB <your db name after you create it>
--- POSTGRES_USER <your pg username after you create it >
--- POSTGRES_PASSWORD <your pg password after you create it >

# content

1- Server End Points :

<table>
    <th>
        <tr>
            <td>End Point</td>
            <td>type</td>
            <td>Method</td>
            <td>Description</td>
        </tr>
    </th>
    <tbody>
        <tr>
            <td>/products/all</td>
            <td>get</td>
            <td>index</td>
             <td>index all products</td>
        </tr>
        <tr>
            <td>/products/newProduct</td>
            <td>post</td>
            <td>createProduct</td>
            <td>create new product by sending(name,price and description) in body</td>
        </tr>
           <tr>
            <td>/products/:product_id</td>
            <td>patch</td>
            <td>updateProduct</td>
            <td>update product by sending(name,price,description and quantity) in body</td>
        </tr>
           <tr>
            <td>/products/:product_id</td>
            <td>delete</td>
            <td>deleteProduct</td>
             <td>delete specific product by id</td>
        </tr>
    <tbody>
</table>
