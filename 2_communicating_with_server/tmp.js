console.log(1);

const p = new Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {resolve("foo")}, 300);
  console.log(3);
});
console.log('p: ', p);
console.log(4);
let q = p.then(res => {
  console.log(res);
  return 'bar';
});
q.then(res => console.log(res));
console.log('q: ', q);
q.then(res => console.log(res));
console.log(5);
