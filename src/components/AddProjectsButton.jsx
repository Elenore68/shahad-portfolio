import { useState } from 'react'
import { addFakeProjectsToFirebase } from '../firebase/addFakeProjects'

function AddProjectsButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAddProjects = async () => {
    setLoading(true)
    setMessage('')
    
    const result = await addFakeProjectsToFirebase()
    
    if (result.success) {
      setMessage('✅ Projects added successfully! Refresh the page to see them.')
    } else {
      setMessage(`❌ Error: ${result.error}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleAddProjects}
        disabled={loading}
        className="bg-[#D9D6E8] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#D9D6E8]/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding Projects...' : 'Add Fake Projects to Firebase'}
      </button>
      {message && (
        <div className={`mt-2 p-2 rounded text-sm ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default AddProjectsButton

