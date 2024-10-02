import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tracking", { schema: "vehicle_notification" })
export class Tracking {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "type", nullable: true, length: 1024 })
  type: string | null;

  @Column("varchar", { name: "geometry_type", nullable: true, length: 1024 })
  geometryType: string | null;

  @Column("double", { name: "longitude", nullable: true, precision: 22 })
  longitude: number | null;

  @Column("double", { name: "latitude", nullable: true, precision: 22 })
  latitude: number | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
