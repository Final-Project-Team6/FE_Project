export const complaintStatusParams = {
  SUBMITTED: '접수',
  PROCESSING: '처리중',
  INVESTIGATING: '조사중',
  COMPLETED: '처리완료',
}

export type complaintStatusParamKeys = keyof typeof complaintStatusParams
