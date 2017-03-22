//Ground Rules
//- self-contained module
//  - everything to do with my module is in my module
//  - no global variables
//  - if a module manages more than one thing it should be split up
//- separation of concerns
//-DRY code: Don't Repeat Yourself
//  - very few $(selections)
//- no memory leaks
//  - all events can be unbound

//Object Literal Pattern - makes code as an object with properties and methods
//Modular Code
(function(){ //module code is wrapped in an anonymous function to avoid global variables
    var people = {
        people: ['Will', 'Steve'],
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function() {
            this.$el = $('#peopleModule');
            this.$button = this.$el.find('button');
            this.$input = this.$el.find('input');
            this.$ul = this.$el.find('ul');
            this.template = this.$el.find('#people-template').html();
        },
        bindEvents: function() {
            this.$button.on('click', this.addPerson.bind(this));
            this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
        },
        render: function() {
        var data = {
            people: this.people,
        };
        this.$ul.html(Mustache.render(this.template, data));
        },
        addPerson: function() {
            this.people.push(this.$input.val());
            this.render();
            this.$input.val('');
        },
        deletePerson: function(event) {
            var $remove = $(event.target).closest('li');
            var i = this.$ul.find('li').index($remove);

            this.people.splice(i, 1);
            this.render();
        }

    };

    people.init();
})()
// spaghetti code

// var people = [];
// var template = $('#people-template').html();

// $('#peopleModule').find('button').on('click', function(){
// 	people.push($('#peopleModule').find('input').val());
// 	$('#peopleModule').find('input').val('');
// 	//data for mustache template
// 	var data = {
// 		people:people,
// 	};
// 	$('#peopleModule').find('ul').html(Mustache.render(template,data));
// });

// $('#peopleModule').find('ul').delegate('i.del','click', function(e){
// 	var $remove = $(e.target).closest('li');
// 	var i = $('#peopleModule').find('ul').find('li').index($remove);

// 	$remove.remove();

// 	people.splice(i,1);
// });
