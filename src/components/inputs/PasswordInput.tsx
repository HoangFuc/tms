import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

import {Eye, EyeSlash} from 'iconsax-react-native';

import {colors} from '../../theme/colors';
import BaseInput, {IBaseInputProps} from './BaseInput';

//---------------------------------------
export interface IPasswordInputProps
  extends Omit<IBaseInputProps, 'rightAccessory' | 'secureTextEntry'> {
  containerStyle?: StyleProp<ViewStyle>;
}

//---------------------------------------
const PasswordInput = React.memo(({placeholder, ...rest}: IPasswordInputProps) => {
  const [isSecure, setIsSecure] = React.useState(true);

  //---------------------------------------
  const handleToggleSecure = React.useCallback(() => setIsSecure((v: boolean) => !v), []);

  //---------------------------------------
  const eyeIcon = (
    <TouchableOpacity
      onPress={handleToggleSecure}
      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
      {isSecure ? (
        <EyeSlash size={20} color={colors.inactive} variant="Linear" />
      ) : (
        <Eye size={20} color={colors.inactive} variant="Linear" />
      )}
    </TouchableOpacity>
  );

  return (
    <BaseInput
      placeholder={placeholder ?? '비밀번호를 입력하세요'}
      secureTextEntry={isSecure}
      rightAccessory={eyeIcon}
      {...rest}
    />
  );
});

export default PasswordInput;
