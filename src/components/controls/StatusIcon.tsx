import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {CloseCircle, TickCircle} from 'iconsax-react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export type StatusIconVariant = 'accepted' | 'rejected';

export interface IStatusIconProps {
  variant: StatusIconVariant;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

//---------------------------------------
const StatusIcon = React.memo(({variant, size = 32, style}: IStatusIconProps) => {
  if (variant === 'accepted') {
    return <TickCircle size={size} color={colors.status.accepted} variant="Bold" style={style} />;
  }
  return <CloseCircle size={size} color={colors.status.rejected} variant="Bold" style={style} />;
});

export default StatusIcon;
