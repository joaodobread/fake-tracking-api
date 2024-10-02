import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Index('company_id', ['companyId'], {})
@Entity('vehicles', { schema: 'vehicle_notification' })
export class Vehicle {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'company_id' })
  companyId: number;

  @Column('varchar', { name: 'vin', nullable: true, length: 300 })
  vin: string | null;

  @Column('int', {
    name: 'last_tracking_id',
    nullable: true,
    default: () => "'1'",
  })
  lastTrackingId: number | null;

  @Column('int', {
    name: 'last_fuel_level',
    nullable: true,
    default: () => "'0'",
  })
  lastFuelLevel: number | null;

  @Column('tinyint', { name: 'active', default: () => "'1'" })
  active: boolean;

  @Column('timestamp', { name: 'next_processing_date', nullable: true })
  nextProcessingDate: Date | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Company, (companies) => companies.vehicles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: Company;
}
