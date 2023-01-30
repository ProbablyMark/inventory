const newProductDiv = document.querySelectorAll(".new-product")[0];

///create the table
const itemsTable = (items) => {
    let table;
    let rows = "";
    items.forEach((element) => {
        rows =
            rows +
            `<tr >
        <td class='td${element.product_id}'>${element.product_id}</td>
        <td class='td${element.product_id}'>${element.name}</td>
        <td class='td${element.product_id}'>${element.price}</td>
        <td class='td${element.product_id}'>${element.description}</td>
        <td class='td${element.product_id}'>${element.quantity}</td>
        <td class='td${element.product_id}'><button class="edit" onclick='editProduct()'>Edit</button></td>
        <td class='td${element.product_id}'><button class="delete" onclick='deleteProduct()'>Delete</button></td>
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
setTimeout(() => {
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
}, 100);

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
      <label for="full-name">Name</label><br>
      <input type="text" name="name" id="full-name" placeholder="product name" required />
    </div>
    <div class="form-field">
      <label for="price">Price</label><br>
      <input type="number" name="price" id="price" placeholder="product price" required />
    </div>
    <div class="form-field">
      <label for="descreption">descreption</label><br>
      <input type="text" name="descreption " id="descreption" required />
    </div>
    <div class="form-field">
      
      <input class="add-new" type="submit" value="Add Product" />
      <button class="delete" onclick="cancel()">Cancel</button>
    </div>
  </form>`;
    const formDiv = document.querySelector(`#form`);
    formDiv.addEventListener(`submit`, (e) => {
        e.preventDefault();
        payload = [...new FormData(formDiv)];
        console.log(payload);
        let newProduct = { name: payload[0][1], price: payload[1][1], description: payload[2][1] };
        console.log(newProduct);

        addNew(newProduct);
    });
};
/////cancel add new
const cancel = () => {
    newProductDiv.innerHTML = ``;
};

///////add new
const addNew = (product) => {
    fetch(`http://localhost:3000/products/newProduct`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    location.reload();
};
///////edit
const editProduct = () => {
    let nodes = document.querySelectorAll(`.` + event.target.parentNode.classList[0]);
    console.log(nodes);
    console.log(event.target);
    console.log(event.target.parentNode.classList[0]);
    for (let i = 1; i < nodes.length; i++) {
        if (i < 5) {
            nodes[
                i
            ].innerHTML = `<input class='${nodes[i].classList[0]}' value='${nodes[i].textContent}'>`;
        } else if (i == 5) {
            nodes[
                i
            ].innerHTML = `<button class="edit" onclick='submitChanges()' class='${nodes[i].classList[0]}'>Submit changes</button>`;
        }
    }
};
////submitChanges
const submitChanges = () => {
    let nodes = document.querySelectorAll(`.` + event.target.parentNode.classList[0]);
    let id = nodes[0].textContent;
    let changes = { cols: ["name", "price", "description", "quantity"], values: [] };

    for (let i = 1; i < nodes.length; i++) {
        if (nodes[i].localName == `input`) {
            changes.values.push(nodes[i].value);
        }
    }

    fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    location.reload();
};
