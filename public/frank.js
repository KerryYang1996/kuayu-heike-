// // CORS 方法进行跨域
// const request = new XMLHttpRequest();
// request.open("GET", "http://qq.com:8888/friends.json");
// request.onreadystatechange = () => {
//   if (request.readyState === 4 && request.status === 200) {
//     console.log(request.response);
//   }
// };
// request.send();

// JSONP方法进行跨域，对JSONP进行封装
function JSONP(url) {
  return new Promise((resolve, reject) => {
    const random = "frankJSONPCallbackName" + Math.random();
    window[random] = (data) => {
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}?functionName=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}
JSONP("http://qq.com:8888/friends.js").then((data) => {
  console.log(data);
});
