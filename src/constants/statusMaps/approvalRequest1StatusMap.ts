import {StatusMap, IBadgeDisplayProps} from './types';

export const ApprovalRequest1Status = {
  APPROVAL_PENDING:  'APPROVAL_PENDING',
  APPROVAL_REJECTED: 'APPROVAL_REJECTED',
  APPROVAL_COMPLETE: 'APPROVAL_COMPLETE',
} as const;

export type ApprovalRequest1Status = typeof ApprovalRequest1Status[keyof typeof ApprovalRequest1Status];

export const APPROVAL_REQUEST_1_STATUS_MAP: StatusMap<ApprovalRequest1Status> = {
  [ApprovalRequest1Status.APPROVAL_PENDING]:  {label: '승인대기', variant: 'pending'},
  [ApprovalRequest1Status.APPROVAL_REJECTED]: {label: '승인반려', variant: 'rejected'},
  [ApprovalRequest1Status.APPROVAL_COMPLETE]: {label: '승인완료', variant: 'active'},
};

export function resolveApprovalRequest1Status(code: ApprovalRequest1Status): IBadgeDisplayProps {
  return APPROVAL_REQUEST_1_STATUS_MAP[code];
}
