import React from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export interface IDropdownOption {
  label: string;
  value: string;
}

export interface IDropdownProps {
  options: IDropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

//---------------------------------------
const Dropdown = React.memo(
  ({
    options,
    value,
    onChange,
    placeholder = '선택하세요',
    label,
    required,
    error,
    containerStyle,
  }: IDropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    //---------------------------------------
    const selectedOption = options.find(opt => opt.value === value);

    const borderColor = error
      ? colors.border.error
      : isOpen
      ? colors.border.focused
      : colors.border.default;

    //---------------------------------------
    const handleToggle = React.useCallback(() => {
      setIsOpen(prev => !prev);
    }, []);

    const handleSelect = React.useCallback(
      (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
      },
      [onChange],
    );

    //---------------------------------------
    const renderOption = React.useCallback(
      ({item}: {item: IDropdownOption}) => {
        const isSelected = item.value === value;
        return (
          <TouchableOpacity
            style={styles.optionItem}
            activeOpacity={0.7}
            onPress={() => handleSelect(item.value)}>
            <Text
              style={[
                styles.optionText,
                isSelected && styles.optionTextSelected,
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      },
      [value, handleSelect],
    );

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <View style={styles.labelRow}>
            <Text style={styles.label}>{label}</Text>
            {required && <Text style={styles.required}> *</Text>}
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.trigger,
            {borderColor},
            isOpen && styles.triggerOpen,
          ]}
          activeOpacity={0.8}
          onPress={handleToggle}>
          <Text
            style={[
              styles.triggerText,
              !selectedOption && styles.placeholderText,
            ]}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          {isOpen ? (
            <ArrowUp2 size={18} color={colors.inactive} variant="linear" />
          ) : (
            <ArrowDown2 size={18} color={colors.inactive} variant="linear" />
          )}
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.optionList}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={renderOption}
              scrollEnabled={false}
            />
          </View>
        )}

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
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  triggerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  triggerText: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
  },
  placeholderText: {
    color: colors.text.placeholder,
  },
  optionList: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.border.focused,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  optionItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    color: colors.text.primary,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '500',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: colors.text.error,
  },
});

export default Dropdown;
