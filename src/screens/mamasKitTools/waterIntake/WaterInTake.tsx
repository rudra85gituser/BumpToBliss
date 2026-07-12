import { ChevronLeft, Edit2, MoreVertical, Trash2 } from 'lucide-react-native'
import { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface WaterEntry {
  id: string
  type: 'Water' | 'Coffee' | 'Juice' | 'Chai'
  amount: string
  dateTime: string
}

const mockWaterData: WaterEntry[] = [
  { id: '1', type: 'Water', amount: '300 ml', dateTime: '2:40 PM' },
  { id: '2', type: 'Water', amount: '300 ml', dateTime: '2:40 PM' },
  { id: '3', type: 'Water', amount: '300 ml', dateTime: '2:40 PM' },
  { id: '4', type: 'Water', amount: '300 ml', dateTime: '2:40 PM' },
  { id: '5', type: 'Water', amount: '300 ml', dateTime: '2:40 PM' },
  { id: '6', type: 'Water', amount: '300 ml', dateTime: '2:40 PM' },
  { id: '7', type: 'Water', amount: '300 ml', dateTime: '2:40 PM' },
]

const drinkTypes = ['Water', 'Coffee', 'Juice', 'Chai']
const drinkIcons: Record<string, string> = {
  Water: '💧',
  Coffee: '☕',
  Juice: '🧃',
  Chai: '🍵',
}

type NewEntryModalProps = {
  amount: string
  date: string
  drinkType: string
  onAmountChange: (amount: string) => void
  onClose: () => void
  onDateChange: (date: string) => void
  onDrinkTypeChange: (drinkType: string) => void
  onSave: () => void
  onTimeChange: (time: string) => void
  showNewEntry: boolean
  time: string
}

const NewEntryModal = ({
  amount,
  date,
  drinkType,
  onAmountChange,
  onClose,
  onDateChange,
  onDrinkTypeChange,
  onSave,
  onTimeChange,
  showNewEntry,
  time,
}: NewEntryModalProps) => (
  <Modal visible={showNewEntry} animationType="slide">
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
            <Text style={styles.backButtonText}>Water In-take</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.infoText}>
            Choose how much water you took every hour of the day
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Drink</Text>
            <View style={styles.drinkButtons}>
              {drinkTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => onDrinkTypeChange(type)}
                  style={[
                    styles.drinkButton,
                    drinkType === type && styles.drinkButtonActive,
                  ]}
                >
                  <Text style={styles.drinkIcon}>{drinkIcons[type]}</Text>
                  <Text
                    style={[
                      styles.drinkButtonText,
                      drinkType === type && styles.drinkButtonTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>How much</Text>
            <TextInput
              value={amount}
              onChangeText={onAmountChange}
              placeholder="300 ml"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Date & Time</Text>
            <TextInput
              value={`${date}  ${time}`}
              onChangeText={(text) => {
                const parts = text.split('  ')
                onDateChange(parts[0] || date)
                onTimeChange(parts[1] || time)
              }}
              placeholder="20 Nov, 25  2:48 PM"
              style={styles.input}
            />
          </View>

          <TouchableOpacity onPress={onSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  </Modal>
)

export default function WaterIntake() {
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [drinkType, setDrinkType] = useState('Water')
  const [amount, setAmount] = useState('300 ml')
  const [date, setDate] = useState('20 Nov, 25')
  const [time, setTime] = useState('2:48 PM')
  const [entries, setEntries] = useState<WaterEntry[]>(mockWaterData)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const handleSave = () => {
    const newEntry: WaterEntry = {
      id: Date.now().toString(),
      type: drinkType as 'Water' | 'Coffee' | 'Juice' | 'Chai',
      amount,
      dateTime: time,
    }
    setEntries([newEntry, ...entries])
    setShowNewEntry(false)
    setDrinkType('Water')
    setAmount('300 ml')
    setDate('20 Nov, 25')
    setTime('2:48 PM')
  }

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id))
    setOpenMenu(null)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <NewEntryModal
          amount={amount}
          date={date}
          drinkType={drinkType}
          onAmountChange={setAmount}
          onClose={() => setShowNewEntry(false)}
          onDateChange={setDate}
          onDrinkTypeChange={setDrinkType}
          onSave={handleSave}
          onTimeChange={setTime}
          showNewEntry={showNewEntry}
          time={time}
        />

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Water In-take</Text>
          <TouchableOpacity
            onPress={() => setShowNewEntry(true)}
            style={styles.newEntryButton}
          >
            <Text style={styles.newEntryButtonText}>New Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.infoText}>
            Choose how much water you took every hour of the day
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Drink</Text>
            <TextInput
              value="Water"
              editable={false}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>How much</Text>
            <TextInput
              placeholder="300 ml"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Date & Time</Text>
            <TextInput
              placeholder="20 Nov, 25  2:48 PM"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>History</Text>
            {entries.map((entry) => (
              <View key={entry.id} style={styles.entryRow}>
                <View style={styles.entryLeft}>
                  <Text style={styles.entryIcon}>{drinkIcons[entry.type]}</Text>
                  <View style={styles.entryInfo}>
                    <Text style={styles.entryType}>{entry.type}</Text>
                    <Text style={styles.entryDateTime}>{entry.dateTime}</Text>
                  </View>
                </View>
                <View style={styles.entryRight}>
                  <View style={styles.amountBadge}>
                    <Text style={styles.amountText}>{entry.amount}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setOpenMenu(openMenu === entry.id ? null : entry.id)
                    }
                    style={styles.menuButton}
                  >
                    <MoreVertical size={16} color="#6b7280" />
                  </TouchableOpacity>
                  {openMenu === entry.id && (
                    <View style={styles.menuDropdown}>
                      <TouchableOpacity
                        onPress={() => setOpenMenu(null)}
                        style={styles.menuItem}
                      >
                        <Edit2 size={16} color="#000" />
                        <Text style={styles.menuItemText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(entry.id)}
                        style={styles.menuItem}
                      >
                        <Trash2 size={16} color="#ef4444" />
                        <Text style={[styles.menuItemText, styles.menuItemTextDanger]}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  newEntryButton: {
    backgroundColor: '#14b8a6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newEntryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  drinkButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  drinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
    minWidth: '45%',
  },
  drinkButtonActive: {
    backgroundColor: '#ffffff',
    borderColor: '#3b82f6',
  },
  drinkIcon: {
    fontSize: 20,
  },
  drinkButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  drinkButtonTextActive: {
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  historySection: {
    marginTop: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  entryIcon: {
    fontSize: 24,
  },
  entryInfo: {
    flex: 1,
  },
  entryType: {
    fontSize: 14,
    color: '#000',
  },
  entryDateTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  entryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  amountText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#15803d',
  },
  menuButton: {
    padding: 4,
  },
  menuDropdown: {
    position: 'absolute',
    right: 0,
    top: 30,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#000',
  },
  menuItemTextDanger: {
    color: '#ef4444',
  },
})

