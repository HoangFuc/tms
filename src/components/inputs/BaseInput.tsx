import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export interface IBaseInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  required?: boolean;
  error?: string;
  rightAccessory?: React.ReactNode;
  overrideBorderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

//---------------------------------------
const BaseInput = React.memo(
  ({
    label,
    required,
    error,
    rightAccessory,
    overrideBorderColor,
    containerStyle,
    onFocus,
    onBlur,
    ...rest
  }: IBaseInputProps) => {
    const [isFocused, setIsFocused] = React.useState(false);

    //---------------------------------------
    const borderColor =
      overrideBorderColor ??
      (error
        ? colors.border.error
        : isFocused
        ? colors.border.focused
        : colors.border.default);

    //---------------------------------------
    const handleFocus = React.useCallback(
      (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    //---------------------------------------
    const handleBlur = React.useCallback(
      (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <View style={styles.labelRow}>
            <Text style={styles.label}>{label}</Text>
            {required && <Text style={styles.required}> *</Text>}
          </View>
        )}
        <View style={[styles.inputRow, {borderColor}]}>
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.text.placeholder}
            underlineColorAndroid="transparent"
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />
          {rightAccessory && (
            <TouchableOpacity
              style={styles.accessory}
              activeOpacity={1}
              onPress={undefined}>
              {rightAccessory}
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

//---------------------------------------
const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  required: {
    fontSize: 14,
    color: colors.text.error,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    paddingVertical: 12,
  },
  accessory: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: colors.text.error,
  },
});

export default BaseInput;
