import { ModelCtor } from "sequelize";
import { IPreGroupDto } from "../dto";
import { IGroupMapper, IGroupInstance } from "../models/group/interfaces";
import { IGroupRepository } from "./interfaces";

class GroupRepository implements IGroupRepository {
  #GroupModel: ModelCtor<IGroupInstance>;
  #GroupMapper: IGroupMapper;
  constructor(model: ModelCtor<IGroupInstance>, mapper: IGroupMapper) {
    this.#GroupModel = model;
    this.#GroupMapper = mapper;
  }
  getOneById = (id: string) =>
    this.#GroupModel
      .findByPk(id)
      .then((group) => (group ? this.#GroupMapper(group) : undefined));

  createOne = (Group: IPreGroupDto) =>
    this.#GroupModel.create(Group).then(this.#GroupMapper);

  deleteOneById = (id: string) =>
    this.#GroupModel.findByPk(id).then((Group) => {
      if (Group) {
        Group.destroy();
        return this.#GroupMapper(Group);
      }
      return undefined;
    });

  updateOneById = (id: string, updates: Partial<IPreGroupDto>) =>
    this.#GroupModel.findByPk(id).then((group) => {
      if (group) {
        group.update(updates);
        return this.#GroupMapper(group);
      }
      return undefined;
    });

  getMany = () =>
    this.#GroupModel.findAll().then((groups) => groups.map(this.#GroupMapper));
}

export { GroupRepository };