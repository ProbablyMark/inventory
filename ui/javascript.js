const newProductDiv = document.querySelectorAll(".new-product")[0];

///create the table
const itemsTable = (items) => {
    let table;
    let rows = "";
    items.forEach((element) => {
        rows =
            rows +
            `<tr '>
        <td class='td${element.product_id}'>${element.product_id}</td>
        <td class='td${element.product_id}'>${element.name}</td>
        <td class='td${element.product_id}'>${element.price}</td>
        <td class='td${element.product_id}'>${element.description}</td>
        <td class='td${element.product_id}'>${element.quantity}</td>
        <td class='td${element.product_id}'><button onclick='editProduct()'>Edit</button></td>
        <td class='td${element.product_id}'><button onclick='deleteProduct()'>Delete</button></td>
    </tr>`;
    });
    table =
        `<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>descreption</th>
        <th>quantity</th>
        
    </tr>` +
        rows +
        ` </table>`;

    return table;
};

////get all products
fetch("http://localhost:3000/products/all")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        if (data.length == 0) {
            document.querySelectorAll(".left")[0].innerHTML = "no items to show";
        } else {
            document.querySelectorAll(".left")[0].innerHTML = itemsTable(data);
        }
    })
    .catch((err) => console.log(err));

////delete
const deleteProduct = () => {
    let product_id = event.target.parentNode.classList[0].slice(2);
    fetch(`http://localhost:3000/products/${product_id}`, { method: "DELETE" }).then((response) => {
        return response.json();
    });
    location.reload();
};

///////enable addNew
const enableAddNew = () => {
    newProductDiv.innerHTML = ` <form  id="form"  >
    <div class="form-field">
      <label for="full-name">Name</label>
      <input type="text" name="name" id="full-name" placeholder="product name" required />
    </div>
    <div class="form-field">
      <label for="price">Price</label>
      <input type="number" name="price" id="price" placeholder="product price" required />
    </div>
    <div class="form-field">
      <label for="descreption">descreption</label>
      <input type="text" name="descreption " id="descreption" required />
    </div>
    <div class="form-field">
      <label for=""></label>
      <input type="submit" value="Add Product" />
      <button onclick="cancel()">cancel</button>
    </div>
  </form>`;
    const formDiv = document.querySelector(`#form`);
    formDiv.addEventListener(`submit`, (e) => {
        e.preventDefault();
        payload = [...new FormData(formDiv)];
        console.log(payload);
        let newProduct = { name: payload[0][1], price: payload[1][1], description: payload[2][1] };
        console.log(newProduct);
        console.log(JSON.stringify(newProduct));
        addNew(newProduct);
    });
};
/////cancel
const cancel = () => {
    newProductDiv.innerHTML = ``;
};

///////add new
const addNew = (product) => {
    fetch(`http://localhost:3000/products/newProduct`, { method: "POST", body: product })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    //location.reload();
};
