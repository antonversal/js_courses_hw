describe("myBind", function(){
  var foo;
  beforeEach(function() {
    var Foo = function(){
      return {
        testFunction: function() {
          console.log(this);
        }  
      }
    };
    foo = new Foo();
  });

  it("returns function", function(){
    var func = foo.testFunction.myBind();
    expect(func instanceof Function).toBe(true);
  });

  it("calls function with attributes", function(){
    spyOn(foo, 'testFunction');
    var func = foo.testFunction.myBind();
    func(1,2,3);
    expect(foo.testFunction).toHaveBeenCalled();
    expect(foo.testFunction.calls[0].args).toEqual([1,2,3]);
  });

  it("calls function with given context", function(){
    spyOn(foo, 'testFunction');
    var Bar = function(){}
    var bar = new Bar();
    var func = foo.testFunction.myBind(bar);
    func(1,2,3);
    expect(foo.testFunction.calls[0].object instanceof Bar).toBe(true);
  });
});

describe("Person", function(){
  var person;
  beforeEach(function() {
    person = new Person({
      name: 'Jack', 
      age: '10',
      jump: function(){ return "My name is " + this.name + " and I can jump.";}})
  });

  it("creates properties from given hash", function(){
    expect(person.name).toEqual("Jack");
  })

  it("creates function from given hash", function(){
    expect(person.jump()).toEqual("My name is Jack and I can jump.");
  })
});

describe("PersonGetSet", function(){
  var person;
  beforeEach(function() {
    person = new PersonGetSet({
      name: 'Jack', 
      age: '10',
      jump: function(){ return "My name is " + this.getName() + " and I can jump.";}})
  });

  it("creates getter from given hash", function(){
    expect(person.getName()).toEqual("Jack");
  });

  it("creates getter for function from given hash", function(){
    expect(person.getJump).toBeUndefined();
  });

  it("creates setter from given hash", function(){
    person.setName("Jhon");
    expect(person.getName()).toEqual("Jhon");
  })
});

describe("$", function(){  
  it("selects all elements by selector", function(){    
    expect($("div.red")[0].outerHTML).toEqual('<div class="red"></div>')
    expect($("div.red")[1].outerHTML).toEqual('<div class="red" id="red1"></div>')
  });

  it("setting heigth", function(){
    $("div.red").height(100);
    var allDivs = document.querySelectorAll("div.red");
    expect(allDivs[0].style.height).toEqual('100px');
  }),
  it("setting width", function(){
    $("div.red").width(100);
    var allDivs = document.querySelectorAll("div.red");
    expect(allDivs[0].style.width).toEqual('100px');
  })
});