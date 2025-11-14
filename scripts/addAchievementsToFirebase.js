import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKsFeNENkFg7A_CnNo6D_kUP_ieeeZSus",
  authDomain: "mywebsite-2e801.firebaseapp.com",
  projectId: "mywebsite-2e801",
  storageBucket: "mywebsite-2e801.firebasestorage.app",
  messagingSenderId: "549475496163",
  appId: "1:549475496163:web:37d78ba0fcb1478c7c15d6",
  measurementId: "G-QM4S020Z8Q"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Achievements data to add - matching Firebase schema
const achievements = [
  {
    year: "2024",
    title: "3rd Place – Datathon 2024",
    org: "Himma Bootcamp / Tuwaiq Academy",
    desc: "Developed an AI-driven data solution during a national data competition.",
    category: "Competition",
    order: 1
  },
  {
    year: "2024",
    title: "Google Data Analytics",
    org: "Google / Coursera",
    desc: "Completed Google's 8-course program covering SQL, Tableau and data visualization.",
    category: "Certification",
    order: 2
  },
  {
    year: "2023",
    title: "Dean's List – Taibah University",
    org: "Taibah University – CS Department",
    desc: "Recognized for academic excellence and top GPA ranking.",
    category: "Academic",
    order: 3
  },
  {
    year: "2025",
    title: "Data Analysis using SQL",
    org: "Tuwaiq Academy",
    desc: "Gained hands-on experience in SQL and database management for data analysis.",
    category: "Certification",
    order: 4
  },
  {
    year: "2025",
    title: "Web Development with Django",
    org: "Tuwaiq Academy",
    desc: "Built full-stack web applications using Django and Bootstrap.",
    category: "Certification",
    order: 5
  }
]

// Function to add achievements to Firebase
async function addAchievementsToFirebase() {
  try {
    console.log('🚀 Starting to add achievements to Firebase...\n')
    
    const achievementsCollection = collection(db, 'achievements')
    
    for (let i = 0; i < achievements.length; i++) {
      const achievement = achievements[i]
      await addDoc(achievementsCollection, achievement)
      console.log(`✅ [${i + 1}/${achievements.length}] Added: ${achievement.title}`)
    }
    
    console.log('\n🎉 All achievements added to Firebase successfully!')
    console.log(`📊 Total achievements added: ${achievements.length}`)
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error adding achievements to Firebase:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    if (error.message && error.message.includes('PERMISSION_DENIED')) {
      console.error('\n⚠️  Permission Denied - Security Rules Issue!')
      console.error('\n📝 Please update Firestore Security Rules:')
      console.error('\n1. Go to Firebase Console:')
      console.error('   https://console.firebase.google.com/project/mywebsite-2e801/firestore/rules')
      console.error('\n2. Make sure achievements collection is allowed:')
      console.error('   match /achievements/{document} {')
      console.error('     allow read: if true;')
      console.error('     allow write: if true;')
      console.error('   }')
      console.error('\n3. Click "Publish" and wait 10-30 seconds')
      console.error('\n4. Run the script again: npm run add-achievements')
    }
    
    process.exit(1)
  }
}

// Run the script
addAchievementsToFirebase()

