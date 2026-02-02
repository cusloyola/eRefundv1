// Static user account data for demo purposes

export interface UserAccountRow {
    empId: string;
    employeeName: string;
    username: string;
    accessLevel: string;
}

export const demoUserAccounts: UserAccountRow[] = [
    { empId: "1", employeeName: "Alexander J. Sterling", username: "asterling", accessLevel: "Admin" },
    { empId: "2", employeeName: "Beatrice M. Vance", username: "bvance", accessLevel: "Credit And Collection" },
    { empId: "3", employeeName: "Caleb D. Rivers", username: "crivers", accessLevel: "Equipment Control" },
    { empId: "4", employeeName: "Diana L. Thorne", username: "dthorne", accessLevel: "Equipment Control" },
    { empId: "5", employeeName: "Elias K. Thorne", username: "ethorne", accessLevel: "Accounting" },
    { empId: "6", employeeName: "Fiona G. Moss", username: "fmoss", accessLevel: "Accounting" },
    { empId: "7", employeeName: "Gregory H. Piles", username: "gpiles", accessLevel: "Accounting" },
    { empId: "8", employeeName: "Helena S. Wray", username: "hwray", accessLevel: "Accounting" },
    { empId: "9", employeeName: "Isaac J. Quinn", username: "iquinn", accessLevel: "Equipment Control" },
    { empId: "10", employeeName: "Julianne O. Pierce", username: "jpierce", accessLevel: "Accounting" },
    { empId: "11", employeeName: "Kevin R. Slate", username: "kslate", accessLevel: "Accounting" },
    { empId: "12", employeeName: "Laura M. Whitlock", username: "lwhitlock", accessLevel: "Credit And Collection" },
    { empId: "13", employeeName: "Marcus P. Gable", username: "mgable", accessLevel: "Equipment Control" },
    { empId: "14", employeeName: "Natalie E. Banks", username: "nbanks", accessLevel: "Accounting" },
    { empId: "15", employeeName: "Owen T. Mercer", username: "omercer", accessLevel: "Admin" },
];

export const columns = [
    { key: "empId", label: "Emp. ID" },
    { key: "employeeName", label: "Employee Name" },
    { key: "username", label: "Username" },
    { key: "accessLevel", label: "Access Level" },
];

export const ROWS_PER_PAGE = 5;

export const accessLevels = [
    "Admin",
    "Accounting",
    "Equipment Control",
    "Credit and Collection",
];
