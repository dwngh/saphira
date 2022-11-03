import { Hospital } from "./hospital.entity";

describe('HospitalEntity', () => {
    it('should be defined', () => {
      expect(new Hospital()).toBeDefined();
    });
  });
  