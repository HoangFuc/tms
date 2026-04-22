import {StatusMap, IBadgeDisplayProps} from './types';

export const InquiryStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE:    'COMPLETE',
} as const;

export type InquiryStatus = typeof InquiryStatus[keyof typeof InquiryStatus];

export const INQUIRY_STATUS_MAP: StatusMap<InquiryStatus> = {
  [InquiryStatus.IN_PROGRESS]: {label: '처리중', variant: 'pending'},
  [InquiryStatus.COMPLETE]:    {label: '완료',   variant: 'active'},
};

export function resolveInquiryStatus(code: InquiryStatus): IBadgeDisplayProps {
  return INQUIRY_STATUS_MAP[code];
}
