import {StatusMap, IBadgeDisplayProps} from './types';

export const CorrectedTaxStatus = {
  CONSIGNOR_PENDING: 'CONSIGNOR_PENDING',
  NTS_PENDING:       'NTS_PENDING',
  ISSUE_COMPLETE:    'ISSUE_COMPLETE',
  ISSUE_FAILED:      'ISSUE_FAILED',
} as const;

export type CorrectedTaxStatus = typeof CorrectedTaxStatus[keyof typeof CorrectedTaxStatus];

export const CORRECTED_TAX_STATUS_MAP: StatusMap<CorrectedTaxStatus> = {
  [CorrectedTaxStatus.CONSIGNOR_PENDING]: {label: '위탁자 대기', variant: 'pending'},
  [CorrectedTaxStatus.NTS_PENDING]:       {label: '국세청 대기', variant: 'pending'},
  [CorrectedTaxStatus.ISSUE_COMPLETE]:    {label: '발행완료',    variant: 'active'},
  [CorrectedTaxStatus.ISSUE_FAILED]:      {label: '발행실패',    variant: 'rejected'},
};

export function resolveCorrectedTaxStatus(code: CorrectedTaxStatus): IBadgeDisplayProps {
  return CORRECTED_TAX_STATUS_MAP[code];
}
