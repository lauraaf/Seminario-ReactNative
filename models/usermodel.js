export default class User {
  constructor(id, name, mail, password, comment, experiencies = []) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.comment = comment;
    this.experiencies = experiencies;
  }

  // Puedes agregar métodos aquí para manejar la lógica relacionada con los usuarios
  getFullName() {
    return this.name;
  }

  getEmail() {
    return this.mail;
  }
}
