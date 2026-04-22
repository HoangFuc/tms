import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {BadgeVariant, BADGE_VARIANT_STYLES} from '../../constants/statusMaps/types';

export interface IBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Badge = React.memo(
  ({
    label,
    variant = 'neutral',
    size = 'md',
    containerStyle,
    textStyle,
  }: IBadgeProps) => {
    const variantStyle = BADGE_VARIANT_STYLES[variant];

    return (
      <View
        style={[
          styles.base,
          size === 'sm' ? styles.sizeSm : styles.sizeMd,
          {backgroundColor: variantStyle.backgroundColor},
          containerStyle,
        ]}>
        <Text
          style={[
            styles.text,
            size === 'sm' ? styles.textSm : styles.textMd,
            {color: variantStyle.textColor},
            textStyle,
          ]}
          numberOfLines={1}>
          {label}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeMd: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  sizeSm: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    fontWeight: '500',
  },
  textMd: {
    fontSize: 13,
  },
  textSm: {
    fontSize: 11,
  },
});

export default Badge;
