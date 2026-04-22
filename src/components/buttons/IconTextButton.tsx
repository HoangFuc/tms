import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
type IconSource =
  | {type: 'image'; source: ImageSourcePropType}
  | {type: 'component'; Icon: React.ComponentType<{size: number; color: string}>};

export interface IIconTextButtonProps {
  label: string;
  onPress: () => void;
  icon: IconSource;
  size?: 'sm' | 'md';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SIZE_CONFIG = {
  sm: {iconSize: 24, fontSize: 13, gap: 6, paddingH: 10, paddingV: 6},
  md: {iconSize: 32, fontSize: 15, gap: 8, paddingH: 14, paddingV: 8},
} as const;

//---------------------------------------
const IconTextButton = React.memo(
  ({label, onPress, icon, size = 'md', disabled = false, style}: IIconTextButtonProps) => {
    const cfg = SIZE_CONFIG[size];

    //---------------------------------------
    const handlePress = React.useCallback(() => {
      if (!disabled) {
        onPress();
      }
    }, [disabled, onPress]);

    //---------------------------------------
    const renderIcon = React.useCallback(() => {
      if (icon.type === 'image') {
        return (
          <Image
            source={icon.source}
            style={{width: cfg.iconSize, height: cfg.iconSize, borderRadius: cfg.iconSize / 2}}
            resizeMode="cover"
          />
        );
      }
      return <icon.Icon size={cfg.iconSize} color={colors.text.primary} />;
    }, [cfg.iconSize, icon]);

    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          {gap: cfg.gap, paddingHorizontal: cfg.paddingH, paddingVertical: cfg.paddingV},
          disabled && styles.disabled,
          style,
        ]}>
        {renderIcon()}
        <Text style={[styles.label, {fontSize: cfg.fontSize}]}>{label}</Text>
      </TouchableOpacity>
    );
  },
);

//---------------------------------------
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default IconTextButton;
