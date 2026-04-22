import {StatusMap, IBadgeDisplayProps} from './types';

export const ApprovalRequest2Status = {
  TRANSMITTED:       'TRANSMITTED',
  REJECTED:          'REJECTED',
  APPROVAL_COMPLETE: 'APPROVAL_COMPLETE',
} as const;

export type ApprovalRequest2Status = typeof ApprovalRequest2Status[keyof typeof ApprovalRequest2Status];

export const APPROVAL_REQUEST_2_STATUS_MAP: StatusMap<ApprovalRequest2Status> = {
  [ApprovalRequest2Status.TRANSMITTED]:       {label: '전송됨',    variant: 'pending'},
  [ApprovalRequest2Status.REJECTED]:          {label: '반려됨',    variant: 'rejected'},
  [ApprovalRequest2Status.APPROVAL_COMPLETE]: {label: '승인완료됨', variant: 'active'},
};

export function resolveApprovalRequest2Status(code: ApprovalRequest2Status): IBadgeDisplayProps {
  return APPROVAL_REQUEST_2_STATUS_MAP[code];
}
