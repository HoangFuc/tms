import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';

import {colors} from '../../theme/colors';

//---------------------------------------
type ViewMode = 'day' | 'month' | 'year';

export interface ICalendarProps {
  selectionMode?: 'single' | 'range';
  defaultDate?: Date;
  onDateSelect?: (date: Date) => void;
  onRangeSelect?: (start: Date, end: Date) => void;
  style?: StyleProp<ViewStyle>;
}

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_LABELS = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];
const CELL_SIZE = 36;
const YEAR_RANGE_SIZE = 12;

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isBetween = (d: Date, start: Date, end: Date) =>
  d.getTime() > start.getTime() && d.getTime() < end.getTime();

const getDecadeStart = (year: number) =>
  Math.floor(year / YEAR_RANGE_SIZE) * YEAR_RANGE_SIZE;

//---------------------------------------
const Calendar = React.memo(
  ({
    selectionMode = 'single',
    defaultDate,
    onDateSelect,
    onRangeSelect,
    style,
  }: ICalendarProps) => {
    const initial = defaultDate ?? new Date();

    const [viewDate, setViewDate] = React.useState(
      new Date(initial.getFullYear(), initial.getMonth(), 1),
    );
    const [viewMode, setViewMode] = React.useState<ViewMode>('day');
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
      selectionMode === 'single' ? startOfDay(initial) : null,
    );
    const [rangeStart, setRangeStart] = React.useState<Date | null>(null);
    const [rangeEnd, setRangeEnd] = React.useState<Date | null>(null);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    //---------------------------------------
    const headerTitle = React.useMemo(() => {
      if (viewMode === 'day') {return `${year}년 ${month + 1}월`;}
      if (viewMode === 'month') {return `${year}년`;}
      const ds = getDecadeStart(year);
      return `${ds}년 - ${ds + YEAR_RANGE_SIZE - 1}년`;
    }, [viewMode, year, month]);

    //---------------------------------------
    const handlePrev = React.useCallback(() => {
      if (viewMode === 'day') {
        setViewDate(new Date(year, month - 1, 1));
      } else if (viewMode === 'month') {
        setViewDate(new Date(year - 1, month, 1));
      } else {
        setViewDate(new Date(getDecadeStart(year) - YEAR_RANGE_SIZE, month, 1));
      }
    }, [viewMode, year, month]);

    const handleNext = React.useCallback(() => {
      if (viewMode === 'day') {
        setViewDate(new Date(year, month + 1, 1));
      } else if (viewMode === 'month') {
        setViewDate(new Date(year + 1, month, 1));
      } else {
        setViewDate(new Date(getDecadeStart(year) + YEAR_RANGE_SIZE, month, 1));
      }
    }, [viewMode, year, month]);

    const handleHeaderPress = React.useCallback(() => {
      if (viewMode === 'day') {setViewMode('month');}
      else if (viewMode === 'month') {setViewMode('year');}
      else {setViewMode('day');}
    }, [viewMode]);

    //---------------------------------------
    const handleDayPress = React.useCallback(
      (date: Date) => {
        if (selectionMode === 'single') {
          setSelectedDate(date);
          onDateSelect?.(date);
        } else {
          if (!rangeStart || (rangeStart && rangeEnd)) {
            setRangeStart(date);
            setRangeEnd(null);
          } else {
            if (date < rangeStart) {
              setRangeEnd(rangeStart);
              setRangeStart(date);
              onRangeSelect?.(date, rangeStart);
            } else {
              setRangeEnd(date);
              onRangeSelect?.(rangeStart, date);
            }
          }
        }
      },
      [selectionMode, rangeStart, rangeEnd, onDateSelect, onRangeSelect],
    );

    const handleMonthPress = React.useCallback(
      (monthIndex: number) => {
        setViewDate(new Date(year, monthIndex, 1));
        setViewMode('day');
      },
      [year],
    );

    const handleYearPress = React.useCallback(
      (y: number) => {
        setViewDate(new Date(y, month, 1));
        setViewMode('month');
      },
      [month],
    );

    //---------------------------------------
    const dayGrid = React.useMemo(() => {
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();
      const cells: Array<{date: Date; currentMonth: boolean}> = [];

      for (let i = firstDay - 1; i >= 0; i--) {
        cells.push({
          date: new Date(year, month - 1, prevMonthDays - i),
          currentMonth: false,
        });
      }
      for (let d = 1; d <= daysInMonth; d++) {
        cells.push({date: new Date(year, month, d), currentMonth: true});
      }
      const remaining = 42 - cells.length;
      for (let d = 1; d <= remaining; d++) {
        cells.push({date: new Date(year, month + 1, d), currentMonth: false});
      }
      return cells;
    }, [year, month]);

    //---------------------------------------
    const renderDayView = () => {
      const rows: Array<typeof dayGrid> = [];
      for (let i = 0; i < 6; i++) {
        rows.push(dayGrid.slice(i * 7, i * 7 + 7));
      }

      return (
        <View>
          <View style={styles.row}>
            {DAY_LABELS.map((label, i) => (
              <View key={label} style={styles.cell}>
                <Text
                  style={[
                    styles.dayHeader,
                    (i === 0 || i === 6) && styles.weekendText,
                  ]}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {rows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {row.map((cell, colIdx) => {
                const d = startOfDay(cell.date);
                const isSelected =
                  selectionMode === 'single' &&
                  selectedDate != null &&
                  isSameDay(d, selectedDate);
                const isStart =
                  selectionMode === 'range' &&
                  rangeStart != null &&
                  isSameDay(d, rangeStart);
                const isEnd =
                  selectionMode === 'range' &&
                  rangeEnd != null &&
                  isSameDay(d, rangeEnd);
                const inRange =
                  selectionMode === 'range' &&
                  rangeStart != null &&
                  rangeEnd != null &&
                  isBetween(d, rangeStart, rangeEnd);
                const isFirstCol = colIdx === 0;
                const isLastCol = colIdx === 6;
                const highlighted = isSelected || isStart || isEnd;

                return (
                  <TouchableOpacity
                    key={colIdx}
                    style={styles.cell}
                    onPress={() => handleDayPress(d)}
                    activeOpacity={0.7}>
                    {/* Range middle strip */}
                    {inRange && (
                      <View
                        style={[
                          StyleSheet.absoluteFill,
                          {backgroundColor: colors.calendar.range},
                        ]}
                      />
                    )}
                    {/* Range strip — right half of start */}
                    {isStart && rangeEnd != null && !isLastCol && (
                      <View style={styles.rangeStripRight} />
                    )}
                    {/* Range strip — left half of end */}
                    {isEnd && rangeStart != null && !isFirstCol && (
                      <View style={styles.rangeStripLeft} />
                    )}
                    {/* Selected circle */}
                    {highlighted ? (
                      <View style={styles.selectedCircle}>
                        <Text style={styles.selectedDayText}>
                          {cell.date.getDate()}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={[
                          styles.dayText,
                          !cell.currentMonth && styles.outsideMonthText,
                          cell.currentMonth &&
                            colIdx === 0 &&
                            styles.weekendText,
                          cell.currentMonth &&
                            colIdx === 6 &&
                            styles.weekendText,
                        ]}>
                        {cell.date.getDate()}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      );
    };

    //---------------------------------------
    const renderMonthView = () => {
      const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
      return (
        <View style={styles.gridContainer}>
          {rows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.gridRow}>
              {row.map(mIdx => {
                const isSelected = mIdx === month;
                return (
                  <TouchableOpacity
                    key={mIdx}
                    style={styles.gridCell}
                    onPress={() => handleMonthPress(mIdx)}
                    activeOpacity={0.7}>
                    <View
                      style={[
                        styles.gridChip,
                        isSelected && styles.selectedChip,
                      ]}>
                      <Text
                        style={[
                          styles.gridText,
                          isSelected && styles.selectedChipText,
                        ]}>
                        {MONTH_LABELS[mIdx]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      );
    };

    //---------------------------------------
    const renderYearView = () => {
      const ds = getDecadeStart(year);
      const years = Array.from({length: YEAR_RANGE_SIZE}, (_, i) => ds + i);
      const rows = [years.slice(0, 3), years.slice(3, 6), years.slice(6, 9), years.slice(9, 12)];
      return (
        <View style={styles.gridContainer}>
          {rows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.gridRow}>
              {row.map(y => {
                const isSelected = y === year;
                return (
                  <TouchableOpacity
                    key={y}
                    style={styles.gridCell}
                    onPress={() => handleYearPress(y)}
                    activeOpacity={0.7}>
                    <View
                      style={[
                        styles.gridChip,
                        isSelected && styles.selectedChip,
                      ]}>
                      <Text
                        style={[
                          styles.gridText,
                          isSelected && styles.selectedChipText,
                        ]}>
                        {y}년
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      );
    };

    //---------------------------------------
    return (
      <View style={[styles.container, style]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handlePrev}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <ArrowLeft2 size={18} color={colors.text.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleHeaderPress}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <ArrowRight2 size={18} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {viewMode === 'day' && renderDayView()}
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'year' && renderYearView()}
      </View>
    );
  },
);

//---------------------------------------
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    width: 280,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    height: CELL_SIZE + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeader: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.primary,
  },
  weekendText: {
    color: colors.calendar.weekend,
  },
  dayText: {
    fontSize: 13,
    color: colors.text.primary,
  },
  outsideMonthText: {
    color: colors.calendar.outsideMonth,
  },
  selectedCircle: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    backgroundColor: colors.calendar.selected,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
  gridContainer: {
    marginTop: 4,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridCell: {
    flex: 1,
    alignItems: 'center',
  },
  gridChip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
  },
  selectedChip: {
    backgroundColor: colors.calendar.selected,
  },
  gridText: {
    fontSize: 13,
    color: colors.text.primary,
  },
  selectedChipText: {
    color: colors.white,
    fontWeight: '600',
  },
  rangeStripRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    right: 0,
    backgroundColor: colors.calendar.range,
  },
  rangeStripLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: '50%',
    backgroundColor: colors.calendar.range,
  },
});

export default Calendar;
