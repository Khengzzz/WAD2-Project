const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('abcd');
console.log(myParam)