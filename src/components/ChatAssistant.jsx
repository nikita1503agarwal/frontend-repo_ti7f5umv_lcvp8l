import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

// Lightweight, local chat assistant with role-aware context
export default function ChatAssistant({ user }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi ${user?.sub || 'there'}! I'm your portal assistant. Ask me about navigation, where to find features, or quick tips.` },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const reply = (text) => {
    const lower = text.toLowerCase();
    const role = user?.role || 'guest';

    if (lower.includes('where') && lower.includes('attendance')) {
      if (role === 'teacher') return 'Open Attendance to mark present/absent for each class you teach.';
      if (role === 'student') return 'Open History to review your attendance across enrolled courses.';
    }
    if (lower.includes('grades')) {
      if (role === 'teacher') return 'Use Grades to enter or edit student grades for your courses.';
      if (role === 'student') return 'Open History to view grades per enrollment. Reach out to your teacher for updates.';
    }
    if (lower.includes('payments') || lower.includes('billing')) {
      if (role === 'admin') return 'Go to Payments to review all monthly payments across enrollments.';
      if (role === 'student') return 'Open Billing to check due months and paid history.';
    }
    if (lower.includes('enroll')) return 'Admins can assign students to courses from Enrollments.';

    return 'You can use the sidebar to access features tailored to your role. Try asking about attendance, grades, or payments.';
  };

  const onSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const r = reply(input.trim());
    setTimeout(() => setMessages((m) => [...m, { role: 'assistant', content: r }]), 150);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full p-3 bg-slate-900 text-white shadow-lg hover:bg-slate-800"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-80 max-h-[70vh] bg-white rounded-xl border border-slate-200 shadow-2xl flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 font-semibold">Assistant</div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`text-sm ${m.role === 'assistant' ? 'text-slate-700' : 'text-slate-900'}`}>
                {m.role === 'assistant' ? '🤖 ' : 'You: '} {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-slate-200 flex items-center gap-2">
            <input
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
            />
            <button onClick={onSend} className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
