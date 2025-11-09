import { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple client-side role mapping for demo purposes
    const attempts = [
      { match: username === 'admin' && password === 'admin123', role: 'admin', name: 'Administrator' },
      { match: username.toLowerCase() === 'test teacher' && password === 'teacher123', role: 'teacher', name: 'Test Teacher' },
      { match: username.toLowerCase() === 'test student' && password === 'student123', role: 'student', name: 'Test Student' },
    ];

    const found = attempts.find((a) => a.match);
    if (found) {
      const tokenPayload = {
        sub: found.name,
        role: found.role,
        iat: Date.now(),
      };
      const token = btoa(JSON.stringify(tokenPayload));
      onLogin({ token, user: tokenPayload });
      return;
    }

    setError('Invalid credentials. Try admin/admin123, Test Teacher/teacher123, or Test Student/student123.');
  };

  const quickFill = (role) => {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else if (role === 'teacher') {
      setUsername('Test Teacher');
      setPassword('teacher123');
    } else {
      setUsername('Test Student');
      setPassword('student123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1 text-center">Course Center Portal</h1>
        <p className="text-slate-500 text-center mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="Username (e.g. admin or Test Teacher)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white rounded-lg py-2.5 hover:bg-slate-800 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </button>
        </form>

        <div className="mt-6">
          <p className="text-xs text-slate-500 mb-2">Quick login:</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => quickFill('admin')} className="text-xs px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Admin</button>
            <button onClick={() => quickFill('teacher')} className="text-xs px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Teacher</button>
            <button onClick={() => quickFill('student')} className="text-xs px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Student</button>
          </div>
        </div>
      </div>
    </div>
  );
}
