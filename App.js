import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity, Image,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import KartuProfil from "./components/KartuProfil";

// ==========================================
// 2. CLASS COMPONENT (Stateful & Lifecycle)
// Bertugas mengelola memori dan logika
// ==========================================

export default function App() {
  // A. INISIALISASI STATE
  const [kodeKelas, setKodeKelas] = useState('');
  const [isHadir, setIsHadir] = useState(false);
  const [waktuAbsen, setWaktuAbsen] = useState('');
  const [jamRealtime, setJamRealtime] = useState('Memuat jam...');


  // Data statis untuk dikirim sebagai Props ke Functional Component
  const studentData = {
    nama: 'Budi Susanto',
    nim: '030812345',
    prodi: 'TRPL - Politeknik Astra',
  };

  // B. FASE MOUNTING (Komponen Lahir)
  useEffect(() => {
    console.log('[MOUNTING] Aplikasi Presensi Dibuka.');

    // Mulai jam digital tiap 1 detik
    const intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      setJamRealtime(waktu); // Update state jam
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalJam);
  }, []);

  // C. FASE UPDATING (Komponen Berubah)
  useEffect(() => {
    console.log('[UPDATING] State berubah:', { kodeKelas, isHadir, waktuAbsen });
  }, [isHadir, waktuAbsen]);

  // E. LOGIKA EVENT HANDLER
  const handleAbsen = () => {
    if (kodeKelas.trim() === '') {
      alert('Masukkan kode kelas (Simulasi QR) terlebih dahulu!');
      return;
    }

    // Ubah state menjadi hadir dan rekam jam saat itu
    setIsHadir(true);
    setWaktuAbsen(jamRealtime);
  };

  // F. FUNGSI RENDER WAJIB
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER DENGAN JAM DIGITAL (Terhubung ke State) */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sistem Presensi</Text>
          <Text style={styles.clockText}>{jamRealtime}</Text>
        </View>

        {/* MEMANGGIL FUNCTIONAL COMPONENT DAN MENGIRIM PROPS */}
        <KartuProfil student={studentData} />

        {/* SEKSI PRESENSI (CONDITIONAL RENDERING) */}
        <View style={styles.actionSection}>
          {isHadir ? (
            <View style={styles.successCard}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
                style={styles.successIcon}
              />
              <Text style={styles.successText}>Presensi Berhasil!</Text>
              <Text style={styles.timeText}>Tercatat pada: {waktuAbsen} WIB</Text>
              <Text style={styles.codeText}>Kode Terverifikasi: {kodeKelas}</Text>
            </View>
          ) : (
            <View style={styles.inputCard}>
              <Text style={styles.instructionText}>Masukkan Kode Kelas:</Text>
              <Text style={styles.noteText}>(Simulasi dari hasil Scan QR Kamera)</Text>

              <TextInput
                style={styles.input}
                placeholder="Contoh: TRPL-03"
                value={kodeKelas}
                // Hati-hati: Di class, kita gunakan this.setState
                onChangeText={setKodeKelas}
                autoCapitalize="characters"
              />

              <TouchableOpacity style={styles.buttonSubmit} onPress={handleAbsen}>
                <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    backgroundColor: '#0056A0',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#D1E8FF',
    fontSize: 14,
    marginTop: 5,
  },
  actionSection: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  inputCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    color: '#333',
  },
  buttonSubmit: {
    backgroundColor: '#0056A0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successCard: {
    backgroundColor: '#E8F5E9', // Latar belakang hijau lembut
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#388E3C',
    marginBottom: 5,
  },
  codeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontFamily: 'monospace',
  },
});