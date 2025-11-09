import { Home, Users, BookOpen, ClipboardList, CreditCard, LogOut, User } from 'lucide-react';

export default function Sidebar({ user, onLogout, onNavigate, active }) {
  const common = [
    { key: 'home', label: 'Home', icon: Home },
  ];

  const admin = [
    { key: 'students', label: 'Students', icon: Users },
    { key: 'teachers', label: 'Teachers', icon: User },
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'enrollments', label: 'Enrollments', icon: ClipboardList },
    { key: 'payments', label: 'Payments', icon: CreditCard },
  ];

  const teacher = [
    { key: 'my-courses', label: 'My Courses', icon: BookOpen },
    { key: 'attendance', label: 'Attendance', icon: ClipboardList },
    { key: 'grades', label: 'Grades', icon: ClipboardList },
  ];

  const student = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'my-classes', label: 'My Classes', icon: BookOpen },
    { key: 'history', label: 'History', icon: ClipboardList },
    { key: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const roleNav = user?.role === 'admin' ? admin : user?.role === 'teacher' ? teacher : student;

  return (
    <aside className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <div className="text-lg font-semibold">Course Center</div>
        <div className="text-xs text-slate-500">{user?.role?.toUpperCase()}</div>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {common.concat(roleNav).map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-slate-50 ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-200">
        <button onClick={onLogout} className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
