//events (publish subscribe) pattern

//Tipically the methods are as below
//pubsub
//pubsub.subscribe = on
//pubsub.unsubscribe = off
//pubsub.publish = emit (like angular) or trigger
//to try, use on to add events and emit to execute them
// events.on("activate", function(data){
//     alert(data);
// });
// events.on("activate", function(data){
//     console.log(data);
// });

// events.emit("activate", 3);

// events.on("people", someHandler); will fire on any event from the people module
// events.on("people.change", someChangeHandler); will fire on any people.change event from the people module
// events.on("people.change.first", someFirstChangeHandler); will fire on any people.change.first event from the people module

var events = {

  events: {}, //list of events available introduced by the on method
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },

  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }

};