﻿var nullProductSold = {

    Id: -1,
    ProductId: '',
    CustomerId: '',
    StoreId: '',
    Product: { Id: 0, Name: '', Price: '' },
    Customer: { Id: 0, Name: '', Address: '' },
    Store: { Id: 0, Name: '', Address: '' },
    DateSold: ''
};
function ProductSoldViewModel(data) {
    var self = this;

    self.Id = data.Id;
    self.ProductId = ko.observable(data.ProductId);
    self.CustomerId = ko.observable(data.CustomerId);
    self.StoreId = ko.observable(data.StoreId);
    self.Product = ko.observable(data.Product);
    self.Customer = ko.observable(data.Customer);
    self.Store = ko.observable(data.Store);
    self.DateSold = ko.observable(data.DateSold);

};


function ProductSoldsViewModel() {

    //Make the self as 'this' reference
    var self = this;


    self.ProductSold = ko.observable();
    self.ProductSolds = ko.observableArray();

    self.ProductList = ko.observableArray();
    self.CustomerList = ko.observableArray();
    self.StoreList = ko.observableArray();

    self.SelectedProduct = ko.observable();
    self.SelectedCustomer = ko.observable();
    self.SelectedStore = ko.observable();

    self.OrigProduct = ko.observable();
    self.OrigCustomer = ko.observable();
    self.OrigStore = ko.observable();

    init();


    self.showAddUI = function () {
        self.SelectedProduct(self.OrigProduct());
        self.SelectedCustomer(self.OrigCustomer());
        self.SelectedStore(self.OrigStore());

        self.ProductSold(new ProductSoldViewModel(nullProductSold));

        $("#createDatepicker").datepicker({ dateFormat: 'dd/mm/yy' });
    }

    self.showEditUI = function (detail) {

        self.ProductSold(detail);

        self.OrigProduct(self.SelectedProduct());
        self.OrigCustomer(self.SelectedCustomer());
        self.OrigStore(self.SelectedStore());

        var product = ko.utils.arrayFirst(self.ProductList(), function (item) {
            return item.Id == detail.ProductId;
        });
        self.SelectedProduct(product);



        var customer = ko.utils.arrayFirst(self.CustomerList(), function (item) {
            return item.Id == detail.CustomerId;
        });
        self.SelectedCustomer(customer);

        var store = ko.utils.arrayFirst(self.StoreList(), function (item) {
            return item.Id == detail.StoreId;
        });
        self.SelectedStore(store);
        $("#editDatepicker").datepicker({ dateFormat: 'dd/mm/yy' });
    };

    self.showDeleteUI = function (detail) {
        self.ProductSold(detail);
    };

    //Add New Item
    self.create = function () {

        self.ProductSold().ProductId = self.SelectedProduct().Id;
        self.ProductSold().Product = self.SelectedProduct();
        self.ProductSold().CustomerId = self.SelectedCustomer().Id;
        self.ProductSold().Customer = self.SelectedCustomer();
        self.ProductSold().StoreId = self.SelectedStore().Id;
        self.ProductSold().Store = self.SelectedStore();

        var tmpDate = self.ProductSold().DateSold();
        self.ProductSold().DateSold(changeDateFormat(tmpDate));
        alert(ko.toJSON(self.ProductSold));

        $.ajax({
            url: 'ProductSolds/AddProductSold',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(self.ProductSold),
            success: function (data) {
                self.ProductSolds.push(data);
                //self.SelectedProduct(null);
                //self.SelectedCustomer(null);
                //self.SelectedStore(null);
                self.ProductSold(new ProductSoldViewModel(nullProductSold));
            }
        }).fail(
            function (xhr, textStatus, err) {
                alert(err);
            });

    }

    // Update product details
    self.update = function () {

        self.ProductSold().ProductId = self.SelectedProduct().Id;
        self.ProductSold().Product = self.SelectedProduct();
        self.ProductSold().CustomerId = self.SelectedCustomer().Id;
        self.ProductSold().Customer = self.SelectedCustomer();
        self.ProductSold().StoreId = self.SelectedStore().Id;
        self.ProductSold().Store = self.SelectedStore();


        console.log(self.ProductSold().DateSold);
        var tmpDate = self.ProductSold().DateSold;
        self.ProductSold().DateSold = changeDateFormat(tmpDate);
        console.log(self.ProductSold().DateSold);

        $.ajax({
            url: 'ProductSolds/EditProductSold',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(self.ProductSold),
            success: function (data) {
                self.ProductSolds.removeAll();
                self.ProductSolds(data);
                self.SelectedProduct(self.OrigProduct());
                self.SelectedCustomer(self.OrigCustomer());
                self.SelectedStore(self.OrigStore());
                console.log(self.SelectedCustomer().Name);
                self.ProductSold(new ProductSoldViewModel(nullProductSold));
            }
        })
            .fail(
            function (xhr, textStatus, err) {
                alert(err);
            });
    }

    // Delete Customer details
    self.delete = function () {
        var id = self.ProductSold().Id;
        $.ajax({
            url: 'ProductSolds/DeleteProductSold/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {
                self.ProductSolds.remove(self.ProductSold());
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }



    function init() {
        $.ajax({
            url: 'ProductSolds/GetAllProductSolds',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.ProductSolds(data);
            }
        });


        $.ajax({
            url: 'Products/GetAllProducts',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.ProductList(data);
            }
        });

        $.ajax({
            url: 'Stores/GetAllStores',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.StoreList(data); //Put the response in ObservableArray
            }
        });

        $.ajax({
            url: 'Customers/GetAllCustomers',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.CustomerList(data);
            }
        });

    }

    function changeDateFormat(origDate) {
        var arr = origDate.split("/");

        var result = arr[1] + "/" + arr[0] + "/" + arr[2];

        return result;
    }
}
ko.applyBindings(new ProductSoldsViewModel());