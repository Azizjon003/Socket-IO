let socket = io();
console.log(socket);

function scroll() {
  let msg = document.querySelector("#messages").lastElementChild;
  msg.scrollIntoView({
    behavior: "smooth",
  });
}
const btn = document.querySelector("#submit-btn");
const Input = document.querySelector("#message");
socket.on("connect", function (sockett) {
  let params = window.location.search.substring(1);
  let objR = decodeURI(params)
    .replace(/&/g, '","')
    .replace(/\+/g, " ")
    .replace(/=/g, '":"');

  let obj = JSON.parse('{"' + objR + '"}');
  socket.emit("join", obj, function (err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
    }
  });
});

socket.on("updateUsers", function (users) {
  console.log(users);
  let ol = document.createElement("ol");
  users.forEach((user) => {
    let li = document.createElement("li");
    li.innerHTML = user;
    ol.appendChild(li);
  });

  let UserList = document.querySelector("#users");
  UserList.innerHTML = "";
  UserList.appendChild(ol);
});
socket.on("yaratilganUser", function (message) {
  const template = document.querySelector("#message-template").innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: message.createdAt,
  });
  let div = document.createElement("div");

  div.innerHTML = html;
  // const li = document.createElement("li");
  // li.innerText = `${message.from}: ${message.createdAt} : ${message.text}`;

  document.querySelector("#messages").append(div);
  scroll();
});
btn.addEventListener("click", function (e) {
  e.preventDefault();
  socket.emit("yangiUser", {
    from: "User",
    text: Input.value,
  });
  Input.value = "";
});
