//Revealing Module Pattern
//The revealing module pattern allows us to create 
//private variables in a Javascript Module.
//Instead of being an object, it is a self executing anonymous function.
//The parenthesis makes javascript evaluate the function.
//The empty parenthesis at the end turns the function into self-executable.
//Best Practice: use underscore on a name to indicate it is private.


// We write a revealing module pattern by starting with a self-executing 
//anonymous function also known as an IIFE (immediately invoked function expression).

// This runs a function and sets it's return value as our module's value. 
//If we return an object of methods, then those methods are what other modules 
//have "public" access to. What's nice about this, is we can create any variables 
// within the function and no other modules have access to them unless we expose 
// them via our return object.

var people = (function(){
    var people = ['Will', 'Steve'];

    //cache DOM
    var $el = $('#peopleModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#people-template').html();

    //bind events
    $button.on('click', addPerson);
    $ul.delegate('i.del', 'click', deletePerson);

    _render();

    function _render() {
       $ul.html(Mustache.render(template, {people: people}));
    }

    function addPerson(value) {
        var name = (typeof value === "string") ? value : $input.val();
        people.push(name);
        _render();
        $input.val('');
    }

    function deletePerson(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            i = $ul.find('li').index($remove);
        }
        people.splice(i, 1);
        _render();
    }

    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    };

})();

//people.addPerson("Jake");
//people.deletePerson(0);