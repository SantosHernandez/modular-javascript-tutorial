//Also a Revealing Pattern
var stats = (function(){
    var people = 0;

    //cache DOM
    var $stats = $("statusModule");
    var template = $("#stats-template").html();

    //subscribe to the event
    pubsub.subscribe("peopleChanged", setPeople); //setPeople will fire whenever people has changed


    _render();

    function _render(){
        $stats.html(Mustache.render(template, {people: people}))
    }

    function setPeople(newPeople){
        people = newPeople;
        _render();
    }

    function destroy(){
        $stats.remove();
        events.off("peopleChanged", setPeople);
    }

})();

//original
// var stats = (function(){
//     var people = 0;

//     //cache DOM
//     var $stats = $("statusModule");
//     var template = $("#stats-template").html();    

//     _render();

//     function _render(){
//         $stats.html(Mustache.render(template, {people: people}))
//     }

//     function setPeople(newPeople){
//         people = newPeople;
//         _render();
//     }

//     function destroy(){
//         $stats.remove();
//         events.off("peopleChanged", setPeople);
//     }

//     return{
//         setPeople: setPeople
//     }

// })();