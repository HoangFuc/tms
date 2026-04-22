import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import {TickSquare} from 'iconsax-react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export interface ICheckboxProps {
  checked: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = {sm: 18, md: 24} as const;

//---------------------------------------
const Checkbox = React.memo(
  ({checked, onToggle, disabled = false, size = 'md', style}: ICheckboxProps) => {
    const dim = SIZE_MAP[size];

    //---------------------------------------
    const handlePress = React.useCallback(() => {
      if (!disabled) {
        onToggle(!checked);
      }
    }, [checked, disabled, onToggle]);

    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        style={[{opacity: disabled ? 0.4 : 1}, style]}>
        {checked ? (
          <TickSquare size={dim} color={colors.primary} variant="Bold" />
        ) : (
          <View
            style={[
              styles.unchecked,
              {width: dim, height: dim, borderRadius: dim * 0.2},
            ]}
          />
        )}
      </TouchableOpacity>
    );
  },
);

//---------------------------------------
const styles = StyleSheet.create({
  unchecked: {
    borderWidth: 1.5,
    borderColor: colors.border.default,
    backgroundColor: colors.white,
  },
});

export default Checkbox;
