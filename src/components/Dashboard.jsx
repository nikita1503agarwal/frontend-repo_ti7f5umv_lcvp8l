import { useMemo } from 'react';
import { Users, User, BookOpen, CreditCard } from 'lucide-react';

export default function Dashboard({ user }) {
  const stats = useMemo(() => {
    if (user?.role === 'admin') {
      return [
        { label: 'Students', value: 128, icon: Users },
        { label: 'Teachers', value: 12, icon: User },
        { label: 'Courses', value: 18, icon: BookOpen },
        { label: 'Unpaid', value: 7, icon: CreditCard },
      ];
    }
    if (user?.role === 'teacher') {
      return [
        { label: 'My Courses', value: 4, icon: BookOpen },
        { label: 'Enrolled', value: 63, icon: Users },
      ];
    }
    return [
      { label: 'Active Courses', value: 2, icon: BookOpen },
      { label: 'Payments Due', value: 1, icon: CreditCard },
    ];
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome, {user?.sub}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-slate-200 p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-500 text-sm">{s.label}</div>
                  <div className="text-2xl font-semibold">{s.value}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
