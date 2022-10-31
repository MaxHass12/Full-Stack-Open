const foo = () => {
  console.log(this);
}

// function foo() {
//   console.log(this);
// }

const obj = {a: 1};

obj.f = foo;
obj.f();

