// @flow

/** Classe Cliente */
export default class Costumer {
  name: string;

  table: number;

  status: string;

  /**
   * Construtor da classe cliente. Utilizado para criar novos clientes.
   * @param {string} newName - Nome do cliente.
   * @param {number} newTable - Número da mesa do cliente.
   * @param {string} newStatus - Status atual do cliente. podendo ser: Aguardando atendimento, Pedido em andamento, Pedido entregue ou finalizado
   */
  constructor(newName: string, newTable: number, newStatus: string) {
    this.name = newName;
    this.table = newTable;
    this.status = newStatus;
  }

  /**
   * Retorna as informações do cliente.
   * @return {array} Retorna uma lista com o nome, número da mesa e status do cliente, respectivamente.
   */
  GetCostumer(): Array<*> {
    return [this.name, this.table, this.status];
  }

  /**
   * Altera o nome do cliente.
   * @param {string} newName - Novo nome do cliente.
   */
  EditName(newName: string) {
    this.name = newName;
  }

  /**
   * Altera o número da mesa do cliente.
   * @param {number} newTable - Novo número da mesa do cliente.
   */
  EditTable(newTable: number) {
    this.table = newTable;
  }

  /**
   * Altera o status do cliente.
   * @param {string} newStatus - Novo status do cliente.
   */
  EditStatus(newStatus: string) {
    this.status = newStatus;
  }
}
