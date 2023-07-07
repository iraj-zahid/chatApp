const INCREMENT = "increment";

function increment(data) {
  return {
    type: "increment",
    payload: data,
  };
}

function incrementByAmount(data) {
  return {
    type: "incrementByAmount",
    payload: data,
  };
}
function changingOfTheme(data) {
  return {
    type: "changingOfTheme",
    payload: data,
  };
}
function moreLess(data) {
  return {
    type: "moreLess",
    payload: data,
  };
}
export { increment, incrementByAmount, changingOfTheme, moreLess };