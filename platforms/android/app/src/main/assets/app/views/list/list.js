
//test

var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var groceryList = new GroceryListViewModel([]);

// var pageData = new observableModule.fromObject({
//     groceryList: new ObservableArray([
//         { name: "eggs" },
//         { name: "bread" },
//         { name: "cereal" }
//     ])
// });

// var pageData = new observableModule.fromObject({
//     groceryList: groceryList
// });
var pageData = new observableModule.fromObject({
    groceryList: groceryList,
    grocery: ""
});

// exports.loaded = function(args) {
//     page = args.object;
//     page.bindingContext = pageData;
// };
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    groceryList.empty();
    // groceryList.load();
    pageData.set("isLoading", true);
    groceryList.load().then(function() {
        pageData.set("isLoading", false);
    });
};

exports.add = function() {
    // Check for empty submissions
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }

    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function() {
            dialogsModule.alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
        });

    // Empty the input field
    pageData.set("grocery", "");
};