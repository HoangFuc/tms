import {StatusMap, IBadgeDisplayProps} from './types';

export const OriginalTaxStatus = {
  ISSUE_PENDING:    'ISSUE_PENDING',
  ISSUE_COMPLETE:   'ISSUE_COMPLETE',
  CORRECT_PENDING:  'CORRECT_PENDING',
  CORRECT_COMPLETE: 'CORRECT_COMPLETE',
  ISSUE_FAILED:     'ISSUE_FAILED',
} as const;

export type OriginalTaxStatus = typeof OriginalTaxStatus[keyof typeof OriginalTaxStatus];

export const ORIGINAL_TAX_STATUS_MAP: StatusMap<OriginalTaxStatus> = {
  [OriginalTaxStatus.ISSUE_PENDING]:    {label: '발행대기', variant: 'pending'},
  [OriginalTaxStatus.ISSUE_COMPLETE]:   {label: '발행완료', variant: 'active'},
  [OriginalTaxStatus.CORRECT_PENDING]:  {label: '정정대기', variant: 'pending'},
  [OriginalTaxStatus.CORRECT_COMPLETE]: {label: '정정완료', variant: 'active'},
  [OriginalTaxStatus.ISSUE_FAILED]:     {label: '발행실패', variant: 'rejected'},
};

export function resolveOriginalTaxStatus(code: OriginalTaxStatus): IBadgeDisplayProps {
  return ORIGINAL_TAX_STATUS_MAP[code];
}
