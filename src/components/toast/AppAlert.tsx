import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {InfoCircle, TickCircle, CloseCircle} from 'iconsax-react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
export type TAlertType = 'success' | 'error' | 'info';

export interface IAppAlertProps {
  type: TAlertType;
  title?: string;
  message?: string;
}

const ALERT_CONFIG: Record<TAlertType, {color: string}> = {
  success: {color: colors.toast.success},
  error:   {color: colors.toast.error},
  info:    {color: colors.toast.info},
};

//---------------------------------------
const AlertIcon = React.memo(({type, color}: {type: TAlertType; color: string}) => {
  const size = 20;
  if (type === 'success') return <TickCircle size={size} color={color} variant="Bold" />;
  if (type === 'error')   return <CloseCircle size={size} color={color} variant="Bold" />;
  return <InfoCircle size={size} color={color} variant="Bold" />;
});

//---------------------------------------
const AppAlert = React.memo(({type, title, message}: IAppAlertProps) => {
  const {color} = ALERT_CONFIG[type];

  return (
    <View style={[styles.container, {borderLeftColor: color}]}>
      <View style={styles.row}>
        <AlertIcon type={type} color={color} />
        <View style={styles.textContainer}>
          {title   && <Text style={[styles.title,   {color}]}>{title}</Text>}
          {message && <Text style={[styles.message, {color}]}>{message}</Text>}
        </View>
      </View>
    </View>
  );
});

//---------------------------------------
const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    shadowColor: '#171A1F',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
  },
  message: {
    fontSize: 12,
  },
});

export default AppAlert;
