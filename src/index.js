module.exports = function check(str, bracketsConfig) {

  const stack = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let elm = getInfo(char, bracketsConfig);
    let opened = stack.filter(x => x.type === elm.type && x.mode === 1);
    let closed = stack.filter(x => x.type === elm.type && x.mode === 2);
    let universal = stack.filter(x => x.type === elm.type && x.mode === 3);
    if (stack.length === 0 && elm.mode === 2) return false;
    //console.log(stack);
    let last = stack[stack.length - 1];
    if (elm.mode === 2) {
      if (closed.length >= opened.length) return false;
      if (last.mode === 1 && elm.mode === 2 && last.type !== elm.type) return false;
    }
    stack.push(elm);
    if (i === str.length - 1){
      if(stack.length % 2 === 1) return false;
      let universal = stack.filter(x => x.type === elm.type && x.mode === 3);
      if(universal % 2 === 1) return false;
    }
  }
  return true;
}

function getInfo(char, bracketsConfig) {
  const openBrackets = bracketsConfig.map(x => x[0]);
  const closedBrackets = bracketsConfig.map(x => x[1]);
  let mode = 1;
  if (openBrackets.indexOf(char) > -1) {
    mode = 1;
    if (closedBrackets.indexOf(char) > -1) {
      mode = 3;
    }
  } else {
    mode = 2;
  }
  let type = mode === 1 || mode === 3 ? openBrackets.indexOf(char) : closedBrackets.indexOf(char);
  return {
    type: type,
    mode: mode
  }
}