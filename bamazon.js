var mysql = require("mysql");
var inquirer = require("inquirer");

function updateStore(stock_remaining, product_name, id) {
    connection.query("UPDATE storefront SET ?, ? WHERE ?",
        [{
            stock_quantity: stock_remaining
        },
        {
            product_name: product_name
        },
        {
            id: id
        }
        ],
    )
};

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

// function prompts the user for the action they should take
function start() {
    inquirer
        .prompt({
            name: "sellOrBuy",
            type: "list",
            message: "Would you like to [SELL] something or [BUY] something?",
            choices: ["SELL", "BUY"]
        })
        .then(function (answer) {
            // based on their response, either call buy or sell functions
            if (answer.sellOrBuy.toUpperCase() === "SELL") {
                sellSomething();
            }
            else {
                buySomething();
            }
        });
}

// function handles posting new items up for auction
function sellSomething() {
    // prompt for info about the item being put up for auction
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
};

function buySomething() {
    connection.query("SELECT * FROM storefront", function (err, results) {
        if (err) throw err;
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
            // var result = results[i];
            // console.log('result:', result);
            choiceArray.push(results[i].id + ") " + results[i].product_name + " - " + results[i].stock_quantity + " available");
        }
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: choiceArray,
                    message: "Which product ID would you like to purchase?\n",
                },
                {
                    name: "items_wanted",
                    type: "number",
                    message: "How many would you like to purchase?\n"
                },
            ])
            .then(function (answer) {
                console.log('answer:', answer)
                var id = answer.choice.slice(0, answer.choice.indexOf(')'));
                connection.query("SELECT * FROM storefront WHERE id=" + id, function (err, res) {
                    console.log('res:', res);
                    var stockAvailable = res[0].stock_quantity;
                    console.log('stockAvailable:', stockAvailable);
                    var stock_remaining = stockAvailable - answer.items_wanted;
                    console.log('stock_remaining:', stock_remaining);

                    if (answer.items_wanted > stockAvailable) {
                        console.log("We don't have enough! Please try again \n");
                        console.log("--------------------------------------");
                        start();
                    } else {
                        var id = res[0].id;
                        var product_name = res[0].product_name;
                        var price = res[0].price;
                        var sales = price * answer.items_wanted;
                        console.log("SOLD!")
                        console.log("Item ID: " + id + "\n" + "Item: " + product_name + "\n" + "Price per item: $" + price + "\n" + answer.items_wanted + " purchased")
                        console.log("--------------------------------------")
                        console.log("Total: $", sales + "\n")
                        console.log("--------------------------------------")
                        console.log("Stock remaining: ", stock_remaining + "\n")
                        console.log("Updating inventory...\n\n");

                        updateStore(stock_remaining, product_name, id);
                        console.log("Inventory updated.")
                    }
                },
                    function (err, res) {
                        if (err) throw err;
                        console.log("Inventory updated.");
                        console.table(res);
                        start();
                        connection.end();
                    }
                )
            })
    })
}