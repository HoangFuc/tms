import {StatusMap, IBadgeDisplayProps} from './types';

export const ReceiptStatus = {
  REVISION_REQUESTED: 'REVISION_REQUESTED',
  REVIEW_PENDING:     'REVIEW_PENDING',
  REVISION_REJECTED:  'REVISION_REJECTED',
  REVISION_COMPLETE:  'REVISION_COMPLETE',
  CONFIRMED:          'CONFIRMED',
} as const;

export type ReceiptStatus = typeof ReceiptStatus[keyof typeof ReceiptStatus];

export const RECEIPT_STATUS_MAP: StatusMap<ReceiptStatus> = {
  [ReceiptStatus.REVISION_REQUESTED]: {label: '수정요청', variant: 'pending'},
  [ReceiptStatus.REVIEW_PENDING]:     {label: '검토대기', variant: 'pending'},
  [ReceiptStatus.REVISION_REJECTED]:  {label: '수정반려', variant: 'rejected'},
  [ReceiptStatus.REVISION_COMPLETE]:  {label: '수정완료', variant: 'active'},
  [ReceiptStatus.CONFIRMED]:          {label: '확인완료', variant: 'active'},
};

export function resolveReceiptStatus(code: ReceiptStatus): IBadgeDisplayProps {
  return RECEIPT_STATUS_MAP[code];
}
