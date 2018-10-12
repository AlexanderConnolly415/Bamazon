var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "menu",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

        })
        .then(function (answer) {
            // based on their answer, either call the buy or the sell functions
            if (answer.menu.toUpperCase() === "View Products for Sale") {
                viewProducts();
            } else if (answer.menu.toUpperCase() === "View Low Inventory") {
                viewInventory();
            } else if (answer.menu.toUpperCase() === "Add to Inventory") {
                addInventory();
            } else {
                addProduct();
            }
        });
}

function viewProducts() {
    // * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

}

function viewInventory() {
    // * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

}

function addInventory() {
    // * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "product_name",
                type: "input",
                message: "What is the item you would like to sell?"
            },
            {
                name: "category",
                type: "input",
                message: "What category would you like to place your item in?"
            },
            {
                name: "price",
                type: "input",
                message: "How much does it cost?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many do you have to sell?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO storefront SET ?",
                {
                    product_name: answer.product_name,
                    category: answer.category,
                    price: answer.price,
                    stock_quantity: answer.stock_quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("--------------------------------------")
                    console.log("Your product was added to the storefront successfully!");
                    console.log("--------------------------------------")
                    start();
                }
            );
        });
}