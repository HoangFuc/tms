import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';

import {colors} from '../../theme/colors';
import BaseInput from './BaseInput';

//---------------------------------------
export interface IValidationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  timer: number;
  isVerified: boolean;
  error?: string;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

//---------------------------------------
const formatTimer = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

//---------------------------------------
const ValidationInput = React.memo(
  ({
    value,
    onChangeText,
    timer,
    isVerified,
    error,
    placeholder,
    containerStyle,
  }: IValidationInputProps) => {
    const rightAccessory = isVerified ? (
      <Text style={styles.checkmark}>✓</Text>
    ) : (
      <Text style={[styles.timer, error ? styles.timerError : null]}>
        {formatTimer(timer)}
      </Text>
    );

    return (
      <BaseInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? '인증코드를 입력하세요'}
        error={error}
        rightAccessory={rightAccessory}
        overrideBorderColor={isVerified ? colors.border.verified : undefined}
        containerStyle={containerStyle}
        keyboardType="number-pad"
      />
    );
  },
);

//---------------------------------------
const styles = StyleSheet.create({
  checkmark: {
    fontSize: 16,
    color: colors.text.verified,
    fontWeight: '600',
  },
  timer: {
    fontSize: 14,
    color: colors.text.timer,
    fontWeight: '500',
  },
  timerError: {
    color: colors.text.timerError,
  },
});

export default ValidationInput;
