import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Operations from './pages/Operations'
import Inquiry from './pages/Inquiry'
import Reports from './pages/Reports'
import Help from './pages/Help'
import HelpAbout from './pages/HelpAbout'
import HelpIndex from './pages/HelpIndex'
import HelpTopics from './pages/HelpTopics'
import NotFound from './components/NotFound'
import ContainerCharges from './pages/ContainerCharges'
import ProcessedRefund from './pages/ProcessedRefund'
import SummaryContainerDetention from './pages/SummaryContainerDetention'
import UserAccount from './pages/UserAccount'
import Logs from './pages/Logs'


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
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/processed-refund" element={<ProcessedRefund />} />
        <Route path="/reports/container-charges" element={<ContainerCharges />} />
        <Route path="/reports/summary-container-detention" element={<SummaryContainerDetention />} />
        <Route path="/help" element={<Help />} />
        <Route path="/help/about" element={<HelpAbout />} />
        <Route path="/help/index" element={<HelpIndex />} />
        <Route path="/help/topics" element={<HelpTopics />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1500} theme="colored" />
    </>
  )
}

export default App
