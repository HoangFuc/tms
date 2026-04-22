import React from 'react';
import {StyleProp, Switch, View, ViewStyle} from 'react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export interface IToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

//---------------------------------------
const Toggle = React.memo(({value, onValueChange, disabled = false, style}: IToggleProps) => {
  return (
    <View style={style}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: colors.toggle.trackOff,
          true: colors.toggle.trackOn,
        }}
        thumbColor={colors.toggle.thumb}
        ios_backgroundColor={colors.toggle.trackOff}
      />
    </View>
  );
});

export default Toggle;
