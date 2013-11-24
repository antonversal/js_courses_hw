// #1
if (typeof Function.prototype.myBind === 'undefined') {
  Function.prototype.myBind = function (context){
    var self = this;
    return function(){
      self.apply(context, arguments);
    };
  };
}

// #2
var Person = function(args){
  var item;
  for(item in args) this[item] = args[item];
};

// #3
var PersonGetSet = function(args){
  var item;
  var self = this;
  var properties = {};

  var camelcase = function(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  for(item in args) {
    if (typeof args[item] === "function") {
      this[item] = args[item];
    }
    else 
    {
      properties[item] = args[item];

      var camleItem = camelcase(item),
          getterName = "get" + camleItem,
          setterName = "set" + camleItem;    

        (function(item){                
          self[getterName] = function(){ return properties[item] };   
          self[setterName] = function(val){ properties[item] = val };
        })(item);      
    }
  };
};

//#4

var $ = function(selector){
  var setStyle = function(prop, elements){
    return function (val) {
      for (var i = 0; i < elements.length; ++i) {
        var element = elements[i]; 
        element.style[prop] = val + 'px';  
        };    
      };
  };

  var elements = document.querySelectorAll(selector);
  elements.height = setStyle("height", elements);
  elements.width = setStyle("width", elements);
  return elements;
}