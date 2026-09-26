import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { COLORS, FONT, SERIF, TEXT, GLASS, GLASS_BORDER, BG } from '../styles/tokens.js';

const UP_COLOR = '#1E3A8A'; // Navy Blue
const SU_COLOR = '#7C3AED'; // Purple

const EVENTS = [
  // UP Dates
  { date: '2026-09-17', end: '2026-09-27', title: 'UP: September Recess', type: 'UP' },
  { date: '2026-10-02', title: 'UP: International Students\' Day', type: 'UP' },
  { date: '2026-10-10', end: '2026-10-17', title: 'UP: Test Week 2', type: 'UP' },
  { date: '2026-10-24', title: 'UP: Test Week 2 Continues', type: 'UP' },
  { date: '2026-10-25', end: '2026-12-05', title: 'UP: Cooling-off Period', type: 'UP' },
  { date: '2026-11-04', title: 'UP: Public Holiday', type: 'UP' },
  { date: '2026-11-06', title: 'UP: Lectures End (Q4 & Sem 2)', type: 'UP' },
  { date: '2026-11-07', end: '2026-11-25', title: 'UP: Examination Period', type: 'UP' },
  { date: '2026-11-30', end: '2026-12-05', title: 'UP: Supplementary Exams', type: 'UP' },
  { date: '2026-12-05', title: 'UP: End of Academic Year', type: 'UP' },
  
  // SU Dates
  { date: '2026-09-14', end: '2026-10-23', title: 'SU: Fourth Term', type: 'SU' },
  { date: '2026-10-26', end: '2026-11-18', title: 'SU: Nov A2 Assessment Period', type: 'SU' },
  { date: '2026-11-19', end: '2026-12-05', title: 'SU: Nov A3 Assessment Period', type: 'SU' },
  { date: '2026-12-11', title: 'SU: Second Semester Ends', type: 'SU' },

  // UP Practicals & Tests
  { date: '2026-10-06', title: 'UP: WTW 364 Practical', type: 'UP_ASSESSMENT' },
  { date: '2026-10-07', title: 'UP: IAS 382 Practical (Excel)', type: 'UP_ASSESSMENT' },
  { date: '2026-10-08', title: 'UP: WST 321 Practical', type: 'UP_ASSESSMENT' },
  { date: '2026-10-09', title: 'UP: WST 322 Practical', type: 'UP_ASSESSMENT' },
  { date: '2026-10-12', title: 'UP: WTW 364 Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-13', title: 'UP: IAS 382 Prac Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-14', title: 'UP: IAS 382 Practical (Excel)', type: 'UP_ASSESSMENT' },
  { date: '2026-10-15', title: 'UP: WST 321 Prac Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-16', title: 'UP: WST 322 Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-17', title: 'UP: WST 321 Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-20', title: 'UP: WTW 364 Practical', type: 'UP_ASSESSMENT' },
  { date: '2026-10-21', title: 'UP: IAS 382 Practical (Excel)', type: 'UP_ASSESSMENT' },
  { date: '2026-10-24', title: 'UP: WST 322 Prac Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-11-08', title: 'UP: WTW 364 Exam', type: 'UP_ASSESSMENT' },
  { date: '2026-11-14', title: 'UP: IAS 382 Exam', type: 'UP_ASSESSMENT' },
  { date: '2026-11-19', title: 'UP: WST 322 Exam', type: 'UP_ASSESSMENT' },
  { date: '2026-11-24', title: 'UP: WST 321 Exam', type: 'UP_ASSESSMENT' },

  // SU Assignments & Tutorials (Math Stat 344/364 and Actuarial Sci 371)
  { date: '2026-09-30', title: 'SU: Math Stat 344 R-Assignment Due', type: 'SU_ASSESSMENT' },
  { date: '2026-10-02', title: 'SU: Actuarial 371 Tutorial Submission', type: 'SU_ASSESSMENT' },
  { date: '2026-10-09', title: 'SU: Math Stat 364 R-Assignment Due', type: 'SU_ASSESSMENT' },
  { date: '2026-10-16', title: 'SU: Actuarial 371 Modelling Project', type: 'SU_ASSESSMENT' },
  { date: '2026-10-21', title: 'SU: Math Stat 344 R-Assignment Due', type: 'SU_ASSESSMENT' },

  // Imagined Exam Dates for SU (311 and 341 removed due to being blocked)
  { date: '2026-11-03', title: 'SU: Actuarial Science 371 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-06', title: 'SU: Math Stats 312 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-10', title: 'SU: Math Stats 316 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-13', title: 'SU: Math Stats 344 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-17', title: 'SU: Math Stats 364 Exam', type: 'SU_ASSESSMENT' },
];

const startDate = new Date('2026-09-26');
const endDate = new Date('2026-12-31');
for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const day = d.getDay();
  if (day === 5 || day === 6) {
    EVENTS.push({
      date: d.toISOString().split('T')[0],
      title: 'Dorp Bar: Barback (18:00-02:00)',
      type: 'WORK'
    });
  }
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function Timetable() {
  const navigate = useNavigate();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  
  const months = [
    { name: 'September', year: 2026, month: 8 },
    { name: 'October', year: 2026, month: 9 },
    { name: 'November', year: 2026, month: 10 },
    { name: 'December', year: 2026, month: 11 }
  ];

  const current = months[currentMonthIndex];
  const daysInMonth = getDaysInMonth(current.year, current.month);
  const firstDay = getFirstDayOfMonth(current.year, current.month);

  const prevMonth = () => setCurrentMonthIndex(i => Math.max(0, i - 1));
  const nextMonth = () => setCurrentMonthIndex(i => Math.min(months.length - 1, i + 1));

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      days.push(<div key={`pad-${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${current.year}-${String(current.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvents = EVENTS.filter(ev => (ev.end ? dateStr >= ev.date && dateStr <= ev.end : dateStr === ev.date));

      days.push(
        <div key={d} style={{
          background: GLASS, border: GLASS_BORDER, borderRadius: 8,
          minHeight: 100, padding: 8, position: 'relative'
        }}>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>{d}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {dayEvents.map((ev, idx) => {
              let color = '#555';
              let isBold = false;
              if (ev.type.startsWith('UP')) color = UP_COLOR;
              if (ev.type.startsWith('SU')) color = SU_COLOR;
              if (ev.type === 'WORK') color = COLORS.orange || '#E2711D';
              if (ev.type.includes('ASSESSMENT')) isBold = true;
              
              return (
                <div key={idx} style={{
                  fontSize: 10, padding: '4px 6px', borderRadius: 4,
                  background: isBold ? color : 'transparent',
                  borderLeft: !isBold ? `3px solid ${color}` : 'none',
                  color: isBold ? '#fff' : '#ccc', lineHeight: 1.2,
                  boxShadow: isBold ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
                }}>
                  {ev.title}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: FONT, color: TEXT, background: BG, paddingBottom: 60 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ marginBottom: 24, padding: 24, background: GLASS, border: GLASS_BORDER, borderRadius: 12 }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 24, margin: '0 0 16px 0', color: '#fff' }}>Massive Stellies Third Year Module</h2>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#ddd' }}>
            In the Stellenbosch BCom (Actuarial Science) program, <strong>Actuarial Science 311 (Actuarial Mathematics/Life Contingencies)</strong> is widely considered the massive "blocker" module in the third year. 
          </p>
          <ul style={{ fontSize: 14, lineHeight: 1.6, color: '#ddd', marginTop: 12, paddingLeft: 20 }}>
            <li>It serves as the critical prerequisite for Honours-level modules.</li>
            <li>If you fail it, you typically cannot progress to the Honours year or attempt the ASSA exemptions for those advanced subjects.</li>
            <li>Because it is a core professional module, it is not offered in Summer School, meaning you will have to wait for the next academic year to repeat it.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={prevMonth} disabled={currentMonthIndex === 0} style={{ padding: '8px 16px', background: GLASS, border: GLASS_BORDER, color: '#fff', borderRadius: 6, cursor: 'pointer', opacity: currentMonthIndex === 0 ? 0.3 : 1 }}>
            &larr; Prev
          </button>
          <div style={{ fontFamily: SERIF, fontSize: 28, fontStyle: 'italic', color: '#fff' }}>
            {current.name} {current.year}
          </div>
          <button onClick={nextMonth} disabled={currentMonthIndex === months.length - 1} style={{ padding: '8px 16px', background: GLASS, border: GLASS_BORDER, color: '#fff', borderRadius: 6, cursor: 'pointer', opacity: currentMonthIndex === months.length - 1 ? 0.3 : 1 }}>
            Next &rarr;
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 8 }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{day}</div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {renderDays()}
        </div>
      </div>
    </div>
  );
}
