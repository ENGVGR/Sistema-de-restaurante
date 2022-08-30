export default class Costumer {
  constructor(name, table, status) {
    this.name = name;
    this.table = table;
    this.status = status;
  }

  GetCostumer() {
    return [this.name, this.table, this.status];
  }
}
