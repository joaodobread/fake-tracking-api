import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('companies', { schema: 'vehicle_notification' })
export class Company {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'company_ref' })
  companyRef: number;

  @Column('varchar', { name: 'callback_url', nullable: true, length: 1024 })
  callbackUrl: string | null;

  @Column('varchar', { name: 'username', length: 300 })
  username: string;

  @Column('varchar', { name: 'password', length: 300 })
  password: string;

  @Column('tinyint', { name: 'active', default: () => "'1'" })
  active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Vehicle, (vehicles) => vehicles.company)
  vehicles: Vehicle[];
}
