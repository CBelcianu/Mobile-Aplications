import { Entity } from './enitity';
import { LocalService } from './local.service';
import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private entities: Entity[];

  constructor(
    private networkService: NetworkService,
    private localSerice: LocalService
  ) { }

  async fetchAllEntities() {
    this.entities = await this.networkService.getEntities();
    if (this.entities == null) {
      this.entities = [];
    }
    // this.localSerice.setEntities(this.entities); // this is used to persist data locally! Remove if not needed!
    return this.entities;
  }

  getAllEntities() {
    return this.entities;
  }

  getEntity(entityId: number): Entity {
    return this.entities.find(song => {
      return song.id === entityId;
    });
  }

  async create(entity: Entity) {
    const response = await this.networkService.postEntity(entity);
    if (response == null) {
      this.entities = [];
    }
    entity.id = Number(response["id"]);
    this.entities.push(entity);
    // this.localSerice.setEntities(this.entities); // this is used to persist data locally! Remove if not needed!
  }

  async update(newEntity: Entity) {
    let position = 0;
    this.entities.forEach(ent => {
      if (ent.id === newEntity.id) {
        return;
      }
      position += 1;
    });
    await this.networkService.putEntity(newEntity.id, newEntity);
    this.entities[position] = newEntity;
    // this.localSerice.setEntities(this.entities); // this is used to persist data locally! Remove if not needed!
  }

  async delete(entityId: number) {
    this.entities = this.entities.filter(ent => {
      return ent.id !== entityId;
    });
    await this.networkService.deleteEntity(entityId);
    let position = 0;
    this.entities.forEach(ent => {
      if (ent.id === entityId) {
        this.entities.splice(position, 1);
      }
      position += 1;
    });
    // this.localSerice.setEntities(this.entities); // this is used to persist data locally! Remove if not needed!
  }
}
