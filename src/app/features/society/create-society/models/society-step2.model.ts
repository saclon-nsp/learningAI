/**
 * Step 2: Building Configuration, Amenities, Lift, Water, Generator & Fire Systems
 */
export interface SocietyStep2Model {
  societyId?: string;

  // Basic Building Information
  wings: number;
  buildingName: string;
  buildingType: 'Residential' | 'Commercial' | 'Combined';

  // Ground Floor Configuration
  groundShopAvailable: 'Yes' | 'No';
  groundShopCount?: number;
  groundShopPrefix?: string;

  // Commercial Area Configuration
  commercialAvailable: 'Yes' | 'No';
  commercialStartFloor?: number;
  commercialFloors?: number;
  commercialShopsPerFloor?: number;
  commercialOfficePerFloor?: number;

  // Basement Configuration
  basementAvailable: 'Yes' | 'No';
  basementFloors?: number;
  parkingPerBasement?: number;
  storageRooms?: number;
  utilityRooms?: number;

  // Residential Floors Configuration
  residentialStartFloor: number;
  floors: number;
  flats: number;
  flatPattern: string;
  liftAvailable: 'Yes' | 'No';
  liftCount?: number;

  // Parking Allocation & Breakdown
  residentParking?: number;
  visitorParking?: number;
  twoWheelerParking?: number;
  fourWheelerParking?: number;
  evParking?: number;
  disabledParking?: number;
  parkingAllocation?: 'One Parking Per Flat' | 'Manual Allocation' | 'Lottery System' | string;

  // Society Amenities
  garden?: boolean;
  gym?: boolean;
  clubHouse?: boolean;
  swimmingPool?: boolean;
  communityHall?: boolean;
  childrenPlayArea?: boolean;
  temple?: boolean;
  library?: boolean;
  cctv?: boolean;
  fireSafety?: boolean;
  solar?: boolean;
  rainWaterHarvesting?: boolean;
  securityCabin?: boolean;
  reception?: boolean;
  intercom?: boolean;
  gasPipeline?: boolean;
  visitorManagement?: boolean;
  societyOffice?: boolean;
  garbageCollection?: boolean;
  roPlant?: boolean;

  // Lift Details
  passengerLift?: number;
  serviceLift?: number;
  liftCompany?: string;
  liftAmcDate?: string;

  // Water Tank Details
  undergroundTank?: 'Available' | 'Not Available' | string;
  overheadTank?: 'Available' | 'Not Available' | string;
  waterTankCapacity?: number;

  // DG Generator Backup Details
  generatorAvailable?: 'Yes' | 'No' | string;
  generatorCapacity?: string;
  generatorVendor?: string;
  generatorAmcDate?: string;
  generatorFuel?: 'Diesel' | 'Gas' | 'Electric' | string;

  // Fire Safety System Details
  fireSystemAvailable?: 'Yes' | 'No' | string;
  firePump?: 'Available' | 'Not Available' | string;
  fireTankCapacity?: number;
  hydrantSystem?: 'Available' | 'Not Available' | string;
  sprinklerSystem?: 'Available' | 'Not Available' | string;
  smokeDetectors?: 'Available' | 'Not Available' | string;
  fireVendor?: string;
  fireAmcDate?: string;
}
