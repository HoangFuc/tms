import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import {SearchNormal1} from 'iconsax-react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export interface ISearchInputProps extends Omit<TextInputProps, 'style'> {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

//---------------------------------------
const SearchInput = React.memo(
  ({placeholder, containerStyle, ...rest}: ISearchInputProps) => {
    return (
      <View style={[styles.container, containerStyle]}>
        <SearchNormal1 size={18} color={colors.inactive} variant="Linear" />
        <TextInput
          style={styles.input}
          placeholder={placeholder ?? '검색어를 입력하세요'}
          placeholderTextColor={colors.text.placeholder}
          underlineColorAndroid="transparent"
          {...rest}
        />
      </View>
    );
  },
);

//---------------------------------------
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.input,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    padding: 0,
  },
});

export default SearchInput;
