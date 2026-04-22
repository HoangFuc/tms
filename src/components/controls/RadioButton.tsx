import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export interface IRadioButtonProps {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = {sm: 18, md: 24} as const;

//---------------------------------------
const RadioButton = React.memo(
  ({selected, onSelect, disabled = false, size = 'md', style}: IRadioButtonProps) => {
    const dim = SIZE_MAP[size];
    const innerDim = dim * 0.5;

    //---------------------------------------
    const handlePress = React.useCallback(() => {
      if (!disabled) {
        onSelect();
      }
    }, [disabled, onSelect]);

    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        style={[{opacity: disabled ? 0.4 : 1}, style]}>
        <View
          style={[
            styles.outer,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              borderColor: selected ? colors.primary : colors.border.default,
            },
          ]}>
          {selected && (
            <View
              style={{
                width: innerDim,
                height: innerDim,
                borderRadius: innerDim / 2,
                backgroundColor: colors.primary,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

//---------------------------------------
const styles = StyleSheet.create({
  outer: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default RadioButton;
