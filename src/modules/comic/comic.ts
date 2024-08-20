import { Entity, OneToOne } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";

@Entity()
export class Comic extends CommonEntity{
}