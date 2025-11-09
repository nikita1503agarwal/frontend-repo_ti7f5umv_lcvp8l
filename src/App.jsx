import { useEffect, useMemo, useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import ChatAssistant from './components/ChatAssistant.jsx';

function MainContent({ route, user }) {
  if (route === 'home') return <Dashboard user={user} />;

  // Lightweight role sections (UI only). Backend will be wired later.
  if (route === 'students') {
    return (
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Students</h2>
          <button className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Add Student</button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Phone</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[{name:'Test Student', phone:'000-000-0000', status:'active'}].map((s, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.phone}</td>
                  <td className="px-4 py-2 capitalize">{s.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="px-2 py-1 text-xs rounded border border-slate-200 hover:bg-slate-50">Edit</button>
                    <button className="px-2 py-1 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (route === 'teachers') {
    return (
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Teachers</h2>
          <button className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Add Teacher</button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Phone</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[{name:'Test Teacher', phone:'111-111-1111'}].map((t, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-2">{t.name}</td>
                  <td className="px-4 py-2">{t.phone}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="px-2 py-1 text-xs rounded border border-slate-200 hover:bg-slate-50">Edit</button>
                    <button className="px-2 py-1 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (route === 'courses' || route === 'my-courses' || route === 'my-classes') {
    return (
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Courses</h2>
          {user?.role === 'admin' && (
            <button className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">New Course</button>
          )}
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-2">Course</th>
                <th className="text-left px-4 py-2">Level</th>
                <th className="text-left px-4 py-2">Monthly Fee</th>
                <th className="text-left px-4 py-2">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {[{course:'English Basics', level:'A1', fee:'49.00', teacher:'Test Teacher'}].map((c, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-2">{c.course}</td>
                  <td className="px-4 py-2">{c.level}</td>
                  <td className="px-4 py-2">${c.fee}</td>
                  <td className="px-4 py-2">{c.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (route === 'payments' || route === 'billing') {
    return (
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payments</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-2">Month</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Paid On</th>
              </tr>
            </thead>
            <tbody>
              {[{month:'January 2025', amount:'49.00', date:'2025-01-05'}].map((p, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-2">{p.month}</td>
                  <td className="px-4 py-2">${p.amount}</td>
                  <td className="px-4 py-2">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (route === 'attendance' || route === 'history') {
    return (
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Attendance</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Course</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[{date:'2025-01-10', course:'English Basics', status:'present'}].map((a, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-2">{a.date}</td>
                  <td className="px-4 py-2">{a.course}</td>
                  <td className="px-4 py-2 capitalize">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (route === 'grades') {
    return (
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Grades</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-2">Student</th>
                <th className="text-left px-4 py-2">Course</th>
                <th className="text-left px-4 py-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {[{student:'Test Student', course:'English Basics', grade:'A'}].map((g, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-2">{g.student}</td>
                  <td className="px-4 py-2">{g.course}</td>
                  <td className="px-4 py-2">{g.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (route === 'enrollments' || route === 'profile') {
    return (
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">{route === 'profile' ? 'Profile' : 'Enrollments'}</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          {route === 'profile' ? (
            <div>
              <div><span className="font-medium text-slate-900">Name:</span> {user?.sub}</div>
              <div><span className="font-medium text-slate-900">Role:</span> {user?.role}</div>
            </div>
          ) : (
            <div>Assign students to courses and manage start dates.</div>
          )}
        </div>
      </section>
    );
  }

  return <div className="p-6">Coming soon.</div>;
}

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState('home');

  useEffect(() => {
    try {
      const t = localStorage.getItem('token');
      if (t) {
        const payload = JSON.parse(atob(t));
        setToken(t);
        setUser(payload);
        // default route per role
        setRoute('home');
      }
    } catch (e) {
      console.error('Failed to parse token');
      localStorage.removeItem('token');
    }
  }, []);

  const handleLogin = ({ token: t, user: u }) => {
    localStorage.setItem('token', t);
    setToken(t);
    setUser(u);
    setRoute('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setRoute('home');
  };

  const roleDefault = useMemo(() => {
    if (user?.role === 'admin') return 'students';
    if (user?.role === 'teacher') return 'my-courses';
    if (user?.role === 'student') return 'profile';
    return 'home';
  }, [user]);

  useEffect(() => {
    if (user && (!route || route === 'home')) {
      setRoute('home');
    }
  }, [user]);

  if (!token || !user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} onNavigate={setRoute} active={route} />
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="font-medium">{user?.role?.toUpperCase()} Dashboard</div>
          <div className="text-sm text-slate-500">Signed in as {user?.sub}</div>
        </header>
        <MainContent route={route || roleDefault} user={user} />
      </main>

      <ChatAssistant user={user} />
    </div>
  );
}
