import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Operations from './pages/Operations'
import Inquiry from './pages/Inquiry'
import Reports from './pages/Reports'
import NotFound from './components/NotFound'
import ContainerCharges from './pages/ContainerCharges'
import ProcessedRefund from './pages/ProcessedRefund'
import SummaryContainerDetention from './pages/SummaryContainerDetention'
import UserAccount from './pages/UserAccount'
import Logs from './pages/Logs'
import FileExport from './pages/FileExport'
import PrepareCheck from './pages/PrepareCheck'
import HoldApproveRefund from './pages/HoldApproveRefund'
import ReleaseRefund from './pages/ReleaseRefund'
import ForExport from './pages/ForExport'
import UploadRelease from './pages/UploadRelease'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/operations" element={<ProtectedRoute><Operations /></ProtectedRoute>} />
        <Route path="/inquiry" element={<ProtectedRoute><Inquiry /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/user-account" element={<ProtectedRoute><UserAccount /></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
        <Route path="/file-export" element={<ProtectedRoute><FileExport /></ProtectedRoute>} />
        
        {/* Operations - Role-Based Access */}
        <Route path="operations/hold-approve-refund" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin', 'credit and collection']}>
            <HoldApproveRefund />
          </ProtectedRoute>
        } />
        <Route path="operations/prepare-check" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin']}>
            <PrepareCheck />
          </ProtectedRoute>
        } />
        <Route path="operations/release-refund" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin']}>
            <ReleaseRefund />
          </ProtectedRoute>
        } />
        <Route path="operations/upload-release" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin']}>
            <UploadRelease />
          </ProtectedRoute>
        } />
        
        {/* Reports - Role-Based Access */}
        <Route path="/reports/processed-refund" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin', 'equipment control']}>
            <ProcessedRefund />
          </ProtectedRoute>
        } />
        <Route path="/reports/container-charges" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin', 'equipment control']}>
            <ContainerCharges />
          </ProtectedRoute>
        } />
        <Route path="/reports/check-preparation" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin', 'credit and collection']}>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="/reports/for-export" element={
          <ProtectedRoute allowedRoles={['accounting']}>
            <ForExport />
          </ProtectedRoute>
        } />
        <Route path="/reports/summary-container-detention" element={
          <ProtectedRoute allowedRoles={['accounting', 'admin', 'equipment control']}>
            <SummaryContainerDetention />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1500} theme="colored" />
    </>
  )
}

export default App
