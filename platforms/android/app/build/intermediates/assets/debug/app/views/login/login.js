
var page;
var email;
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var dialogsModule = require("ui/dialogs");

// var observableModule = require("data/observable");

// var user = new observableModule.fromObject({
//     email: "user@domain.com",
//     password: "password"
// });

var user = new UserViewModel();


// exports.loaded = function() {
//     console.log("hello");
// };
// exports.loaded = function(args) {
//     page = args.object;
// };
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = user;
};

// exports.signIn = function() {
//     alert("Signing in");
// };
// exports.signIn = function() {
//     email = page.getViewById("email");
//     console.log(email.text);
// };
// exports.signIn = function() {
//     user.login();
// };
exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
        });
};

// exports.register = function() {
//     alert("Registering");
// };

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};