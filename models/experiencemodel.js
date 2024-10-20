export default class Experience {
  constructor(_id, owner, description, participants = []) {
    this._id = _id;
    this.owner = owner; // Este será un objeto que contiene el id y nombre del propietario
    this.description = description;
    this.participants = participants; // Array de objetos que contienen los ids y nombres de los participantes
  }

  // Puedes agregar métodos adicionales si es necesario
  getOwnerName() {
    return this.owner.name;
  }

  getParticipantNames() {
    return this.participants.map((participant) => participant.name).join(", ");
  }
}
