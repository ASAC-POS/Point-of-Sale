'use strict';
class Collection {
  constructor(table) {
    this.table = table;
  }

  // start get data function
  async getData(id) {
    try {
      if (id) {
        return await this.table.findOne({ where: { id: id } });
      } else {
        return await this.table.findAll();
      }
    } catch (error) {
      //console.log(`error from getData function ${this.table}`, error);
    }
  }

  // start creat data function
  async createData(body) {
    try {
      if (body) {
        return await this.table.create(body);
      } else {
        //console.log(`You should add data in your body`);
      }
    } catch (error) {
      //console.log(`error from createData function ${this.table}`, error);
    }
  }

  // start update data function
  async updateData(id, body) {
    try {
      if (id) {
        return await this.table.update(body, { where: { id: id } });
      } else {
        //console.log(`You should add data in your body as object and id as integer`);
      }
    } catch (error) {
      //console.log(`error from updateData function ${this.table}`, error);
    }
  }

  // start delet data function
  async deleteData(id) {
    try {
      if (id) {
        return await this.table.destroy({ where: { id: id } });
      } else {
        //console.log(`You should add  id as integer`);
      }
    } catch (error) {
      //console.log(`error from deleteData function ${this.table}`, error);
    }
  }
}

module.exports = Collection;
