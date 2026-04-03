// AKJEE Firebase Cloud Sync
const FirebaseSync = {
  db: null,
  initialized: false,
  _saveTimer: null,

  init() {
    try {
      const firebaseConfig = {
        apiKey: "AIzaSyDHwhgeQ7z-ciMy6teWtDlT4mh3MErKDoA",
        authDomain: "akjee-6f6f6.firebaseapp.com",
        projectId: "akjee-6f6f6",
        storageBucket: "akjee-6f6f6.firebasestorage.app",
        messagingSenderId: "637108425706",
        appId: "1:637108425706:web:c5f14e7bcdf9aa53001893"
      };
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      this.db = firebase.firestore();
      this.initialized = true;
    } catch(e) {
      console.warn('[Sync] Firebase init failed:', e);
    }
  },

  getSyncCode() {
    return localStorage.getItem('akjee_cloud_code') || null;
  },

  generateSyncCode() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem('akjee_cloud_code', code);
    return code;
  },

  getOrCreateCode() {
    return this.getSyncCode() || this.generateSyncCode();
  },

  // Called on every Storage.save() — debounced 2s
  scheduleSave() {
    if (!this.initialized) return;
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._push(), 2000);
  },

  async _push() {
    if (!this.initialized || !this.db) return;
    const code = this.getOrCreateCode();
    this._setStatus('syncing');
    try {
      const data = { _lastSynced: new Date().toISOString(), _v: '1.2' };
      Object.entries(Storage.KEYS).forEach(([k, v]) => {
        data[k] = Storage.load(v);
      });
      await this.db.collection('students').doc(code).set(data);
      this._setStatus('synced');
    } catch(e) {
      console.warn('[Sync] Push failed:', e);
      this._setStatus('error');
    }
  },

  async pullFromCloud(code) {
    if (!this.initialized || !this.db) return { ok: false, msg: 'Firebase not ready' };
    try {
      const doc = await this.db.collection('students').doc(code.trim().toUpperCase()).get();
      if (!doc.exists) return { ok: false, msg: 'No data found for this code' };
      const data = doc.data();
      Object.entries(Storage.KEYS).forEach(([k, v]) => {
        if (data[k] !== undefined) Storage.save(v, data[k]);
      });
      localStorage.setItem('akjee_cloud_code', code.trim().toUpperCase());
      return { ok: true, synced: data._lastSynced };
    } catch(e) {
      console.warn('[Sync] Pull failed:', e);
      return { ok: false, msg: 'Network error' };
    }
  },

  // Load from cloud on app start (if code exists)
  async autoLoad() {
    const code = this.getSyncCode();
    if (!code || !this.initialized) return;
    try {
      const doc = await this.db.collection('students').doc(code).get();
      if (!doc.exists) return;
      const remote = doc.data();
      const localSynced = localStorage.getItem('akjee_last_synced');
      // Only overwrite if remote is newer
      if (!localSynced || remote._lastSynced > localSynced) {
        Object.entries(Storage.KEYS).forEach(([k, v]) => {
          if (remote[k] !== undefined) Storage.save(v, remote[k]);
        });
        localStorage.setItem('akjee_last_synced', remote._lastSynced);
      }
    } catch(e) {
      console.warn('[Sync] Auto-load failed:', e);
    }
  },

  _setStatus(status) {
    const el = document.getElementById('cloud-sync-status');
    if (!el) return;
    const map = {
      synced: { text: '✅ Synced to cloud', color: 'var(--green)' },
      syncing: { text: '🔄 Syncing...', color: 'var(--blue-primary)' },
      error:  { text: '⚠️ Sync failed — check connection', color: 'var(--orange)' },
    };
    const s = map[status];
    if (s) { el.textContent = s.text; el.style.color = s.color; }
  }
};
