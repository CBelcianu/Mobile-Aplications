import { Entity } from './enitity';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() { }

  async add(entity: Entity) {
    const resp = await Storage.get({ key: 'entities' });
    let entityList;
    if (resp.value == null) {
      entityList = [];
    } else {
      entityList = JSON.parse(resp.value) as [];
    }
    entityList.push(entity);
    this.setEntities(entityList);
  }

  setEntities(entities: Entity[]) {
    Storage.set({
      key: 'eintities',
      value: JSON.stringify(entities)
    });
  }

  async getEntities() {
    const r = await Storage.get({ key: 'entities' });
    return JSON.parse(r.value);
  }
}
