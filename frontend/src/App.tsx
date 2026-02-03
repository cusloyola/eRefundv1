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

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="operations/hold-approve-refund" element={<HoldApproveRefund />} />
        <Route path="operations/prepare-check" element={<PrepareCheck />} />
        <Route path="operations/release-refund" element={<ReleaseRefund />} />  
        <Route path="operations/upload-release" element={<UploadRelease />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/processed-refund" element={<ProcessedRefund />} />
        <Route path="/reports/container-charges" element={<ContainerCharges />} />
        <Route path="/reports/summary-container-detention" element={<SummaryContainerDetention />} />
        <Route path="/reports/for-export" element={<ForExport />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/file-export" element={<FileExport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1500} theme="colored" />
    </>
  )
}

export default App
