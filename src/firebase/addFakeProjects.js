import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'

// Fake projects data to add to Firebase
const fakeProjects = [
  {
    title: 'Dermatech',
    description: 'An AI-based mobile application that provides initial skin condition diagnosis, treatment suggestions, and preventive tips using machine learning.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['Teachable Machine', 'Firebase', 'Java']
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard for product management.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    tags: ['React', 'Node.js', 'Firebase']
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    tags: ['React', 'TypeScript', 'Firebase']
  },
  {
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics for multiple cities.',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop',
    tags: ['JavaScript', 'Python', 'React']
  },
  {
    title: 'Social Media Analytics',
    description: 'Advanced analytics platform for social media insights with data visualization, trend analysis, and automated reporting features.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['Python', 'React', 'Firebase']
  },
  {
    title: 'Fitness Tracker',
    description: 'A comprehensive fitness tracking mobile app with workout plans, progress tracking, nutrition logging, and social sharing features.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    tags: ['React', 'Node.js', 'Firebase']
  }
]

// Function to add fake projects to Firebase
export const addFakeProjectsToFirebase = async () => {
  try {
    const projectsCollection = collection(db, 'projects')
    
    // Add each project to Firebase
    for (const project of fakeProjects) {
      await addDoc(projectsCollection, project)
      console.log(`Added project: ${project.title}`)
    }
    
    console.log('✅ All fake projects added to Firebase successfully!')
    return { success: true, message: 'All projects added successfully' }
  } catch (error) {
    console.error('❌ Error adding projects to Firebase:', error)
    return { success: false, error: error.message }
  }
}

// You can call this function from browser console or create a button to trigger it
// Example: import { addFakeProjectsToFirebase } from './firebase/addFakeProjects'
// Then call: addFakeProjectsToFirebase()

