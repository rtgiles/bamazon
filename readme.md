# Bamazon

## Description

This application implements a simple command line based storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together with the npm [mysql](https://www.npmjs.com/package/mysql) package. The application presents two interfaces: **customer** and **manager**.
## Requirements

This applications requires the installaNodeJS and the MySql database package.

## Installation

Create the the database schema useintig the bamazondb.sql file. To insure all node modules are installed run 'npm init' in the directory where the bamazon files are stored.

### Customer Interface

The customer interface allows the user to view the current inventory items: item IDs, descriptions, and department. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface enter the following in the command shell:

	
	node bamazonCustomer.js