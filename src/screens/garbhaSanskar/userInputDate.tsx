"use client";

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Modal,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type UserInputDateProps = {
  onDateSelected: (date: Date, day: number, week: number) => void;
  onCancel?: () => void;
  visible: boolean;
};

export default function UserInputDate({
  onDateSelected,
  onCancel,
  visible,
}: UserInputDateProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      setError(null);
      if (Platform.OS === 'android') {
        setShowPicker(false);
      }
    }
  };

  const calculateDay = (startDate: Date): number => {
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const day = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    return Math.max(1, Math.min(day, 280));
  };

  const calculateWeek = (startDate: Date): number => {
    const day = calculateDay(startDate);
    return Math.floor(day / 7);
  };

  const handleCalculate = () => {
    const today = new Date();
    if (selectedDate > today) {
      setError('Pregnancy start date cannot be in the future');
      return;
    }

    const day = calculateDay(selectedDate);
    const week = calculateWeek(selectedDate);

    onDateSelected(selectedDate, day, week);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const day = calculateDay(selectedDate);
  const week = calculateWeek(selectedDate);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Enter Pregnancy Start Date</Text>
          <Text style={styles.subtitle}>
            Select the date when your pregnancy started
          </Text>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Pregnancy Progress</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoPill}>
                <Text style={styles.infoValue}>{day}</Text>
                <Text style={styles.infoUnit}>Days</Text>
              </View>
              <View style={styles.infoPill}>
                <Text style={styles.infoValue}>{week}</Text>
                <Text style={styles.infoUnit}>Weeks</Text>
              </View>
            </View>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleCalculate}
            >
              <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#20094D',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoPill: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  infoValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#20094D',
  },
  infoUnit: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#dc2626',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  submitButton: {
    backgroundColor: '#20094D',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
