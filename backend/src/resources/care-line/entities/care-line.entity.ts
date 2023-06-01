import { CareLine } from "@prisma/client";

export class CareLineEntity implements CareLine {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
