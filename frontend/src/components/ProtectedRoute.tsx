import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';

interface ProtectedRouteProps {
    children: React.ReactElement;
    allowedRoles?: string[];
    requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    allowedRoles,
    requireAuth = true 
}) => {
    const { userRole } = useUserRole();
    const authToken = localStorage.getItem('authToken');

    // Check if user is authenticated
    if (requireAuth && !authToken) {
        return <Navigate to="/login" replace />;
    }

    // If no specific roles are required, just check authentication
    if (!allowedRoles || allowedRoles.length === 0) {
        return children;
    }

    // Check if user has the required role
    if (userRole && allowedRoles.includes(userRole)) {
        return children;
    }

    // User doesn't have permission, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;
