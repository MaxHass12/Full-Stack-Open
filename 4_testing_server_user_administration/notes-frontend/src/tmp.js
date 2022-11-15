function foo(items) {
  for(let i = 0; i < items.length; i++) {
    if (items[i].length === 0) {
      items.splice(i, 1)
    }
  }
}

var names = ['r', '', 'm', '', 't']
foo(names)
console.log(names)