class User {
  constructor() {
    this.User = [];
  }
  addUser(id, name, room) {
    let user = {
      id,
      name,
      room,
    };
    this.User.push(user);
    return user;
  }
  getUserList(room) {
    let users = this.User.filter((user) => user.room === room);

    let nameArray = users.map((user) => user.name);

    return nameArray;
  }
  getUser(id) {
    return this.User.filter((user) => user.id === id)[0];
  }
  removeUser(id) {
    let user = this.getUser(id);
    if (user) {
      this.User = this.User.filter((user) => user.id !== id);
    }
    return user;
  }
}

module.exports = User;
