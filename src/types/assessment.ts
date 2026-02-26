export interface TPIAssessment {
  id: string;
  date: string;
  verticalJump: number | null; // inches
  seatedTrunkRotationL: number | null; // degrees
  seatedTrunkRotationR: number | null;
  singleLegBalanceL: number | null; // seconds
  singleLegBalanceR: number | null;
  toeTouch: "pass" | "fail" | null;
  deepSquat: 1 | 2 | 3 | null; // 1=poor, 2=fair, 3=good
  hipInternalRotationL: number | null; // degrees
  hipInternalRotationR: number | null;
  hipExternalRotationL: number | null;
  hipExternalRotationR: number | null;
  thoracicRotationL: number | null; // degrees
  thoracicRotationR: number | null;
}

export type TPIField = keyof Omit<TPIAssessment, "id" | "date">;
