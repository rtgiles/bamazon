// Required Node Modules
var inquirer = require('inquirer');
var mysql = require('mysql');

// MySQL 
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazondb'
});

// Validate user input
function validInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a valid number.';
	}
}

// Function to prompt for the item/quantity 
function promptUserPurchase() {
	
		inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID number -> ',
			validate: validInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'Please enter quantity -> ',
			validate: validInput,
			filter: Number
		}
	]).then(function(input) {
		

		var item = input.item_id;
		var quantity = input.quantity;

		// Query database
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

				if (data.length === 0) {
					console.log('ERROR: Item ID not found. Please try another Item ID.');
					displayInventory();

				} else {
					var productData = data[0];

					
					// If the quantity requested by the user is in stock
					if (quantity <= productData.stock_quantity) {
						console.log('The product requested is in stock!');
						var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
						
						// Update inventory
						connection.query(updateQueryStr, function(err, data) {
							if (err) throw err;

							console.log('Your order has been placed! Your total is $' + productData.price * quantity);
							console.log('Thank you for shopping with us!');
							console.log("\n---------------------------------------------------------------------\n");
							connection.end();
						})
					} else {
						console.log('Sorry, your order can not be placed at this time.');
						console.log('Please modify your order.');
						console.log("\n---------------------------------------------------------------------\n");

						displayInventory();
					}
			}
		})
	})
}

// Display Inventory 
function inventory() {
	
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Current Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  ||  ';
			strOut += 'Product Name: ' + data[i].product_name + '  ||  ';
			strOut += 'Department: ' + data[i].department_name + '  ||  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity 
	  	promptUserPurchase();
	})
}

// runBamazon 
function runBamazon() {
	// Display  inventory
	inventory();
}

// Run the application logic
runBamazon();