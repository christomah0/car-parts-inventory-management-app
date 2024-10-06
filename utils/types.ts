export type CarType = {
  idCar?: number;
  brandCar: string;
  modelCar: string;
};

export type PartType = {
  imagePath: string;
  registrationNumber: string;
  name: string;
  partCount: number;
  createdAt: string;
  updatedAt: string;
  idPartCar: number;
};

export type fullPartType = {
  imagePath: string;
  registrationNumber: string;
  name: string;
  partCount: number;
  createdAt: string;
  updatedAt: string;
  idPartCar: number;
  brandCar?: string;
  modelCar?: string;
};