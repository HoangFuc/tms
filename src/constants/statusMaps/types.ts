import {colors} from '../../theme/colors';

export type BadgeVariant = 'neutral' | 'pending' | 'active' | 'rejected';

export interface IBadgeVariantStyle {
  backgroundColor: string;
  textColor: string;
}

export const BADGE_VARIANT_STYLES: Record<BadgeVariant, IBadgeVariantStyle> = {
  neutral:  {backgroundColor: colors.badge.neutral.background,  textColor: colors.badge.neutral.text},
  pending:  {backgroundColor: colors.badge.pending.background,  textColor: colors.badge.pending.text},
  active:   {backgroundColor: colors.badge.active.background,   textColor: colors.badge.active.text},
  rejected: {backgroundColor: colors.badge.rejected.background, textColor: colors.badge.rejected.text},
};

export interface IBadgeDisplayProps {
  label: string;
  variant: BadgeVariant;
}

export type StatusMap<T extends string | number> = Record<T, IBadgeDisplayProps>;

export function safeResolve<T extends string | number>(
  map: StatusMap<T>,
  code: unknown,
  fallback: IBadgeDisplayProps = {label: String(code), variant: 'neutral'},
): IBadgeDisplayProps {
  return (map as Record<string | number, IBadgeDisplayProps>)[code as T] ?? fallback;
}
