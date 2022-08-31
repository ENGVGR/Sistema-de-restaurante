// @flow

export default class Costumer {
  name: string;

  table: number;

  status: string;

  constructor(newName: string, newTable: number, newStatus: string) {
    this.name = newName;
    this.table = newTable;
    this.status = newStatus;
  }

  GetCostumer(): Array<*> {
    return [this.name, this.table, this.status];
  }

  EditName(newName: string) {
    this.name = newName;
  }

  EditTable(newTable: number) {
    this.table = newTable;
  }

  EditStatus(newStatus: string) {
    this.status = newStatus;
  }
}
