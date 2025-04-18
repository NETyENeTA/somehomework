var $ = function (id) {
  return document.getElementById(id);
};

function capitalizeFirstLetter(line) {
    return String(line).charAt(0).toUpperCase() + String(line).slice(1);
}


////


var users;

const userTable = $("user-template");
const userList = $("user-list");
userTable.removeAttribute("id");
userTable.remove();

const msgTable = $("msg-template");
msgTable.removeAttribute("id");
const msgList = $("msg-list");
msgTable.remove();


////


fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {

    json = json.map((user) => {
        return {name: capitalizeFirstLetter(user.name), email: user.email, address: user.address}
    })

    users = json.map((user) => {
      return user.name;
    });

    json.forEach((user) => {
      userTable.children[1].textContent = user.name;
      userTable.children[3].textContent = user.email;
      userTable.children[5].children[0].textContent = user.address.city;
      userTable.children[5].children[1].textContent = user.address.street;
      userTable.children[5].children[2].textContent = user.address.suite;
      userList.append(userTable.cloneNode(true));
    });

    return fetch("https://jsonplaceholder.typicode.com/posts");
  })
  .then((response) => response.json())
  .then((json) => {
    json.forEach((msg) => {
      let name = users[msg.userId - 1];
      msgTable.children[0].textContent = capitalizeFirstLetter(msg.title);
      msgTable.children[1].textContent = capitalizeFirstLetter(msg.body);
      msgTable.children[2].textContent = (name ?? "[NotFound]");
      msgList.append(msgTable.cloneNode(true));
    });
  });
