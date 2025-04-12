var $ = function (id) {
  return document.getElementById(id);
};

const msgTable = $("msg-template");
msgTable.removeAttribute("id");
const msgList = $("msg-list");
msgTable.remove();

const userTable = $("user-template");
const userList = $("user-list");
userTable.removeAttribute("id");
userTable.remove();

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((msg) => {
      msgTable.children[0].textContent = msg.title;
      msgTable.children[1].textContent = msg.body;
      msgList.append(msgTable.cloneNode(true));
    });
  });

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);

    json.forEach((user) => {
      userTable.children[1].textContent = user.name;
      userTable.children[3].textContent = user.email;
      userTable.children[5].children[0].textContent = user.address.city;
      userTable.children[5].children[1].textContent = user.address.street;
      userTable.children[5].children[2].textContent = user.address.suite;
      userList.append(userTable.cloneNode(true));
    });
  });
