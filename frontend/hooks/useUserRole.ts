import { useMemo } from 'react';

export const useUserRole = () => {
    const userRole = localStorage.getItem('userRole');

    return useMemo(() => ({
        userRole,
        isAccountingRole: userRole === 'accounting',
        isAdminRole: userRole === 'admin',
        isCreditAndCollection: userRole === 'credit and collection',
        isEquipmentControl: userRole === 'equipment control',
    }), [userRole]);
};