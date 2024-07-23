"use client"; // Ensure this file is treated as a Client Component

import withAuth from '../hoc/withAuth'; // Adjust the path as needed
import AdminPanel from '../components/AdminPanel';

const AdminPage = () => {
  return <AdminPanel />;
};

export default withAuth(AdminPage);
