import { SocietyStep1Model, SocietyStep1Files } from './society-step1.model';
import { SocietyStep2Model } from './society-step2.model';
import { SocietyStep3Model, SocietyStep3Files } from './society-step3.model';
import { SocietyStep4Model, SocietyStep4Files } from './society-step4.model';

export interface StepSaveResponse {
  success: boolean;
  message: string;
  societyId?: string;
  stepCompleted?: number;
  data?: any;
}

export interface FullSocietyDataModel extends 
  SocietyStep1Model, 
  SocietyStep2Model, 
  SocietyStep3Model, 
  SocietyStep4Model {}
