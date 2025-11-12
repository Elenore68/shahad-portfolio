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

// Projects data to add - matching Firebase schema
const projects = [
  {
    nameProject: 'Dermatech',
    descraption: 'An AI-based mobile application that provides initial skin condition diagnosis, treatment suggestions, and preventive tips using machine learning.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['Teachable Machine', 'Firebase', 'Java'],
    Links: ['https://github.com', 'https://demo.com']
  },
  {
    nameProject: 'E-Commerce Platform',
    descraption: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard for product management.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    tags: ['React', 'Node.js', 'Firebase'],
    Links: ['https://github.com', 'https://demo.com']
  },
  {
    nameProject: 'Task Management App',
    descraption: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    tags: ['React', 'TypeScript', 'Firebase'],
    Links: ['https://github.com', 'https://demo.com']
  },
  {
    nameProject: 'Weather Dashboard',
    descraption: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics for multiple cities.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop',
    tags: ['JavaScript', 'Python', 'React'],
    Links: ['https://github.com', 'https://demo.com']
  },
  {
    nameProject: 'Social Media Analytics',
    descraption: 'Advanced analytics platform for social media insights with data visualization, trend analysis, and automated reporting features.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['Python', 'React', 'Firebase'],
    Links: ['https://github.com', 'https://demo.com']
  },
  {
    nameProject: 'Fitness Tracker',
    descraption: 'A comprehensive fitness tracking mobile app with workout plans, progress tracking, nutrition logging, and social sharing features.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    tags: ['React', 'Node.js', 'Firebase'],
    Links: ['https://github.com', 'https://demo.com']
  }
]

// Function to add projects to Firebase
async function addProjectsToFirebase() {
  try {
    console.log('🚀 Starting to add projects to Firebase...\n')
    
    const projectsCollection = collection(db, 'projects')
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i]
      await addDoc(projectsCollection, project)
      console.log(`✅ [${i + 1}/${projects.length}] Added: ${project.nameProject}`)
    }
    
    console.log('\n🎉 All projects added to Firebase successfully!')
    console.log(`📊 Total projects added: ${projects.length}`)
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error adding projects to Firebase:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    if (error.message && error.message.includes('PERMISSION_DENIED')) {
      console.error('\n⚠️  Permission Denied - Security Rules Issue!')
      console.error('\n📝 Please update Firestore Security Rules:')
      console.error('\n1. Go to Firebase Console:')
      console.error('   https://console.firebase.google.com/project/mywebsite-2e801/firestore/rules')
      console.error('\n2. Replace the rules with (for testing):')
      console.error('   rules_version = \'2\';')
      console.error('   service cloud.firestore {')
      console.error('     match /databases/{database}/documents {')
      console.error('       match /{document=**} {')
      console.error('         allow read, write: if true;')
      console.error('       }')
      console.error('     }')
      console.error('   }')
      console.error('\n3. Click "Publish" and wait 10-30 seconds')
      console.error('\n4. Run the script again: npm run add-projects')
      console.error('\n📖 See FIREBASE_SECURITY_RULES.md for detailed instructions.')
    }
    
    process.exit(1)
  }
}

// Run the script
addProjectsToFirebase()

