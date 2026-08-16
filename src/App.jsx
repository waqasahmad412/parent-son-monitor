import { useEffect, useMemo, useRef, useState } from 'react';

const initialConversationMessages = [
  { id: 1, sender: 'Child', text: 'I reached school safely.', time: '09:12' },
  { id: 2, sender: 'Parent', text: 'Great, keep your phone with you.', time: '09:14' },
  { id: 3, sender: 'Parent', text: 'Please complete your homework before dinner.', time: '09:16' },
  { id: 4, sender: 'Child', text: 'Okay, I will do it after school.', time: '09:18' },
];

const initialNotifications = [
  { id: 1, sender: 'Parent', target: 'Child', text: 'Please check your route before leaving.', time: '08:45' },
  { id: 2, sender: 'Child', target: 'Parent', text: 'I have completed my homework.', time: '09:30' },
];

const initialTasks = [
  {
    id: 1,
    title: 'Math Revision',
    description: 'Complete page 12 of your algebra worksheet.',
    assignee: 'Child',
    sender: 'Parent',
    status: 'pending',
    feedback: '',
    attachmentName: 'math-worksheet.pdf',
    attachmentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    solutionFileName: '',
    solutionFileUrl: '',
  },
  {
    id: 2,
    title: 'Reading Activity',
    description: 'Read the school story and send a short summary.',
    assignee: 'Child',
    sender: 'Parent',
    status: 'completed',
    feedback: 'Done, I have shared the summary.',
    attachmentName: 'reading-task.txt',
    attachmentUrl: 'https://www.w3.org/2008/site/images/logo-w3c-mobile-lg.png',
    solutionFileName: 'reading-summary.txt',
    solutionFileUrl: 'https://www.w3.org/People/Mits/Overview.html',
  },
];

const initialRewards = [
  {
    id: 1,
    title: 'Homework Bonus',
    description: 'Reward for completing homework on time.',
    amount: 20,
    recipient: 'Child',
    sentBy: 'Parent',
    status: 'received',
    time: '09:20',
  },
];

const initialAiMessages = {
  parent: [
    { id: 1, sender: 'AI Assistant', text: 'I can help you review child activity, screen time, location safety, and important family updates in a clear and professional way.', time: '09:00' },
  ],
  child: [
    { id: 1, sender: 'AI Assistant', text: 'I can help you plan homework, organize tasks, and stay on track with your study goals in a simple and friendly way.', time: '09:00' },
  ],
};

const aiPromptSuggestions = {
  parent: [
    'How should I check my child’s safety today?',
    'What should I do if the child is offline?',
    'Show me a quick parent summary.',
  ],
  child: [
    'Help me with my homework plan.',
    'What should I do first today?',
    'Give me a quick study reminder.',
  ],
};

const initialChildRecords = [
  { id: 1, name: 'Ali Khan', age: 12, email: 'ali@family.com', status: 'Active' },
  { id: 2, name: 'Sara Khan', age: 10, email: 'sara@family.com', status: 'Active' },
];

const initialAuthAccounts = {
  parent: [
    { email: 'parent@family.com', password: 'parent123' },
  ],
  child: [
    { email: 'child@family.com', password: 'child123' },
  ],
};

const initialAttendanceLogs = [
  { id: 1, childId: 1, date: '2026-07-15', status: 'Present', note: 'Checked in on time.' },
  { id: 2, childId: 1, date: '2026-07-16', status: 'Late', note: 'Arrived 10 minutes late.' },
  { id: 3, childId: 1, date: '2026-07-17', status: 'Present', note: 'School attendance marked.' },
  { id: 4, childId: 2, date: '2026-07-15', status: 'Present', note: 'Present for the full day.' },
  { id: 5, childId: 2, date: '2026-07-16', status: 'Absent', note: 'Medical leave recorded.' },
];

const initialMonitoringApps = [
  { id: 1, name: 'Study App', usage: '34 min', blocked: false },
  { id: 2, name: 'YouTube', usage: '18 min', blocked: true },
  { id: 3, name: 'Gaming Hub', usage: '9 min', blocked: true },
  { id: 4, name: 'Music Player', usage: '12 min', blocked: false },
];

const initialAppRequests = [
  {
    id: 1,
    type: 'App Unlock',
    description: 'Request to unlock educational study app for the evening session.',
    sender: 'Child',
    status: 'pending',
    time: '09:45',
  },
  {
    id: 2,
    type: 'Internet Request',
    description: 'Requesting temporary internet access for homework research.',
    sender: 'Child',
    status: 'approved',
    time: '10:12',
  },
];

const initialLiveLocations = {
  parent: {
    shared: false,
    lat: 31.5204,
    lng: 74.3587,
    updatedAt: '09:00',
  },
  child: {
    shared: false,
    lat: 31.5532,
    lng: 74.3249,
    updatedAt: '09:00',
  },
};

const data = {
  parent: [
    { title: 'Authentication', features: ['Login', 'Register', 'Forgot Password', 'OTP Verification', 'Email Verification', 'Google Login', 'Biometric Login', 'Logout', 'Session Management', 'Device Management'] },
    { title: 'Parent Dashboard', features: ['Child Status', 'Online Status', 'Battery Level', 'Internet Status', 'Device Status', 'Today\'s Activity', 'Location Card', 'Quick Actions', 'Recent Alerts', 'Statistics'] },
    { title: 'Child Management', features: ['Add Child', 'Remove Child', 'Edit Profile', 'Multiple Children', 'Child Details', 'Assign Parent', 'Family Members', 'Child Permissions', 'Child Avatar', 'QR Pairing'] },
    { title: 'Live Location', features: ['Live Tracking', 'Location History', 'Route Playback', 'Safe Zone', 'Danger Zone', 'Speed Tracking', 'Distance Travelled', 'Nearby Places', 'GPS Accuracy', 'Real-time Map'] },
    { title: 'Geofencing', features: ['Add Zone', 'Edit Zone', 'Delete Zone', 'Enter Alert', 'Exit Alert', 'School Zone', 'Home Zone', 'Office Zone', 'Radius Setting', 'Schedule Zone'] },
    { title: 'Screen Time', features: ['Daily Limit', 'Weekly Limit', 'App Time', 'Lock Device', 'Unlock Device', 'Sleep Schedule', 'Break Reminder', 'Usage Chart', 'Screen Report', 'Time Approval'] },
    { title: 'App Monitoring', features: ['Installed Apps', 'Usage Report', 'Block App', 'Unblock App', 'New App Alert', 'App Category', 'Time Limit', 'App History', 'Dangerous App Alert', 'App Permission View'] },
    { title: 'App Requests', features: ['Install Request', 'App Unlock', 'More Time Request', 'Permission Request', 'Internet Request', 'Camera Permission', 'Microphone Permission', 'GPS Permission', 'Download Request', 'History'] },
    { title: 'Calls & SMS', features: ['Call History', 'SMS History', 'Unknown Numbers', 'Block Number', 'Whitelist', 'Emergency Contacts', 'Spam Detection', 'Call Duration', 'Missed Calls', 'Notifications'] },
    { title: 'Notifications', features: ['Push Alerts', 'SOS Alert', 'Battery Alert', 'Offline Alert', 'Geofence Alert', 'Speed Alert', 'Low Internet Alert', 'New App Alert', 'Screen Time Alert', 'Device Restart Alert'] },
    { title: 'Tasks & Rewards', features: ['Create Task', 'Assign Task', 'Daily Tasks', 'Weekly Tasks', 'Rewards', 'Coins', 'Bonus', 'Task Approval', 'History', 'Leaderboard'] },
    { title: 'Attendance', features: ['School Check-in', 'Check-out', 'Attendance History', 'Late Alert', 'Absent Alert', 'Calendar', 'QR Attendance', 'GPS Attendance', 'Notes', 'Reports'] },
    { title: 'Chat', features: ['Text Chat', 'Voice Notes', 'Image Sharing', 'File Sharing', 'Emoji', 'Read Receipts', 'Typing Status', 'Online Status', 'Delete Message', 'Search Chat'] },
    { title: 'Emergency', features: ['SOS Receive', 'Emergency Call', 'Live Audio', 'Live Location', 'Emergency Contacts', 'Panic Alert', 'Police Contact', 'Ambulance Contact', 'Medical Info', 'Emergency History'] },
    { title: 'Reports', features: ['Daily', 'Weekly', 'Monthly', 'Screen Time', 'Location', 'Tasks', 'Attendance', 'Chat', 'Device', 'Export PDF'] },
    { title: 'Family Members', features: ['Invite Parent', 'Remove Parent', 'Permissions', 'Guardian', 'Grandparents', 'Access Control', 'Notifications', 'Shared Reports', 'Roles', 'Activity Log'] },
    { title: 'Device Control', features: ['Lock Phone', 'Ring Phone', 'Restart', 'Brightness', 'Volume', 'WiFi Status', 'Bluetooth', 'Mobile Data', 'Battery Saver', 'Lost Mode'] },
    { title: 'Media Monitoring', features: ['Photos', 'Videos', 'Audio', 'Downloads', 'File Access', 'Cloud Backup', 'Gallery Report', 'File Sharing', 'Storage Usage', 'Cleanup'] },
    { title: 'Subscription', features: ['Free Plan', 'Premium', 'Family Plan', 'Payment', 'Invoice', 'Renewal', 'Coupons', 'Trial', 'Upgrade', 'Cancel'] },
    { title: 'Settings', features: ['Theme', 'Language', 'Notifications', 'Security', 'Privacy', 'Backup', 'Restore', 'Change Password', 'Delete Account', 'Logout'] },
    { title: 'AI Assistant', features: ['AI Chat', 'Activity Analysis', 'Behavior Prediction', 'Smart Suggestions', 'Weekly Summary', 'Safety Tips', 'Health Reminder', 'Homework Reminder', 'Routine Generator', 'AI Reports'] },
  ],
  child: [
    { title: 'Authentication', features: ['Login', 'Register', 'OTP', 'Email Verify', 'Biometric', 'Face Unlock', 'Logout', 'Remember Me', 'Device Login', 'Session'] },
    { title: 'Child Dashboard', features: ['Profile', 'Today\'s Tasks', 'Rewards', 'Screen Time', 'Battery', 'Internet', 'Weather', 'Schedule', 'Quick Actions', 'Notifications'] },
    { title: 'Live Location', features: ['Share Location', 'Stop Sharing', 'GPS Status', 'Route', 'Home', 'School', 'Safe Zone', 'Check-in', 'Check-out', 'History'] },
    { title: 'Chat', features: ['Parent Chat', 'Voice Message', 'Emoji', 'Images', 'Files', 'Delete Chat', 'Reply', 'Search', 'Online Status', 'Read Receipt'] },
    { title: 'Tasks', features: ['View Tasks', 'Accept', 'Complete', 'Upload Proof', 'Notes', 'Daily Tasks', 'Weekly Tasks', 'Rewards', 'Coins', 'History'] },
    { title: 'Rewards', features: ['Coin Wallet', 'Badges', 'Redeem', 'Reward History', 'Achievements', 'Daily Bonus', 'Weekly Bonus', 'Gift Request', 'Level', 'Progress'] },
    { title: 'Attendance', features: ['Check-in', 'Check-out', 'QR Scan', 'GPS Verify', 'Attendance History', 'Calendar', 'Notes', 'School Status', 'Teacher Note', 'Reports'] },
    { title: 'SOS', features: ['SOS Button', 'Emergency Call', 'Send Location', 'Voice Recording', 'Emergency SMS', 'Emergency Contacts', 'Cancel SOS', 'History', 'Medical Info', 'Safety Guide'] },
    { title: 'Schedule', features: ['School Time', 'Homework', 'Tuition', 'Sports', 'Reminders', 'Calendar', 'Notes', 'Alarm', 'Daily Plan', 'Weekly Plan'] },
    { title: 'Screen Time', features: ['View Limit', 'Remaining Time', 'Break Reminder', 'Lock Notice', 'Unlock Request', 'Daily Usage', 'Weekly Usage', 'Reports', 'Timer', 'Statistics'] },
    { title: 'App Requests', features: ['Install Request', 'App Unlock', 'More Time Request', 'Permission Request', 'Internet Request', 'Camera Permission', 'Microphone Permission', 'GPS Permission', 'Download Request', 'History'] },
    { title: 'Health', features: ['Water Reminder', 'Sleep Reminder', 'Exercise', 'Steps', 'Heart Rate (Supported Devices)', 'Mood', 'BMI', 'Health Notes', 'Parent View', 'Reports'] },
    { title: 'Study', features: ['Homework', 'Subjects', 'Quiz', 'Notes', 'Timetable', 'Assignments', 'Upload Work', 'Progress', 'AI Tutor', 'Results'] },
    { title: 'Profile', features: ['Edit Profile', 'Avatar', 'Name', 'Phone', 'Email', 'Password', 'Language', 'Theme', 'Privacy', 'Logout'] },
    { title: 'Files', features: ['Upload', 'Download', 'Images', 'Videos', 'Documents', 'Homework Files', 'Share', 'Delete', 'Backup', 'Search'] },
    { title: 'Notifications', features: ['Messages', 'Tasks', 'Rewards', 'Attendance', 'School', 'AI Tips', 'Emergency', 'Updates', 'Reminders', 'System'] },
    { title: 'Settings', features: ['Theme', 'Language', 'Notifications', 'Privacy', 'Security', 'Backup', 'Restore', 'Change Password', 'Delete Account', 'Logout'] },
    { title: 'AI Assistant', features: ['AI Chat', 'Homework Help', 'Translation', 'Daily Tips', 'Motivation', 'Quiz Generator', 'Study Planner', 'Time Management', 'AI Voice', 'AI Summary'] },
    { title: 'Device Info', features: ['Battery', 'Storage', 'RAM', 'Internet', 'WiFi', 'Bluetooth', 'GPS', 'Device Model', 'Android Version', 'Performance'] },
    { title: 'Achievements', features: ['Daily Streak', 'Weekly Streak', 'Monthly Goals', 'Badges', 'XP Points', 'Rank', 'Milestones', 'Certificates', 'Rewards', 'Achievement History'] },
  ],
};

function App() {
  const [screen, setScreen] = useState('login');
  const [role, setRole] = useState('parent');
  const [loginRole, setLoginRole] = useState('parent');
  const [authMode, setAuthMode] = useState('register');
  const [authAccounts, setAuthAccounts] = useState(initialAuthAccounts);
  const [authMessage, setAuthMessage] = useState('Create a new parent or child account first, then log in with the same email and password.');
  const [otpCode, setOtpCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState(data.parent[0]);
  const [parentForm, setParentForm] = useState({ email: '', password: '' });
  const [childForm, setChildForm] = useState({ email: '', password: '' });
  const [conversationMessages, setConversationMessages] = useState(initialConversationMessages);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [tasks, setTasks] = useState(initialTasks);
  const [rewards, setRewards] = useState(initialRewards);
  const [rewardDraft, setRewardDraft] = useState({ title: '', description: '', amount: 10 });
  const [subscriptionPlan, setSubscriptionPlan] = useState('Premium');
  const [subscriptionMessage, setSubscriptionMessage] = useState('You are currently on Premium.');
  const [childRecords, setChildRecords] = useState(initialChildRecords);
  const [attendanceLogs, setAttendanceLogs] = useState(initialAttendanceLogs);
  const [monitoringApps, setMonitoringApps] = useState(initialMonitoringApps);
  const [appRequests, setAppRequests] = useState(initialAppRequests);
  const [appRequestDraft, setAppRequestDraft] = useState({ type: 'App Unlock', description: '' });
  const [liveLocations, setLiveLocations] = useState(initialLiveLocations);
  const [locationStatus, setLocationStatus] = useState('Use Share My Live Location to publish your current coordinates.');
  const [draftMessage, setDraftMessage] = useState('');
  const [notificationDraft, setNotificationDraft] = useState('');
  const [taskDraft, setTaskDraft] = useState({ title: '', description: '', attachmentName: '', attachmentUrl: '' });
  const [taskSolutionDrafts, setTaskSolutionDrafts] = useState({});
  const [callState, setCallState] = useState({ callId: null, mode: '', status: '', incoming: false, active: false, muted: false, cameraOn: true, peerCameraOn: true, startedAt: null });
  const [callElapsedSeconds, setCallElapsedSeconds] = useState(0);
  const [childManagementForm, setChildManagementForm] = useState({ name: '', age: '', email: '', status: 'Active' });
  const ringtoneContextRef = useRef(null);
  const ringtoneOscillatorRef = useRef(null);
  const [attendanceForm, setAttendanceForm] = useState({ childId: initialChildRecords[0]?.id ?? null, status: 'Present', note: '' });
  const [selectedChildId, setSelectedChildId] = useState(initialChildRecords[0]?.id ?? null);
  const [editingChildId, setEditingChildId] = useState(null);
  const [aiMessages, setAiMessages] = useState(initialAiMessages);
  const [aiDraft, setAiDraft] = useState('');
  const [settings, setSettings] = useState({
    theme: 'Dark',
    language: 'English',
    notifications: true,
    privacy: 'Family Only',
    security: 'Strong',
    backup: 'Synced',
    password: '',
  });
  const [settingsStatus, setSettingsStatus] = useState('');
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === 'undefined') {
      return 'family-session';
    }

    const params = new URLSearchParams(window.location.search);
    const incomingSession = params.get('session');
    if (incomingSession) {
      return incomingSession;
    }

    const storedSession = window.localStorage.getItem('family-session-id');
    const nextSession = storedSession || `family-session-${Date.now()}`;
    window.localStorage.setItem('family-session-id', nextSession);
    return nextSession;
  });
  const [sessionLink, setSessionLink] = useState('');
  const [sessionLinkCopied, setSessionLinkCopied] = useState(false);
  const [peerPresence, setPeerPresence] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: 'Ahmed Khan',
    roleLabel: 'Parent Portal',
    email: 'parent@family.com',
    phone: '+92 300 1234567',
    status: 'Parent Portal Active',
    notifications: true,
    theme: 'Dark',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [healthState, setHealthState] = useState({
    water: 6,
    sleep: 7,
    steps: 8420,
    heartRate: 78,
    mood: 'Great',
    bmi: '19.2',
    note: 'Feeling energetic and prepared for school.',
    parentView: true,
  });

  const currentModules = data[role];
  const channelRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);

  const broadcastSharedState = (payload) => {
    if (typeof window === 'undefined') {
      return;
    }

    const sharedPayload = {
      sessionId,
      role,
      ...payload,
    };

    try {
      window.localStorage.setItem(`family-module-map-sync:${sessionId}`, JSON.stringify(sharedPayload));
      channelRef.current?.postMessage(sharedPayload);
    } catch (error) {
      console.error('Unable to sync family session state.', error);
    }
  };

  const formatCallDuration = (value) => {
    const safeValue = Number.isFinite(value) ? value : 0;
    const minutes = String(Math.floor(safeValue / 60)).padStart(2, '0');
    const seconds = String(safeValue % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const stopRingtone = () => {
    if (ringtoneOscillatorRef.current) {
      try {
        ringtoneOscillatorRef.current.stop();
      } catch (error) {
        // ignore if already stopped
      }
      ringtoneOscillatorRef.current.disconnect();
      ringtoneOscillatorRef.current = null;
    }

    if (ringtoneContextRef.current) {
      try {
        ringtoneContextRef.current.close();
      } catch (error) {
        // ignore if already closed
      }
      ringtoneContextRef.current = null;
    }
  };

  const playRingtone = () => {
    stopRingtone();

    if (typeof window === 'undefined' || !window.AudioContext) {
      return;
    }

    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = 420;
    gain.gain.value = 0.08;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();

    ringtoneContextRef.current = audioContext;
    ringtoneOscillatorRef.current = oscillator;
  };

  const handleRemoteCallState = (payload) => {
    if (!payload?.callState || payload.role === role) {
      return;
    }

    const remoteState = payload.callState;
    const isDifferentCall = remoteState.callId && remoteState.callId !== callState.callId;

    if (isDifferentCall && (callState.active || callState.incoming)) {
      endCall();
    }

    if (remoteState.outgoing && !remoteState.active) {
      const label = remoteState.mode === 'voice' ? 'Voice call' : 'Video call';
      playRingtone();
      setCallState({
        ...remoteState,
        incoming: true,
        outgoing: false,
        active: false,
        status: `${label} ringing...`,
      });
      return;
    }

    if (remoteState.active) {
      stopRingtone();
      setCallState({
        ...remoteState,
        incoming: false,
        outgoing: false,
        active: true,
        status: `${remoteState.mode === 'voice' ? 'Voice call' : 'Video call'} connected. You can now talk.`,
      });
      return;
    }

    if (!remoteState.incoming && !remoteState.active) {
      stopRingtone();
      setCallState(remoteState);
    }
  };

  const stopLocalStream = () => {
    if (!localStream) {
      return;
    }

    localStream.getTracks().forEach((track) => track.stop());
    setLocalStream(null);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const startLocalCamera = async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setLocationStatus('Camera access is unavailable in this browser.');
      return null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.muted = true;
        await localVideoRef.current.play();
      }

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
        remoteVideoRef.current.muted = true;
        await remoteVideoRef.current.play();
      }

      return stream;
    } catch (error) {
      console.error('Camera access denied or unavailable.', error);
      setLocationStatus('Please allow camera access to use video calls.');
      return null;
    }
  };

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const copySessionLink = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const link = `${window.location.origin}${window.location.pathname}?session=${encodeURIComponent(sessionId)}`;
    setSessionLink(link);

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Family app session',
          text: 'Open this link to join the shared family chat and call session.',
          url: link,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        window.prompt('Copy this session link', link);
      }
      setSessionLinkCopied(true);
      window.setTimeout(() => setSessionLinkCopied(false), 1800);
    } catch (error) {
      console.error('Unable to copy session link.', error);
    }
  };

  useEffect(() => {
    if (selectedChildId !== null) {
      setAttendanceForm((current) => ({ ...current, childId: selectedChildId }));
    }
  }, [selectedChildId]);

  useEffect(() => {
    document.body.classList.toggle('light-theme', settings.theme === 'Light');
    document.body.classList.toggle('dark-theme', settings.theme !== 'Light');
  }, [settings.theme]);

  useEffect(() => {
    if (!isEditingProfile) {
      setProfileForm((current) => ({
        ...current,
        fullName: role === 'parent' ? 'Ahmed Khan' : 'Ali Khan',
        roleLabel: role === 'parent' ? 'Parent Portal' : 'Child Portal',
        email: loginRole === 'parent' ? (parentForm.email || 'parent@family.com') : (childForm.email || 'child@family.com'),
        phone: role === 'parent' ? '+92 300 1234567' : '+92 301 7654321',
        status: role === 'parent' ? 'Parent Portal Active' : 'Child Portal Active',
        notifications: settings.notifications,
        theme: settings.theme,
      }));
    }
  }, [isEditingProfile, role, loginRole, parentForm.email, childForm.email, settings.notifications, settings.theme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const incomingSession = params.get('session');

    if (incomingSession && incomingSession !== sessionId) {
      setSessionId(incomingSession);
      return;
    }

    const channel = new BroadcastChannel(`family-sync-${sessionId}`);
    channelRef.current = channel;

    const syncFromStorage = (event) => {
      const payload = event.newValue ? JSON.parse(event.newValue) : null;
      if (!payload || payload.sessionId !== sessionId) {
        return;
      }

      if (payload.type === 'presence') {
        setPeerPresence(true);
        return;
      }

      if (payload.type === 'conversation') {
        setConversationMessages(payload.conversationMessages || initialConversationMessages);
      }

      if (payload.type === 'call') {
        if (payload.callState?.incoming || payload.callState?.active) {
          setSelectedModule((currentModules.find((module) => module.title === 'Chat') || currentModules[0]));
        }
        handleRemoteCallState(payload);
        setPeerPresence(true);
      }
    };

    channel.onmessage = (event) => {
      const payload = event.data;
      if (!payload || payload.sessionId !== sessionId) {
        return;
      }

      if (payload.type === 'presence') {
        setPeerPresence(true);
        return;
      }

      if (payload.type === 'conversation') {
        setConversationMessages(payload.conversationMessages || initialConversationMessages);
      }

      if (payload.type === 'call') {
        if (payload.callState?.incoming || payload.callState?.active) {
          setSelectedModule((currentModules.find((module) => module.title === 'Chat') || currentModules[0]));
        }
        handleRemoteCallState(payload);
        setPeerPresence(true);
      }
    };

    window.addEventListener('storage', syncFromStorage);

    const storedPayload = window.localStorage.getItem(`family-module-map-sync:${sessionId}`);
    if (storedPayload) {
      try {
        const parsed = JSON.parse(storedPayload);
        if (parsed?.type === 'conversation') {
          setConversationMessages(parsed.conversationMessages || initialConversationMessages);
        }
        if (parsed?.type === 'call') {
          setCallState(parsed.callState || { callId: null, mode: '', status: '', incoming: false, active: false, muted: false, cameraOn: true, startedAt: null });
        }
      } catch (error) {
        console.error('Unable to hydrate shared session.', error);
      }
    }

    channel.postMessage({ type: 'presence', sessionId: sessionId, role });

    return () => {
      window.removeEventListener('storage', syncFromStorage);
      channel.close();
      channelRef.current = null;
    };
  }, [sessionId, role]);

  useEffect(() => {
    if (!callState.active || !callState.startedAt) {
      setCallElapsedSeconds(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setCallElapsedSeconds(Math.floor((Date.now() - callState.startedAt) / 1000));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [callState.active, callState.startedAt]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sessionId) {
      return;
    }

    const link = `${window.location.origin}${window.location.pathname}?session=${encodeURIComponent(sessionId)}`;
    setSessionLink(link);
  }, [sessionId]);

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return currentModules;

    return currentModules.filter((module) => {
      const haystack = `${module.title} ${module.features.join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [currentModules, query]);

  const visibleModule = useMemo(() => {
    if (!selectedModule) return filteredModules[0] || null;

    const matchingModule = filteredModules.find((module) => module.title === selectedModule.title);
    if (matchingModule) return matchingModule;

    if (selectedModule.title === 'Profile') {
      return { title: 'Profile', features: ['Name', 'Phone', 'Email', 'Theme', 'Notifications'] };
    }

    if (selectedModule.title === 'Settings') {
      return { title: 'Settings', features: ['Theme', 'Language', 'Notifications', 'Privacy', 'Security', 'Backup', 'Restore', 'Change Password', 'Delete Account', 'Logout'] };
    }

    return filteredModules[0] || null;
  }, [filteredModules, selectedModule]);
  const normalizedRole = role.toLowerCase();
  const roleTitle = normalizedRole === 'parent' ? 'Parent Dashboard' : 'Child Dashboard';
  const activeMessages = conversationMessages;
  const mobileNavItems = useMemo(() => [
    {
      title: 'Chat',
      label: 'Chat',
      icon: (
        <svg viewBox="0 0 24 24" className="nav-svg" aria-hidden="true">
          <path d="M6 6h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3V8a2 2 0 0 1 2-2Z" />
        </svg>
      ),
    },
    {
      title: normalizedRole === 'parent' ? 'Tasks & Rewards' : 'Tasks',
      label: 'Tasks',
      icon: (
        <svg viewBox="0 0 24 24" className="nav-svg" aria-hidden="true">
          <path d="m5 12 4 4 10-10" />
        </svg>
      ),
    },
    {
      title: 'Live Location',
      label: 'Location',
      icon: (
        <svg viewBox="0 0 24 24" className="nav-svg" aria-hidden="true">
          <path d="M12 21s6-5.96 6-10a6 6 0 1 0-12 0c0 4.04 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      ),
    },
    {
      title: 'Notifications',
      label: 'Alerts',
      icon: (
        <svg viewBox="0 0 24 24" className="nav-svg" aria-hidden="true">
          <path d="M8 16h8" />
          <path d="M9 16V10a3 3 0 1 1 6 0v6" />
          <path d="M10 18h4" />
          <path d="M10 5h4" />
        </svg>
      ),
    },
    {
      title: 'Profile',
      label: 'Profile',
      icon: (
        <svg viewBox="0 0 24 24" className="nav-svg" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </svg>
      ),
    },
    {
      title: 'Settings',
      label: 'Settings',
      icon: (
        <svg viewBox="0 0 24 24" className="nav-svg" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7.1 7.1 0 0 0-.1-1l2-1.5-2-3.4-2.5 1a7.2 7.2 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a7.2 7.2 0 0 0-1.7 1l-2.5-1-2 3.4 2 1.5a7.1 7.1 0 0 0-.1 1 7.1 7.1 0 0 0 .1 1l-2 1.5 2 3.4 2.5-1a7.2 7.2 0 0 0 1.7 1l.3 2.6h4l.3-2.6a7.2 7.2 0 0 0 1.7-1l2.5 1 2-3.4-2-1.5c.1-.3.1-.6.1-1Z" />
        </svg>
      ),
    },
  ], [normalizedRole]);
  const portalNotifications = normalizedRole === 'child'
    ? notifications.filter((item) => item.target?.toLowerCase() === 'child')
    : [];
  const canSendNotification = normalizedRole === 'parent';
  const oppositeRole = normalizedRole === 'parent' ? 'child' : 'parent';

  const submitAppRequest = () => {
    const description = appRequestDraft.description.trim();

    if (!description || normalizedRole !== 'child') {
      return;
    }

    setAppRequests((current) => [
      {
        id: Date.now(),
        type: appRequestDraft.type,
        description,
        sender: 'Child',
        status: 'pending',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...current,
    ]);

    setAppRequestDraft({ type: 'App Unlock', description: '' });
  };

  const toggleMonitoringApp = (appId) => {
    if (normalizedRole !== 'parent') {
      return;
    }

    setMonitoringApps((current) => current.map((app) => (
      app.id === appId ? { ...app, blocked: !app.blocked } : app
    )));
  };

  const updateAppRequestStatus = (requestId, nextStatus) => {
    if (normalizedRole !== 'parent') {
      return;
    }

    setAppRequests((current) => current.map((request) => (
      request.id === requestId
        ? { ...request, status: nextStatus }
        : request
    )));
  };

  const shareLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextPoint = {
          shared: true,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setLiveLocations((current) => ({
          ...current,
          [normalizedRole]: nextPoint,
        }));
        setLocationStatus(`${normalizedRole === 'parent' ? 'Parent' : 'Child'} location shared successfully.`);
      },
      () => {
        setLocationStatus('Location access was denied. Please allow location permission to share your live position.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const sendMessage = () => {
    const trimmed = draftMessage.trim();

    if (!trimmed) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: role === 'parent' ? 'Parent' : 'Child',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextMessages = [...conversationMessages, newMessage];
    setConversationMessages(nextMessages);
    broadcastSharedState({ type: 'conversation', conversationMessages: nextMessages });
    setDraftMessage('');
  };

  const startCall = async (mode) => {
    const label = mode === 'voice' ? 'Voice call' : 'Video call';
    const nextLine = {
      id: Date.now(),
      sender: role === 'parent' ? 'Parent' : 'Child',
      text: `${label} started with ${role === 'parent' ? 'your child' : 'your parent'}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (callState.active || callState.incoming) {
      endCall();
    }

    const callId = Date.now();
    const outgoingState = {
      callId,
      mode,
      status: `${label} ringing...`,
      incoming: false,
      outgoing: true,
      active: false,
      muted: false,
      cameraOn: mode === 'video',
      peerCameraOn: true,
      startedAt: null,
    };

    if (mode === 'video') {
      await startLocalCamera();
    }

    const nextMessages = [...conversationMessages, nextLine];
    setConversationMessages(nextMessages);
    broadcastSharedState({ type: 'conversation', conversationMessages: nextMessages });
    setCallState(outgoingState);
    setSelectedModule((currentModules.find((module) => module.title === 'Chat') || currentModules[0]));
    broadcastSharedState({ type: 'call', callState: outgoingState });
    playRingtone();
  };

  const receiveCall = (mode) => {
    const label = mode === 'voice' ? 'Voice call' : 'Video call';
    const incomingState = { mode, status: `${label} ringing...`, incoming: true, active: false, muted: false, cameraOn: true, peerCameraOn: true, startedAt: null };
    setCallState(incomingState);
    setSelectedModule((currentModules.find((module) => module.title === 'Chat') || currentModules[0]));
    broadcastSharedState({ type: 'call', callState: incomingState });
  };

  const acceptCall = async () => {
    if (callState.mode === 'video') {
      await startLocalCamera();
    }

    stopRingtone();
    const label = callState.mode === 'voice' ? 'Voice call' : 'Video call';
    const connectedState = {
      ...callState,
      status: `${label} connected. You can now talk.`,
      incoming: false,
      outgoing: false,
      active: true,
      startedAt: Date.now(),
      peerCameraOn: true,
    };
    setCallState(connectedState);
    setSelectedModule((currentModules.find((module) => module.title === 'Chat') || currentModules[0]));
    broadcastSharedState({ type: 'call', callState: connectedState });
  };

  const endCall = () => {
    stopLocalStream();
    stopRingtone();
    const endedState = { callId: null, mode: '', status: 'Call ended.', incoming: false, active: false, muted: false, cameraOn: true, peerCameraOn: true, startedAt: null };
    setCallState(endedState);
    broadcastSharedState({ type: 'call', callState: endedState });
  };

  const rejectCall = () => {
    endCall();
  };

  const toggleMute = () => {
    setCallState((current) => {
      const nextState = { ...current, muted: !current.muted };
      broadcastSharedState({ type: 'call', callState: nextState });
      return nextState;
    });
  };

  const toggleCamera = () => {
    setCallState((current) => {
      const nextState = { ...current, cameraOn: !current.cameraOn, peerCameraOn: !current.cameraOn };

      if (localStream) {
        localStream.getVideoTracks().forEach((track) => {
          track.enabled = !current.cameraOn;
        });
      }

      broadcastSharedState({ type: 'call', callState: nextState });
      return nextState;
    });
  };

  const sendNotification = () => {
    const trimmed = notificationDraft.trim();

    if (!trimmed || !canSendNotification) {
      return;
    }

    const newNotification = {
      id: Date.now(),
      sender: 'Parent',
      target: 'Child',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setNotifications((current) => [...current, newNotification]);
    setNotificationDraft('');
  };

  const handleTaskFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTaskDraft((current) => ({
        ...current,
        attachmentName: file.name,
        attachmentUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleTaskSolutionFileUpload = (event, taskId) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTaskSolutionDrafts((current) => ({
        ...current,
        [taskId]: {
          text: current[taskId]?.text || '',
          fileName: file.name,
          fileUrl: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const uploadTask = () => {
    const title = taskDraft.title.trim();
    const description = taskDraft.description.trim();

    if (!title || !description || !canSendNotification) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      assignee: 'Child',
      sender: 'Parent',
      status: 'pending',
      feedback: '',
      attachmentName: taskDraft.attachmentName,
      attachmentUrl: taskDraft.attachmentUrl,
      solutionFileName: '',
      solutionFileUrl: '',
    };

    setTasks((current) => [newTask, ...current]);
    setTaskDraft({ title: '', description: '', attachmentName: '', attachmentUrl: '' });
  };

  const sendReward = () => {
    const title = rewardDraft.title.trim();
    const description = rewardDraft.description.trim();
    const amount = Number(rewardDraft.amount);

    if (!title || !description || !canSendNotification || Number.isNaN(amount) || amount <= 0) {
      return;
    }

    setRewards((current) => [
      {
        id: Date.now(),
        title,
        description,
        amount,
        recipient: 'Child',
        sentBy: 'Parent',
        status: 'received',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...current,
    ]);

    setRewardDraft({ title: '', description: '', amount: 10 });
  };

  const submitTaskSolution = (taskId) => {
    const draft = taskSolutionDrafts[taskId] || {};
    const solution = (draft.text || '').trim();
    const hasFile = Boolean(draft.fileUrl);

    if ((!solution && !hasFile) || normalizedRole !== 'child') {
      return;
    }

    setTasks((current) => current.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      return {
        ...task,
        status: 'completed',
        feedback: solution || 'Completed with uploaded file.',
        solutionFileName: draft.fileName || '',
        solutionFileUrl: draft.fileUrl || '',
      };
    }));

    setTaskSolutionDrafts((current) => ({ ...current, [taskId]: { text: '', fileName: '', fileUrl: '' } }));
  };

  const getAiResponse = (message) => {
    const text = message.toLowerCase();

    if (normalizedRole === 'parent') {
      if (text.includes('location') || text.includes('safe') || text.includes('route')) {
        return 'I recommend opening the Live Location module first, then checking whether the child is inside the expected safe zone and reviewing the latest route details. If anything looks unusual, send a quick alert from the notification panel.';
      }

      if (text.includes('screen') || text.includes('time')) {
        return 'Please open the Screen Time module and compare the child’s usage limit with the current activity. If it is above the expected range, reduce the daily limit and then send a quick reminder.';
      }

      if (text.includes('notification') || text.includes('alert')) {
        return 'Use the Notifications module to send a targeted alert to the child. This is the fastest way to communicate urgent reminders, safety messages, and time-sensitive updates.';
      }

      if (text.includes('summary') || text.includes('today')) {
        return 'A strong parent summary should include child status, live location, recent notifications, task progress, and any safety alerts. That gives you a complete overview of the day in one pass.';
      }

      if (text.includes('offline') || text.includes('internet')) {
        return 'Check the child’s internet status in the dashboard first. If the device is offline, confirm connectivity and then send a follow-up alert so the child knows what to do next.';
      }

      return 'For the parent portal, I can help you review child safety, live location, screen time, task progress, and urgent alerts. Ask me in plain language and I’ll give you a clear action step.';
    }

    if (text.includes('homework') || text.includes('study') || text.includes('lesson')) {
      return 'Start by opening the task file, reading the assignment carefully, and creating a short action plan. After that, solve the work step by step and upload your final result through the task panel.';
    }

    if (text.includes('reward') || text.includes('coin') || text.includes('achievement')) {
      return 'You can improve your reward progress by completing tasks on time, staying consistent with your study plan, and submitting your work before the deadline.';
    }

    if (text.includes('schedule') || text.includes('time') || text.includes('plan')) {
      return 'A good daily plan is to finish your homework first, then review your schedule, then complete the remaining learning activity before the rewards section.';
    }

    if (text.includes('what should i do') || text.includes('help me')) {
      return 'Please open your Tasks section and read the newest assigned work. Then solve it step by step and upload your answer or file back to the parent so the task can be completed properly.';
    }

    return 'I can help you with homework, daily tasks, study planning, reward progress, and how to complete your work properly. Just ask me in simple words and I’ll guide you through it.';
  };

  const sendAiMessage = () => {
    const trimmed = aiDraft.trim();

    if (!trimmed) {
      return;
    }

    const newUserMessage = {
      id: Date.now(),
      sender: normalizedRole === 'parent' ? 'Parent' : 'Child',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const aiReply = {
      id: Date.now() + 1,
      sender: 'AI Assistant',
      text: getAiResponse(trimmed),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((current) => ({
      ...current,
      [normalizedRole]: [...(current[normalizedRole] || []), newUserMessage, aiReply],
    }));
    setAiDraft('');
  };

  const selectedChild = childRecords.find((child) => child.id === selectedChildId) || childRecords[0] || null;

  const attendanceSummary = useMemo(() => {
    const targetChildId = normalizedRole === 'child' ? (childRecords[0]?.id ?? null) : (selectedChildId ?? childRecords[0]?.id ?? null);
    const logsForChild = attendanceLogs.filter((entry) => entry.childId === targetChildId);
    const total = logsForChild.length;
    const presentCount = logsForChild.filter((entry) => entry.status === 'Present').length;
    const lateCount = logsForChild.filter((entry) => entry.status === 'Late').length;
    const absentCount = logsForChild.filter((entry) => entry.status === 'Absent').length;

    return {
      targetChildId,
      total,
      presentCount,
      lateCount,
      absentCount,
      percentage: total ? Math.round((presentCount / total) * 100) : 0,
      logsForChild,
    };
  }, [attendanceLogs, childRecords, normalizedRole, selectedChildId]);

  const resetChildManagementForm = () => {
    setChildManagementForm({ name: '', age: '', email: '', status: 'Active' });
    setEditingChildId(null);
  };

  const addChildRecord = () => {
    const name = childManagementForm.name.trim();
    const email = childManagementForm.email.trim();
    const age = childManagementForm.age.trim();

    if (!name || !email || !age) {
      return;
    }

    if (editingChildId) {
      setChildRecords((current) => current.map((child) => child.id === editingChildId
        ? {
            ...child,
            name,
            age: Number(age),
            email,
            status: childManagementForm.status,
          }
        : child));

      setSelectedChildId(editingChildId);
      resetChildManagementForm();
      return;
    }

    const newChild = {
      id: Date.now(),
      name,
      age: Number(age),
      email,
      status: childManagementForm.status,
    };

    setChildRecords((current) => [newChild, ...current]);
    setSelectedChildId(newChild.id);
    resetChildManagementForm();
  };

  const editChildRecord = (child) => {
    setSelectedChildId(child.id);
    setEditingChildId(child.id);
    setChildManagementForm({
      name: child.name,
      age: String(child.age),
      email: child.email,
      status: child.status,
    });
  };

  const removeChildRecord = (childId) => {
    setChildRecords((current) => {
      const nextRecords = current.filter((child) => child.id !== childId);

      if (selectedChildId === childId) {
        setSelectedChildId(nextRecords[0]?.id ?? null);
      }

      return nextRecords;
    });

    if (editingChildId === childId) {
      resetChildManagementForm();
    }
  };

  const toggleChildStatus = (childId) => {
    setChildRecords((current) => current.map((child) => ({
      ...child,
      status: child.id === childId ? (child.status === 'Active' ? 'Inactive' : 'Active') : child.status,
    })));
  };

  const logAttendance = () => {
    const childId = Number(attendanceForm.childId);
    const note = attendanceForm.note.trim();

    if (!childId || !note) {
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    setAttendanceLogs((current) => {
      const existingIndex = current.findIndex((entry) => entry.childId === childId && entry.date === today);

      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          status: attendanceForm.status,
          note,
        };
        return updated;
      }

      return [
        {
          id: Date.now(),
          childId,
          date: today,
          status: attendanceForm.status,
          note,
        },
        ...current,
      ];
    });

    setAttendanceForm((current) => ({ ...current, note: '' }));
  };

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const nextTheme = profileForm.theme;
    const nextNotifications = profileForm.notifications;

    setSettings((current) => ({
      ...current,
      theme: nextTheme,
      notifications: nextNotifications,
    }));
    setIsEditingProfile(false);
    setSettingsStatus('Profile updated successfully.');
  };

  const savePassword = () => {
    const password = settings.password.trim();

    if (!password) {
      return;
    }

    setSettingsStatus('Password updated successfully.');
    setSettings((current) => ({ ...current, password: '' }));
  };

  const syncBackup = () => {
    setSettingsStatus('Backup and restore settings synced successfully.');
    setSettings((current) => ({ ...current, backup: 'Synced' }));
  };

  const restoreBackup = () => {
    setSettingsStatus('Restore completed from the latest family backup.');
    setSettings((current) => ({ ...current, backup: 'Restored' }));
  };

  const deleteAccount = () => {
    setSettingsStatus('Account settings cleared. Please login again to continue.');
    setScreen('login');
    setRole('parent');
    setSettings({
      theme: 'Dark',
      language: 'English',
      notifications: true,
      privacy: 'Family Only',
      security: 'Strong',
      backup: 'Synced',
      password: '',
    });
  };

  const handleAuthLogin = (event) => {
    event.preventDefault();

    const formToUse = loginRole === 'parent' ? parentForm : childForm;
    const accountList = authAccounts[loginRole] || [];
    const accountMatch = accountList.find((account) => account.email.toLowerCase() === formToUse.email.trim().toLowerCase() && account.password === formToUse.password);

    if (!formToUse.email.trim() || !formToUse.password.trim()) {
      setAuthMessage('Please enter both email and password.');
      return;
    }

    if (!accountMatch) {
      setAuthMessage('Authentication failed. Please use the correct portal email and password.');
      return;
    }

    setRole(loginRole);
    setSelectedModule((loginRole === 'parent'
      ? (data.parent.find((module) => module.title === 'Chat') || data.parent[0])
      : (data.child.find((module) => module.title === 'Chat') || data.child[0])));
    setAuthMessage(rememberMe
      ? `${loginRole === 'parent' ? 'Parent' : 'Child'} session saved and remembered on this device.`
      : `${loginRole === 'parent' ? 'Parent' : 'Child'} session is active for this visit.`);
    setScreen('dashboard');
  };

  const handleRegister = () => {
    const formToUse = loginRole === 'parent' ? parentForm : childForm;
    const email = formToUse.email.trim().toLowerCase();
    const password = formToUse.password.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      setAuthMessage('Please enter a valid email address to create an account.');
      return;
    }

    if (!password || password.length < 6) {
      setAuthMessage('Password must be at least 6 characters long.');
      return;
    }

    const existingAccount = (authAccounts[loginRole] || []).find((account) => account.email.toLowerCase() === email);

    if (existingAccount) {
      setAuthMessage('This account already exists in the selected portal. Please login instead.');
      return;
    }

    setAuthAccounts((current) => ({
      ...current,
      [loginRole]: [...(current[loginRole] || []), { email, password }],
    }));

    if (loginRole === 'parent') {
      setParentForm((current) => ({ ...current, email: '', password: '' }));
    } else {
      setChildForm((current) => ({ ...current, email: '', password: '' }));
    }

    setAuthMode('login');
    setAuthMessage(`New ${loginRole} account created successfully. Please log in with the same email and password.`);
  };

  const handleForgotPassword = () => {
    const formToUse = loginRole === 'parent' ? parentForm : childForm;

    if (!formToUse.email.trim()) {
      setAuthMessage('Enter your email first to request a password reset.');
      return;
    }

    setAuthMode('otp');
    setOtpCode('123456');
    setAuthMessage('Password reset OTP is ready. Use code 123456 to verify the reset request.');
  };

  const handleVerifyOtp = () => {
    if (otpCode.trim() !== '123456') {
      setAuthMessage('Invalid OTP. Please use the demo code 123456.');
      return;
    }

    setAuthMode('login');
    setOtpCode('');
    setAuthMessage('OTP verified successfully. Password reset instructions can now be sent to the account email.');
  };

  const handleBiometricLogin = () => {
    const formToUse = loginRole === 'parent' ? parentForm : childForm;

    if (!formToUse.email.trim()) {
      setAuthMessage('Enter your email to continue biometric login.');
      return;
    }

    setBiometricEnabled(true);
    setAuthMessage('Biometric login enabled for this device. You can now continue into the selected portal.');
  };

  const selectPlan = (plan) => {
    setSubscriptionPlan(plan);
    setSubscriptionMessage(`You upgraded to ${plan}. Access is now enabled for both parent and child views.`);
  };

  const updateHealth = (field, value) => {
    setHealthState((current) => ({ ...current, [field]: value }));
  };

  const handleLogout = () => {
    setScreen('login');
    setRole('parent');
    setAuthMode('register');
    setAuthMessage('Create a new parent or child account first, then log in with the same email and password.');
    setQuery('');
    setDraftMessage('');
    setNotificationDraft('');
    setTaskDraft({ title: '', description: '', attachmentName: '', attachmentUrl: '' });
    setTaskSolutionDrafts({});
    setSelectedModule(data.parent.find((module) => module.title === 'Chat') || data.parent[0]);
    setParentForm({ email: '', password: '' });
    setChildForm({ email: '', password: '' });
    setCallState({ mode: '', status: '', incoming: false, active: false, muted: false, cameraOn: true, peerCameraOn: true, startedAt: null });
    setCallElapsedSeconds(0);
  };

  const callOverlayVisible = Boolean(callState.status && (callState.incoming || callState.active || callState.status.includes('connecting') || callState.status.includes('ringing')));

  return (
    <div className="app-shell">
      {callOverlayVisible && (
        <div className={`full-screen-call ${callState.incoming ? 'incoming' : 'active'}`}>
          <div className="call-overlay-glow" />
          <div className="call-screen-card">
            <div className="call-screen-avatar">{role === 'parent' ? 'C' : 'P'}</div>
            <p className="pill">{callState.mode === 'voice' ? 'Voice call' : 'Video call'}</p>
            <h2>{callState.incoming ? 'Incoming family call' : 'Connected call'}</h2>
            <p className="call-screen-status">{callState.status}</p>
            {callState.mode === 'video' && (
              <div className="video-call-preview-grid">
                <div className={`camera-card ${callState.cameraOn ? 'camera-on' : 'camera-off'}`}>
                  <div className="camera-card-label">{role === 'parent' ? 'Parent camera' : 'Child camera'}</div>
                  <video ref={localVideoRef} className="camera-video" autoPlay muted playsInline />
                  <div className="camera-preview-icon">{callState.cameraOn ? '📹' : '📷'}</div>
                  <span>{callState.cameraOn ? 'Camera live' : 'Camera paused'}</span>
                </div>
                <div className={`camera-card ${callState.peerCameraOn ? 'camera-on' : 'camera-off'}`}>
                  <div className="camera-card-label">{role === 'parent' ? 'Child camera' : 'Parent camera'}</div>
                  <video ref={remoteVideoRef} className="camera-video" autoPlay muted playsInline />
                  <div className="camera-preview-icon">{callState.peerCameraOn ? '📹' : '📷'}</div>
                  <span>{callState.peerCameraOn ? 'Remote camera live' : 'Remote camera paused'}</span>
                </div>
              </div>
            )}
            {callState.active && <div className="call-timer">{formatCallDuration(callElapsedSeconds)}</div>}
            <div className="call-screen-actions">
              {callState.incoming ? (
                <>
                  <button type="button" className="call-action accept" onClick={acceptCall}>Accept</button>
                  <button type="button" className="call-action reject" onClick={endCall}>Decline</button>
                </>
              ) : (
                <>
                  <button type="button" className={`call-action ${callState.muted ? 'active-toggle' : ''}`} onClick={toggleMute}>{callState.muted ? 'Unmute' : 'Mute'}</button>
                  <button type="button" className={`call-action ${!callState.cameraOn ? 'active-toggle' : ''}`} onClick={toggleCamera}>{callState.cameraOn ? 'Camera On' : 'Camera Off'}</button>
                  <button type="button" className="call-action reject" onClick={endCall}>End</button>
                </>
              )}
            </div>
            <p className="section-subtitle">{peerPresence ? 'Linked device is connected and ready.' : 'Link another device to mirror chat and calls.'}</p>
          </div>
        </div>
      )}

      {screen === 'login' && (
        <section className="auth-grid">
          <div className="auth-card">
            <form
              className="auth-form"
              onSubmit={authMode === 'register'
                ? (event) => {
                    event.preventDefault();
                    handleRegister();
                  }
                : handleAuthLogin}
            >
              <div className="portal-select">
                <select
                  aria-label="Portal"
                  value={loginRole}
                  onChange={(event) => setLoginRole(event.target.value)}
                >
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                </select>
              </div>

              <label>
                Email
                <input
                  type="email"
                  placeholder={loginRole === 'parent' ? 'parent@family.com' : 'child@family.com'}
                  value={loginRole === 'parent' ? parentForm.email : childForm.email}
                  onChange={(event) => {
                    if (loginRole === 'parent') {
                      setParentForm((current) => ({ ...current, email: event.target.value }));
                    } else {
                      setChildForm((current) => ({ ...current, email: event.target.value }));
                    }
                  }}
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  value={loginRole === 'parent' ? parentForm.password : childForm.password}
                  onChange={(event) => {
                    if (loginRole === 'parent') {
                      setParentForm((current) => ({ ...current, password: event.target.value }));
                    } else {
                      setChildForm((current) => ({ ...current, password: event.target.value }));
                    }
                  }}
                />
              </label>

              <div className="auth-actions-row">
                {authMode === 'register' ? (
                  <>
                    <button type="submit" className="primary-button">
                      Create {loginRole === 'parent' ? 'Parent' : 'Child'} Account
                    </button>
                    <button type="button" className="ghost-button" onClick={() => { setAuthMode('login'); setAuthMessage('Please log in with your existing account.'); }}>
                      Login Instead
                    </button>
                  </>
                ) : (
                  <>
                    <button type="submit" className="primary-button">
                      Login as {loginRole === 'parent' ? 'Parent' : 'Child'}
                    </button>
                    <button type="button" className="ghost-button" onClick={() => { setAuthMode('register'); setAuthMessage('Create a new parent or child account first, then log in.'); }}>
                      Create Account
                    </button>
                  </>
                )}
              </div>

              {authMode === 'otp' && (
                <div className="otp-panel">
                  <label>
                    OTP Code
                    <input
                      type="text"
                      placeholder="123456"
                      value={otpCode}
                      onChange={(event) => setOtpCode(event.target.value)}
                    />
                  </label>
                  <button type="button" className="primary-button" onClick={handleVerifyOtp}>
                    Verify OTP
                  </button>
                </div>
              )}

              <p className="auth-message">{authMessage}</p>
            </form>
          </div>
        </section>
      )}

      {screen === 'dashboard' && (
        <>
          <section className="toolbar">
            <div className="portal-badge">
              <span className="pill">{role === 'parent' ? 'Parent Portal' : 'Child Portal'}</span>
            </div>

            <div className="toolbar-actions">
              <button className="ghost-button" type="button" onClick={copySessionLink}>
                {sessionLinkCopied ? 'Link copied' : 'Link device'}
              </button>
              <button className="ghost-button" onClick={handleLogout} type="button">
                Logout
              </button>
            </div>
          </section>

          <main>
            <section className="section-card">
              <div className="section-title-row">
                <div>
                  <h2>{roleTitle}</h2>
                </div>
              </div>


              <div className="dashboard-layout mobile-dashboard">
                {visibleModule && (
                  <div className="detail-panel">
                    <span className="detail-kicker">Selected action</span>
                    <h3>{visibleModule.title}</h3>

                    {visibleModule.title === 'Chat' ? (
                      <div className="chat-window">
                        <div className="chat-header">
                          <div className="chat-contact">
                            <div className="chat-avatar">{role === 'parent' ? 'C' : 'P'}</div>
                            <div>
                              <strong>{role === 'parent' ? 'Child Contact' : 'Parent Contact'}</strong>
                              <span>online • last seen just now</span>
                            </div>
                          </div>
                          <div className="chat-actions">
                            <button type="button" className="icon-pill" onClick={() => startCall('voice')}>📞</button>
                            <button type="button" className="icon-pill" onClick={() => startCall('video')}>🎥</button>
                          </div>
                        </div>

                        {callState.status && (
                          <div className={`call-status-banner ${callState.incoming ? 'incoming' : ''} ${callState.active ? 'active' : ''}`}>
                            <div>
                              <strong>{callState.mode === 'voice' ? 'Voice Call' : 'Video Call'}</strong>
                              <span>{callState.status}</span>
                            </div>
                            {callState.incoming && (
                              <div className="call-actions-row">
                                <button type="button" className="call-action accept" onClick={acceptCall}>Accept</button>
                                <button type="button" className="call-action reject" onClick={rejectCall}>Reject</button>
                              </div>
                            )}
                            {!callState.incoming && callState.active && (
                              <div className="call-actions-row">
                                <button type="button" className={`call-action ${callState.muted ? 'active-toggle' : ''}`} onClick={toggleMute}>{callState.muted ? 'Unmute' : 'Mute'}</button>
                                <button type="button" className={`call-action ${!callState.cameraOn ? 'active-toggle' : ''}`} onClick={toggleCamera}>{callState.cameraOn ? 'Camera On' : 'Camera Off'}</button>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="chat-body">
                          <div className="chat-day">Today</div>
                          {activeMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`chat-message ${message.sender === (role === 'parent' ? 'Parent' : 'Child') ? 'self' : 'other'}`}
                            >
                              <span className="message-sender">{message.sender}</span>
                              <p>{message.text}</p>
                              <small>{message.time}</small>
                            </div>
                          ))}
                        </div>

                        <div className="chat-compose">
                          <input
                            type="text"
                            placeholder="Type a message"
                            value={draftMessage}
                            onChange={(event) => setDraftMessage(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                                sendMessage();
                              }
                            }}
                          />
                          <button type="button" className="send-button" onClick={sendMessage}>
                            ➤
                          </button>
                        </div>
                      </div>
                    ) : visibleModule.title === 'Live Location' ? (
                      <div className="location-panel">
                        <div className="location-actions">
                          <button type="button" className="primary-button" onClick={shareLiveLocation}>
                            Share My Live Location
                          </button>
                          <p className="location-status">{locationStatus}</p>
                        </div>

                        <div className="location-grid">
                          <div className="location-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">My location</span>
                                <h3>{normalizedRole === 'parent' ? 'Parent Position' : 'Child Position'}</h3>
                              </div>
                              <span className="count-badge">{liveLocations[normalizedRole].shared ? 'Live' : 'Offline'}</span>
                            </div>

                            <p className="section-subtitle">Last updated: {liveLocations[normalizedRole].updatedAt}</p>
                            <div className="location-points">
                              <span>Latitude: {liveLocations[normalizedRole].lat.toFixed(4)}</span>
                              <span>Longitude: {liveLocations[normalizedRole].lng.toFixed(4)}</span>
                            </div>
                            <a
                              className="task-file-link"
                              href={`https://www.google.com/maps?q=${liveLocations[normalizedRole].lat},${liveLocations[normalizedRole].lng}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open map view
                            </a>
                          </div>

                          <div className="location-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">Shared with me</span>
                                <h3>{oppositeRole === 'parent' ? 'Parent Position' : 'Child Position'}</h3>
                              </div>
                              <span className="count-badge">{liveLocations[oppositeRole].shared ? 'Visible' : 'Hidden'}</span>
                            </div>

                            <p className="section-subtitle">Last updated: {liveLocations[oppositeRole].updatedAt}</p>
                            <div className="location-points">
                              <span>Latitude: {liveLocations[oppositeRole].lat.toFixed(4)}</span>
                              <span>Longitude: {liveLocations[oppositeRole].lng.toFixed(4)}</span>
                            </div>
                            <a
                              className="task-file-link"
                              href={`https://www.google.com/maps?q=${liveLocations[oppositeRole].lat},${liveLocations[oppositeRole].lng}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open shared map view
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : visibleModule.title === 'App Requests' ? (
                      <div className="request-panel">
                        {normalizedRole === 'child' ? (
                          <div className="request-form-card">
                            <div className="section-title-row">
                              <div>
                                <h3>Send App Request</h3>
                                <p className="section-subtitle">Ask for app access, internet time, or a phone permission change.</p>
                              </div>
                            </div>

                            <div className="request-form">
                              <label>
                                Request Type
                                <select
                                  value={appRequestDraft.type}
                                  onChange={(event) => setAppRequestDraft((current) => ({ ...current, type: event.target.value }))}
                                >
                                  <option value="App Unlock">App Unlock</option>
                                  <option value="Install Request">Install Request</option>
                                  <option value="More Time Request">More Time Request</option>
                                  <option value="Permission Request">Permission Request</option>
                                  <option value="Internet Request">Internet Request</option>
                                  <option value="Camera Permission">Camera Permission</option>
                                  <option value="Microphone Permission">Microphone Permission</option>
                                  <option value="GPS Permission">GPS Permission</option>
                                  <option value="Download Request">Download Request</option>
                                </select>
                              </label>

                              <label>
                                Description
                                <textarea
                                  rows="4"
                                  placeholder="Describe the app request you need from your parent"
                                  value={appRequestDraft.description}
                                  onChange={(event) => setAppRequestDraft((current) => ({ ...current, description: event.target.value }))}
                                />
                              </label>

                              <button type="button" className="primary-button" onClick={submitAppRequest}>
                                Submit Request
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="request-form-card">
                            <div className="section-title-row">
                              <div>
                                <h3>Review App Requests</h3>
                                <p className="section-subtitle">Approve or reject app requests sent by the child.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="request-list">
                          {appRequests.map((request) => (
                            <div key={request.id} className="request-item">
                              <div className="request-meta">
                                <strong>{request.type}</strong>
                                <span>{request.time}</span>
                              </div>
                              <p>{request.description}</p>
                              <div className="request-meta request-row">
                                <span className={`request-status ${request.status}`}>{request.status}</span>
                                {normalizedRole === 'parent' && request.status === 'pending' && (
                                  <div className="request-actions">
                                    <button type="button" className="ghost-button" onClick={() => updateAppRequestStatus(request.id, 'approved')}>
                                      Approve
                                    </button>
                                    <button type="button" className="ghost-button danger" onClick={() => updateAppRequestStatus(request.id, 'rejected')}>
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : visibleModule.title === 'App Monitoring' ? (
                      <div className="monitoring-panel">
                        <div className="monitoring-grid">
                          <div className="monitoring-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">Device Status</span>
                                <h3>{role === 'parent' ? 'Child Monitoring' : 'Your App Status'}</h3>
                              </div>
                              <span className="count-badge">{role === 'parent' ? 'Live' : 'Safe'}</span>
                            </div>

                            <div className="monitoring-metrics">
                              <div>
                                <span>Online</span>
                                <strong>{role === 'parent' ? 'Connected' : 'Connected'}</strong>
                              </div>
                              <div>
                                <span>Battery</span>
                                <strong>{role === 'parent' ? '82%' : '64%'}</strong>
                              </div>
                              <div>
                                <span>Internet</span>
                                <strong>{role === 'parent' ? 'Stable' : 'Strong'}</strong>
                              </div>
                              <div>
                                <span>Usage</span>
                                <strong>{role === 'parent' ? '146 min' : '118 min'}</strong>
                              </div>
                            </div>
                          </div>

                          <div className="monitoring-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">App Control</span>
                                <h3>{role === 'parent' ? 'Installed Apps' : 'Protected Apps'}</h3>
                              </div>
                              <span className="count-badge">{monitoringApps.length}</span>
                            </div>

                            <div className="monitoring-app-list">
                              {monitoringApps.map((app) => (
                                <div key={app.id} className="monitoring-app-item">
                                  <div>
                                    <strong>{app.name}</strong>
                                    <p>{app.usage}</p>
                                  </div>

                                  {role === 'parent' ? (
                                    <button type="button" className="ghost-button" onClick={() => toggleMonitoringApp(app.id)}>
                                      {app.blocked ? 'Unblock' : 'Block'}
                                    </button>
                                  ) : (
                                    <span className={`request-status ${app.blocked ? 'rejected' : 'approved'}`}>
                                      {app.blocked ? 'Blocked' : 'Allowed'}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : visibleModule.title === 'Notifications' ? (
                      <div className="notification-panel">
                        <div className="notification-list">
                          {portalNotifications.length > 0 ? (
                            portalNotifications.map((item) => (
                              <div key={item.id} className="notification-item">
                                <div className="notification-meta">
                                  <strong>{item.sender}</strong>
                                  <span>{item.time}</span>
                                </div>
                                <p>{item.text}</p>
                              </div>
                            ))
                          ) : (
                            <p className="empty-state">
                              {role === 'parent'
                                ? 'Parent notifications are sent to the child dashboard only.'
                                : 'No parent alerts yet.'}
                            </p>
                          )}
                        </div>

                        {canSendNotification && (
                          <div className="notification-compose">
                            <input
                              type="text"
                              placeholder="Send notification to Child"
                              value={notificationDraft}
                              onChange={(event) => setNotificationDraft(event.target.value)}
                            />
                            <button type="button" className="primary-button" onClick={sendNotification}>
                              Send Alert
                            </button>
                          </div>
                        )}
                      </div>
                    ) : visibleModule.title === 'Child Management' ? (
                      <div className="child-management-panel">
                        <div className="child-management-grid">
                          <div className="child-form-card">
                            <h3>Add Child</h3>
                            <div className="child-form-grid">
                              <label>
                                Child Name
                                <input
                                  type="text"
                                  placeholder="Enter child full name"
                                  value={childManagementForm.name}
                                  onChange={(event) => setChildManagementForm((current) => ({ ...current, name: event.target.value }))}
                                />
                              </label>

                              <label>
                                Age
                                <input
                                  type="number"
                                  placeholder="Enter age"
                                  value={childManagementForm.age}
                                  onChange={(event) => setChildManagementForm((current) => ({ ...current, age: event.target.value }))}
                                />
                              </label>

                              <label>
                                Email
                                <input
                                  type="email"
                                  placeholder="child@family.com"
                                  value={childManagementForm.email}
                                  onChange={(event) => setChildManagementForm((current) => ({ ...current, email: event.target.value }))}
                                />
                              </label>

                              <label>
                                Status
                                <select
                                  value={childManagementForm.status}
                                  onChange={(event) => setChildManagementForm((current) => ({ ...current, status: event.target.value }))}
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              </label>
                            </div>

                            <div className="child-form-actions">
                              <button type="button" className="primary-button" onClick={addChildRecord}>
                                {editingChildId ? 'Save Changes' : 'Add Child'}
                              </button>

                              {editingChildId && (
                                <button type="button" className="ghost-button" onClick={resetChildManagementForm}>
                                  Cancel Edit
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="child-list-card">
                            <h3>Managed Children</h3>
                            <div className="child-record-list">
                              {childRecords.map((child) => (
                                <div key={child.id} className="child-record-item">
                                  <div>
                                    <strong>{child.name}</strong>
                                    <p>{child.age} years • {child.email}</p>
                                    <span className={`child-status ${child.status.toLowerCase()}`}>{child.status}</span>
                                  </div>

                                  <div className="child-actions">
                                    <button type="button" className="ghost-button" onClick={() => editChildRecord(child)}>
                                      Edit
                                    </button>
                                    <button type="button" className="ghost-button" onClick={() => toggleChildStatus(child.id)}>
                                      Toggle Status
                                    </button>
                                    <button type="button" className="ghost-button danger" onClick={() => removeChildRecord(child.id)}>
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {selectedChild && (
                          <div className="child-profile-card">
                            <h3>Selected Child Profile</h3>
                            <div className="profile-grid">
                              <div>
                                <span className="detail-kicker">Name</span>
                                <strong>{selectedChild.name}</strong>
                              </div>
                              <div>
                                <span className="detail-kicker">Age</span>
                                <strong>{selectedChild.age}</strong>
                              </div>
                              <div>
                                <span className="detail-kicker">Email</span>
                                <strong>{selectedChild.email}</strong>
                              </div>
                              <div>
                                <span className="detail-kicker">Status</span>
                                <strong>{selectedChild.status}</strong>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : visibleModule.title === 'Subscription' ? (
                      <div className="subscription-panel">
                        <div className="monitoring-card">
                          <div className="location-card-header">
                            <div>
                              <span className="detail-kicker">Subscription</span>
                              <h3>{role === 'parent' ? 'Manage Family Plan' : 'Your Plan'}</h3>
                            </div>
                            <span className="count-badge">{subscriptionPlan}</span>
                          </div>

                          <div className="monitoring-metrics">
                            <div>
                              <span>Current Plan</span>
                              <strong>{subscriptionPlan}</strong>
                            </div>
                            <div>
                              <span>Billing</span>
                              <strong>Monthly</strong>
                            </div>
                            <div>
                              <span>Status</span>
                              <strong>Active</strong>
                            </div>
                            <div>
                              <span>Access</span>
                              <strong>{role === 'parent' ? 'Parent + Child' : 'Child Dashboard'}</strong>
                            </div>
                          </div>

                          <div className="child-form-actions">
                            <button type="button" className="primary-button" onClick={() => selectPlan('Free Plan')}>
                              Free Plan
                            </button>
                            <button type="button" className="primary-button" onClick={() => selectPlan('Premium')}>
                              Premium
                            </button>
                            <button type="button" className="primary-button" onClick={() => selectPlan('Family Plan')}>
                              Family Plan
                            </button>
                          </div>

                          <p className="settings-status">{subscriptionMessage}</p>
                        </div>
                      </div>
                    ) : visibleModule.title === 'Health' ? (
                      <div className="health-panel">
                        <div className="monitoring-grid">
                          <div className="monitoring-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">Child Health</span>
                                <h3>Today’s Health Summary</h3>
                              </div>
                              <span className="count-badge">Live</span>
                            </div>

                            <div className="monitoring-metrics">
                              <div>
                                <span>Water</span>
                                <strong>{healthState.water}/8 glasses</strong>
                              </div>
                              <div>
                                <span>Sleep</span>
                                <strong>{healthState.sleep} hrs</strong>
                              </div>
                              <div>
                                <span>Steps</span>
                                <strong>{healthState.steps}</strong>
                              </div>
                              <div>
                                <span>Heart Rate</span>
                                <strong>{healthState.heartRate} bpm</strong>
                              </div>
                            </div>
                          </div>

                          <div className="monitoring-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">Wellbeing</span>
                                <h3>Daily Reminders</h3>
                              </div>
                              <span className="count-badge">Active</span>
                            </div>

                            <div className="request-list">
                              <div className="request-item">
                                <strong>Water Reminder</strong>
                                <p>Drink at least 8 glasses of water today.</p>
                              </div>
                              <div className="request-item">
                                <strong>Sleep Reminder</strong>
                                <p>Keep bedtime routine consistent and sleep for 7–8 hours.</p>
                              </div>
                              <div className="request-item">
                                <strong>Exercise</strong>
                                <p>Complete a short walk or stretch session after school.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="monitoring-grid" style={{ marginTop: '1rem' }}>
                          <div className="monitoring-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">Mood & BMI</span>
                                <h3>Personal Health Notes</h3>
                              </div>
                            </div>

                            <div className="request-list">
                              <div className="request-item">
                                <strong>Mood</strong>
                                <select value={healthState.mood} onChange={(event) => updateHealth('mood', event.target.value)}>
                                  <option value="Great">Great</option>
                                  <option value="Okay">Okay</option>
                                  <option value="Tired">Tired</option>
                                  <option value="Stressed">Stressed</option>
                                </select>
                              </div>
                              <div className="request-item">
                                <strong>BMI</strong>
                                <input value={healthState.bmi} onChange={(event) => updateHealth('bmi', event.target.value)} />
                              </div>
                              <div className="request-item">
                                <strong>Health Notes</strong>
                                <textarea value={healthState.note} onChange={(event) => updateHealth('note', event.target.value)} rows="3" />
                              </div>
                              <div className="request-item">
                                <strong>Parent View</strong>
                                <label className="remember-row" style={{ marginTop: '8px' }}>
                                  <input type="checkbox" checked={healthState.parentView} onChange={(event) => updateHealth('parentView', event.target.checked)} />
                                  <span>{healthState.parentView ? 'Shared with parents' : 'Private to child'}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="monitoring-grid" style={{ marginTop: '1rem' }}>
                          <div className="monitoring-card">
                            <div className="location-card-header">
                              <div>
                                <span className="detail-kicker">Quick Actions</span>
                                <h3>Update Health Today</h3>
                              </div>
                            </div>

                            <div className="child-form-actions">
                              <button type="button" className="primary-button" onClick={() => updateHealth('water', Math.min(8, healthState.water + 1))}>
                                +1 Water
                              </button>
                              <button type="button" className="primary-button" onClick={() => updateHealth('sleep', Math.min(10, healthState.sleep + 1))}>
                                +1 Sleep Hr
                              </button>
                              <button type="button" className="primary-button" onClick={() => updateHealth('steps', healthState.steps + 500)}>
                                +500 Steps
                              </button>
                              <button type="button" className="ghost-button" onClick={() => updateHealth('heartRate', Math.max(60, healthState.heartRate - 1))}>
                                Calm Heart Rate
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : visibleModule.title === 'AI Assistant' ? (
                      <div className="ai-assistant-panel">
                        <div className="assistant-shell">
                          <div className="assistant-header-row">
                            <div>
                              <span className="assistant-badge">AI Assistant</span>
                              <h3>{role === 'parent' ? 'Parent Copilot' : 'Child Copilot'}</h3>
                            </div>
                            <span className="assistant-status">Online</span>
                          </div>

                          <div className="assistant-intro">
                            <p>
                              {role === 'parent'
                                ? 'Ask for safety guidance, alerts, monitoring support, or daily family check-ins.'
                                : 'Ask for homework help, task guidance, study planning, or reward motivation.'}
                            </p>
                          </div>

                          <div className="ai-suggestion-row">
                            {aiPromptSuggestions[normalizedRole].map((prompt) => (
                              <button
                                key={prompt}
                                type="button"
                                className="chip-button"
                                onClick={() => setAiDraft(prompt)}
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>

                          <div className="ai-assistant-chat">
                            {(aiMessages[normalizedRole] || []).map((message) => (
                              <div
                                key={message.id}
                                className={`ai-message ${message.sender === 'AI Assistant' ? 'assistant' : 'user'}`}
                              >
                                <span>{message.sender}</span>
                                <p>{message.text}</p>
                                <small>{message.time}</small>
                              </div>
                            ))}
                          </div>

                          <div className="chat-compose ai-compose">
                            <input
                              type="text"
                              placeholder={role === 'parent' ? 'Ask about child safety, tasks, or alerts' : 'Ask about homework, study, or goals'}
                              value={aiDraft}
                              onChange={(event) => setAiDraft(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.preventDefault();
                                  sendAiMessage();
                                }
                              }}
                            />
                            <button type="button" className="primary-button" onClick={sendAiMessage}>
                              Ask AI
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : visibleModule.title === 'Profile' ? (
                      <div className="settings-panel">
                        <div className="settings-shell">
                          <div className={`settings-card profile-card ${settings.theme === 'Light' ? 'profile-card-light' : ''}`}>
                            <div className="profile-header">
                              {profilePhoto ? (
                                <img className="profile-photo" src={profilePhoto} alt="Profile" />
                              ) : (
                                <div className="profile-avatar">
                                  {role === 'parent' ? 'P' : 'C'}
                                </div>
                              )}
                              <div>
                                <strong>{profileForm.fullName}</strong>
                                <span>{profileForm.roleLabel}</span>
                              </div>
                              <span className="count-badge">Verified</span>
                            </div>

                            {isEditingProfile ? (
                              <div className="settings-grid">
                                <label>
                                  Full Name
                                  <input type="text" value={profileForm.fullName} onChange={(event) => setProfileForm((current) => ({ ...current, fullName: event.target.value }))} />
                                </label>
                                <label>
                                  Role
                                  <input type="text" value={profileForm.roleLabel} onChange={(event) => setProfileForm((current) => ({ ...current, roleLabel: event.target.value }))} />
                                </label>
                                <label>
                                  Email
                                  <input type="email" value={profileForm.email} onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))} />
                                </label>
                                <label>
                                  Phone
                                  <input type="text" value={profileForm.phone} onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))} />
                                </label>
                                <label>
                                  Status
                                  <input type="text" value={profileForm.status} onChange={(event) => setProfileForm((current) => ({ ...current, status: event.target.value }))} />
                                </label>
                                <label>
                                  Theme
                                  <select value={profileForm.theme} onChange={(event) => setProfileForm((current) => ({ ...current, theme: event.target.value }))}>
                                    <option value="Dark">Dark</option>
                                    <option value="Light">Light</option>
                                  </select>
                                </label>
                                <label className="remember-row" style={{ gridColumn: '1 / -1' }}>
                                  <input type="checkbox" checked={profileForm.notifications} onChange={(event) => setProfileForm((current) => ({ ...current, notifications: event.target.checked }))} />
                                  <span>Enable notifications</span>
                                </label>
                              </div>
                            ) : (
                              <div className="settings-grid">
                                <label>
                                  Full Name
                                  <input type="text" value={profileForm.fullName} readOnly />
                                </label>
                                <label>
                                  Role
                                  <input type="text" value={profileForm.roleLabel} readOnly />
                                </label>
                                <label>
                                  Email
                                  <input type="text" value={profileForm.email} readOnly />
                                </label>
                                <label>
                                  Phone
                                  <input type="text" value={profileForm.phone} readOnly />
                                </label>
                                <label>
                                  Status
                                  <input type="text" value={profileForm.status} readOnly />
                                </label>
                                <label>
                                  Theme
                                  <input type="text" value={settings.theme} readOnly />
                                </label>
                              </div>
                            )}

                            <div className="settings-actions">
                              {isEditingProfile ? (
                                <>
                                  <label className="upload-label">
                                    Upload Photo
                                    <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} />
                                  </label>
                                  <button type="button" className="primary-button" onClick={saveProfile}>Save Changes</button>
                                  <button type="button" className="ghost-button" onClick={() => { setIsEditingProfile(false); setProfileForm((current) => ({ ...current, notifications: settings.notifications, theme: settings.theme })); }}>Cancel</button>
                                </>
                              ) : (
                                <>
                                  <button type="button" className="primary-button" onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
                                  <button type="button" className="ghost-button">Share Access</button>
                                  <button type="button" className="ghost-button">View History</button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : visibleModule.title === 'Settings' ? (
                      <div className="settings-panel">
                        <div className="settings-shell">
                          <div className="settings-card">
                            <div className="settings-card-title">
                              <strong>Appearance</strong>
                              <span>Theme and language</span>
                            </div>
                            <div className="settings-grid">
                              <div className="settings-row">
                                <span>Theme</span>
                                <select value={settings.theme} onChange={(event) => updateSetting('theme', event.target.value)}>
                                  <option value="Dark">Dark</option>
                                  <option value="Light">Light</option>
                                  <option value="Auto">Auto</option>
                                </select>
                              </div>

                              <div className="settings-row">
                                <span>Language</span>
                                <select value={settings.language} onChange={(event) => updateSetting('language', event.target.value)}>
                                  <option value="English">English</option>
                                  <option value="Urdu">Urdu</option>
                                  <option value="Spanish">Spanish</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="settings-card">
                            <div className="settings-card-title">
                              <strong>Notifications & Privacy</strong>
                              <span>Control how alerts and data are shared</span>
                            </div>
                            <div className="settings-grid">
                              <div className="settings-row">
                                <span>Notifications</span>
                                <select value={settings.notifications ? 'On' : 'Off'} onChange={(event) => updateSetting('notifications', event.target.value === 'On')}>
                                  <option value="On">On</option>
                                  <option value="Off">Off</option>
                                </select>
                              </div>

                              <div className="settings-row">
                                <span>Privacy</span>
                                <select value={settings.privacy} onChange={(event) => updateSetting('privacy', event.target.value)}>
                                  <option value="Family Only">Family Only</option>
                                  <option value="Trusted Contacts">Trusted Contacts</option>
                                  <option value="Public">Public</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="settings-card">
                            <div className="settings-card-title">
                              <strong>Account Security</strong>
                              <span>Password and protection</span>
                            </div>
                            <div className="settings-grid">
                              <div className="settings-row">
                                <span>Security</span>
                                <select value={settings.security} onChange={(event) => updateSetting('security', event.target.value)}>
                                  <option value="Strong">Strong</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Low">Low</option>
                                </select>
                              </div>

                              <div className="settings-row">
                                <span>Change Password</span>
                                <input
                                  type="password"
                                  placeholder="Enter new password"
                                  value={settings.password}
                                  onChange={(event) => updateSetting('password', event.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="settings-card">
                            <div className="settings-card-title">
                              <strong>Backup</strong>
                              <span>Sync, restore, and manage data</span>
                            </div>
                            <div className="settings-grid">
                              <div className="settings-row">
                                <span>Backup Status</span>
                                <input type="text" value={settings.backup} readOnly />
                              </div>
                            </div>

                            <div className="settings-actions">
                              <button type="button" className="primary-button" onClick={savePassword}>
                                Update Password
                              </button>
                              <button type="button" className="ghost-button" onClick={syncBackup}>
                                Sync Backup
                              </button>
                              <button type="button" className="ghost-button" onClick={restoreBackup}>
                                Restore Backup
                              </button>
                              <button type="button" className="ghost-button danger" onClick={deleteAccount}>
                                Delete Account
                              </button>
                            </div>
                          </div>
                        </div>

                        {settingsStatus && <p className="settings-status">{settingsStatus}</p>}
                      </div>
                    ) : visibleModule.title === 'Attendance' ? (
                      <div className="attendance-panel">
                        {normalizedRole === 'parent' ? (
                          <div className="attendance-grid">
                            <div className="attendance-card">
                              <div className="attendance-card-head">
                                <div>
                                  <span className="detail-kicker">Parent Attendance</span>
                                  <h3>Mark Child Attendance</h3>
                                </div>
                                <span className="count-badge">Today</span>
                              </div>

                              <div className="attendance-form">
                                <label>
                                  Child
                                  <select
                                    value={attendanceForm.childId ?? ''}
                                    onChange={(event) => setAttendanceForm((current) => ({ ...current, childId: Number(event.target.value) }))}
                                  >
                                    {childRecords.map((child) => (
                                      <option value={child.id} key={child.id}>{child.name}</option>
                                    ))}
                                  </select>
                                </label>

                                <label>
                                  Status
                                  <select
                                    value={attendanceForm.status}
                                    onChange={(event) => setAttendanceForm((current) => ({ ...current, status: event.target.value }))}
                                  >
                                    <option value="Present">Present</option>
                                    <option value="Late">Late</option>
                                    <option value="Absent">Absent</option>
                                  </select>
                                </label>

                                <label>
                                  Note
                                  <textarea
                                    rows="3"
                                    className="attendance-note"
                                    placeholder="Add school attendance note"
                                    value={attendanceForm.note}
                                    onChange={(event) => setAttendanceForm((current) => ({ ...current, note: event.target.value }))}
                                  />
                                </label>

                                <button type="button" className="primary-button" onClick={logAttendance}>
                                  Save Attendance
                                </button>
                              </div>
                            </div>

                            <div className="attendance-card">
                              <div className="attendance-card-head">
                                <div>
                                  <span className="detail-kicker">Child Progress</span>
                                  <h3>{selectedChild?.name || 'Selected Child'} Attendance</h3>
                                </div>
                                <span className="count-badge">{attendanceSummary.percentage}%</span>
                              </div>

                              <div className="attendance-score">
                                <strong>{attendanceSummary.percentage}%</strong>
                                <span>{attendanceSummary.presentCount} present • {attendanceSummary.lateCount} late • {attendanceSummary.absentCount} absent</span>
                              </div>
                              <div className="attendance-bar">
                                <div style={{ width: `${attendanceSummary.percentage}%` }} />
                              </div>

                              <div className="attendance-history">
                                {attendanceSummary.logsForChild.slice(0, 5).map((entry) => (
                                  <div key={entry.id} className="attendance-history-item">
                                    <div>
                                      <strong>{entry.date}</strong>
                                      <p>{entry.note}</p>
                                    </div>
                                    <span className={`attendance-status-badge ${entry.status.toLowerCase()}`}>{entry.status}</span>
                                  </div>
                                ))}
                              </div>

                            </div>
                          </div>
                        ) : (
                          <div className="attendance-card">
                            <div className="attendance-card-head">
                              <div>
                                <span className="detail-kicker">Your Attendance</span>
                                <h3>{childRecords[0]?.name || 'Child'} attendance percentage</h3>
                              </div>
                              <span className="count-badge">{attendanceSummary.percentage}%</span>
                            </div>

                            <div className="attendance-score">
                              <strong>{attendanceSummary.percentage}%</strong>
                              <span>You have {attendanceSummary.presentCount} present • {attendanceSummary.lateCount} late • {attendanceSummary.absentCount} absent days in the current attendance history.</span>
                            </div>
                            <div className="attendance-bar">
                              <div style={{ width: `${attendanceSummary.percentage}%` }} />
                            </div>

                            <p className="section-subtitle">Parents can mark attendance here. Your result is shown in this percentage panel so you can see your attendance status at a glance.</p>
                          </div>
                        )}
                      </div>
                    ) : visibleModule.title === 'Tasks' || visibleModule.title === 'Tasks & Rewards' ? (
                      <div className="task-flow">
                        {canSendNotification ? (
                          <>
                            <div className="task-form">
                              <label>
                                Task Title
                                <input
                                  type="text"
                                  placeholder="Upload a new task"
                                  value={taskDraft.title}
                                  onChange={(event) => setTaskDraft((current) => ({ ...current, title: event.target.value }))}
                                />
                              </label>

                              <label>
                                Task Details
                                <textarea
                                  rows="4"
                                  placeholder="Describe the task for the child"
                                  value={taskDraft.description}
                                  onChange={(event) => setTaskDraft((current) => ({ ...current, description: event.target.value }))}
                                />
                              </label>

                              <label>
                                Attach Task File
                                <input
                                  className="task-file-input"
                                  type="file"
                                  onChange={handleTaskFileUpload}
                                />
                              </label>

                              {taskDraft.attachmentName && (
                                <p className="task-file-label">Selected file: {taskDraft.attachmentName}</p>
                              )}

                              <button type="button" className="primary-button" onClick={uploadTask}>
                                Upload Task
                              </button>
                            </div>

                            <div className="task-form">
                              <label>
                                Reward Title
                                <input
                                  type="text"
                                  placeholder="Reward name"
                                  value={rewardDraft.title}
                                  onChange={(event) => setRewardDraft((current) => ({ ...current, title: event.target.value }))}
                                />
                              </label>

                              <label>
                                Reward Details
                                <textarea
                                  rows="3"
                                  placeholder="Add a short reward note"
                                  value={rewardDraft.description}
                                  onChange={(event) => setRewardDraft((current) => ({ ...current, description: event.target.value }))}
                                />
                              </label>

                              <label>
                                Reward Points
                                <input
                                  type="number"
                                  min="1"
                                  value={rewardDraft.amount}
                                  onChange={(event) => setRewardDraft((current) => ({ ...current, amount: Number(event.target.value) }))}
                                />
                              </label>

                              <button type="button" className="primary-button" onClick={sendReward}>
                                Send Reward
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="section-subtitle">Solve the assigned tasks and send your response back to the parent.</p>
                        )}

                        <div className="task-list">
                          {!canSendNotification && (
                            <div className="task-card">
                              <div className="task-card-header">
                                <strong>Your Rewards</strong>
                                <span className="task-status received">received</span>
                              </div>
                              <p>Parents can reward you here. Your reward points appear below.</p>
                              {rewards.map((reward) => (
                                <div key={reward.id} className="task-result">
                                  <strong>{reward.title}</strong>
                                  <p>{reward.description}</p>
                                  <span className="task-meta">+{reward.amount} points • {reward.time}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {tasks.map((task) => (
                            <div key={task.id} className="task-card">
                              <div className="task-card-header">
                                <strong>{task.title}</strong>
                                <span className={`task-status ${task.status}`}>{task.status}</span>
                              </div>

                              <p>{task.description}</p>

                              {task.attachmentName && (
                                <a className="task-file-link" href={task.attachmentUrl} target="_blank" rel="noreferrer">
                                  Open parent task file: {task.attachmentName}
                                </a>
                              )}

                              {canSendNotification ? (
                                <div className="task-result">
                                  <span className="task-meta">Assigned to: {task.assignee}</span>
                                  {task.feedback ? (
                                    <>
                                      <p className="task-feedback">Child solution: {task.feedback}</p>
                                      {task.solutionFileName && (
                                        <a className="task-file-link" href={task.solutionFileUrl} target="_blank" rel="noreferrer">
                                          Open child solution file: {task.solutionFileName}
                                        </a>
                                      )}
                                    </>
                                  ) : (
                                    <p className="task-feedback">Waiting for child response.</p>
                                  )}
                                </div>
                              ) : (
                                <>
                                  {task.status === 'completed' ? (
                                    <div className="task-result">
                                      <span className="task-meta">Submitted by child</span>
                                      <p className="task-feedback">Solution: {task.feedback}</p>
                                      {task.solutionFileName && (
                                        <a className="task-file-link" href={task.solutionFileUrl} target="_blank" rel="noreferrer">
                                          Open submitted file: {task.solutionFileName}
                                        </a>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="task-inline-actions">
                                      <textarea
                                        rows="3"
                                        placeholder="Write the task solution"
                                        value={taskSolutionDrafts[task.id]?.text || ''}
                                        onChange={(event) => setTaskSolutionDrafts((current) => ({
                                          ...current,
                                          [task.id]: {
                                            text: event.target.value,
                                            fileName: current[task.id]?.fileName || '',
                                            fileUrl: current[task.id]?.fileUrl || '',
                                          },
                                        }))}
                                      />
                                      <label>
                                        Upload solved file
                                        <input
                                          className="task-file-input"
                                          type="file"
                                          onChange={(event) => handleTaskSolutionFileUpload(event, task.id)}
                                        />
                                      </label>
                                      {taskSolutionDrafts[task.id]?.fileName && (
                                        <p className="task-file-label">Selected file: {taskSolutionDrafts[task.id].fileName}</p>
                                      )}
                                      <button type="button" className="primary-button" onClick={() => submitTaskSolution(task.id)}>
                                        Send Solution
                                      </button>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>
                          {role === 'parent'
                            ? 'This parent module is used to manage and monitor the child activity area.'
                            : 'This child module gives access to the child-side daily workflow and controls.'}
                        </p>
                        <ul>
                          {visibleModule.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}

                <div className="mobile-bottom-nav" role="tablist">
                  {mobileNavItems.map((item) => {
                    const targetTitle = item.title === 'Tasks'
                      ? (role === 'parent' ? 'Tasks & Rewards' : 'Tasks')
                      : item.title === 'Location'
                        ? 'Live Location'
                        : item.title;
                    const isSelected = visibleModule?.title === targetTitle
                      || visibleModule?.title === 'Settings' && item.title === 'Settings'
                      || (item.title === 'Tasks' && (visibleModule?.title === 'Tasks' || visibleModule?.title === 'Tasks & Rewards'))
                      || (item.title === 'Location' && visibleModule?.title === 'Live Location')
                      || (item.title === 'Profile' && visibleModule?.title === 'Profile');

                    return (
                      <button
                        key={item.title}
                        type="button"
                        className={`mobile-nav-button ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          if (item.title === 'Profile') {
                            setSelectedModule({ title: 'Profile', features: ['Name', 'Phone', 'Email', 'Theme', 'Notifications'] });
                            return;
                          }

                          if (item.title === 'Settings') {
                            const settingsModule = currentModules.find((module) => module.title === 'Settings');
                            setSelectedModule(settingsModule || { title: 'Settings', features: ['Theme', 'Language', 'Notifications', 'Privacy', 'Security', 'Backup', 'Restore', 'Change Password', 'Delete Account', 'Logout'] });
                            return;
                          }

                          const desiredTitle = item.title === 'Tasks'
                            ? (role === 'parent' ? 'Tasks & Rewards' : 'Tasks')
                            : item.title === 'Location'
                              ? 'Live Location'
                              : item.title;

                          const nextModule = currentModules.find((module) => module.title === desiredTitle) || currentModules[0];

                          setSelectedModule(nextModule);
                        }}
                      >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
