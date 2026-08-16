const data = {
  parent: [
    { title: 'Authentication', features: ['Login', 'Register', 'Forgot Password', 'OTP Verification', 'Email Verification', 'Google Login', 'Biometric Login', 'Logout', 'Session Management', 'Device Management'] },
    { title: 'Parent Dashboard', features: ['Child Status', 'Online Status', 'Battery Level', 'Internet Status', 'Device Status', 'Today\'s Activity', 'Location Card', 'Quick Actions', 'Recent Alerts', 'Statistics'] },
    { title: 'Child Management', features: ['Add Child', 'Remove Child', 'Edit Profile', 'Multiple Children', 'Child Details', 'Assign Parent', 'Family Members', 'Child Permissions', 'Child Avatar', 'QR Pairing'] },
    { title: 'Live Location', features: ['Live Tracking', 'Location History', 'Route Playback', 'Safe Zone', 'Danger Zone', 'Speed Tracking', 'Distance Travelled', 'Nearby Places', 'GPS Accuracy', 'Real-time Map'] },
    { title: 'Geofencing', features: ['Add Zone', 'Edit Zone', 'Delete Zone', 'Enter Alert', 'Exit Alert', 'School Zone', 'Home Zone', 'Office Zone', 'Radius Setting', 'Schedule Zone'] },
    { title: 'Screen Time', features: ['Daily Limit', 'Weekly Limit', 'App Time', 'Lock Device', 'Unlock Device', 'Sleep Schedule', 'Break Reminder', 'Usage Chart', 'Screen Report', 'Time Approval'] },
    { title: 'App Monitoring', features: ['Installed Apps', 'Usage Report', 'Block App', 'Unblock App', 'New App Alert', 'App Category', 'Time Limit', 'App History', 'Dangerous App Alert', 'App Permission View'] },
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
    { title: 'Settings', features: ['Theme', 'Language', 'Notification', 'Privacy', 'Security', 'Change Password', 'Backup', 'Restore', 'About', 'Logout'] },
    { title: 'AI Assistant', features: ['AI Chat', 'Homework Help', 'Translation', 'Daily Tips', 'Motivation', 'Quiz Generator', 'Study Planner', 'Time Management', 'AI Voice', 'AI Summary'] },
    { title: 'Device Info', features: ['Battery', 'Storage', 'RAM', 'Internet', 'WiFi', 'Bluetooth', 'GPS', 'Device Model', 'Android Version', 'Performance'] },
    { title: 'Achievements', features: ['Daily Streak', 'Weekly Streak', 'Monthly Goals', 'Badges', 'XP Points', 'Rank', 'Milestones', 'Certificates', 'Rewards', 'Achievement History'] },
  ],
};

const content = document.getElementById('content');
const tabs = document.querySelectorAll('.tab');
const searchInput = document.getElementById('search');
const parentCount = document.getElementById('parent-count');
const childCount = document.getElementById('child-count');

parentCount.textContent = data.parent.length;
childCount.textContent = data.child.length;

function render(view) {
  const rows = data[view];
  const query = searchInput.value.trim().toLowerCase();

  const filtered = rows.filter((module) => {
    const haystack = `${module.title} ${module.features.join(' ')}`.toLowerCase();
    return haystack.includes(query);
  });

  content.innerHTML = '';

  const section = document.createElement('section');
  section.className = 'section-card';
  section.innerHTML = `
    <h2>${view === 'parent' ? 'Parent Side Modules' : 'Child Side Modules'}</h2>
    <div class="module-grid"></div>
  `;

  const grid = section.querySelector('.module-grid');

  filtered.forEach((module) => {
    const card = document.createElement('article');
    card.className = 'module-card';
    const features = module.features.map((feature) => `<li>${feature}</li>`).join('');
    card.innerHTML = `<h3>${module.title}</h3><ul>${features}</ul>`;
    grid.appendChild(card);
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p>No matching modules found.</p>';
  }

  content.appendChild(section);
}

for (const tab of tabs) {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    render(tab.dataset.view);
  });
}

searchInput.addEventListener('input', () => render(document.querySelector('.tab.active').dataset.view));

render('parent');
