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
  { date: '2026-10-12', title: 'WTW 364 Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-13', title: 'IAS 382 Prac Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-15', title: 'WST 321 Prac Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-16', title: 'WST 322 Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-17', title: 'WST 321 Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-10-24', title: 'WST 322 Prac Semester Test 2', type: 'UP_ASSESSMENT' },
  { date: '2026-11-08', title: 'WTW 364 Exam', type: 'UP_ASSESSMENT' },
  { date: '2026-11-14', title: 'IAS 382 Exam', type: 'UP_ASSESSMENT' },
  { date: '2026-11-19', title: 'WST 322 Exam', type: 'UP_ASSESSMENT' },
  { date: '2026-11-24', title: 'WST 321 Exam', type: 'UP_ASSESSMENT' },

  // SU Assignments & Tutorials (Math Stat 344/364 and Actuarial Sci 371)
  { date: '2026-09-30', title: 'Math Stat 344 R-Assignment Due', type: 'SU_ASSESSMENT' },
  { date: '2026-10-02', title: 'Actuarial 371 Tutorial Submission', type: 'SU_ASSESSMENT' },
  { date: '2026-10-09', title: 'Math Stat 364 R-Assignment Due', type: 'SU_ASSESSMENT' },
  { date: '2026-10-16', title: 'Actuarial 371 Modelling Project', type: 'SU_ASSESSMENT' },
  { date: '2026-10-21', title: 'Math Stat 344 R-Assignment Due', type: 'SU_ASSESSMENT' },

  // SU Exams
  { date: '2026-11-03', title: 'Actuarial Science 371 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-06', title: 'Math Stats 312 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-10', title: 'Math Stats 316 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-13', title: 'Math Stats 344 Exam', type: 'SU_ASSESSMENT' },
  { date: '2026-11-17', title: 'Math Stats 364 Exam', type: 'SU_ASSESSMENT' },
];

// Generate regular weekly classes until lectures end (Nov 6)
const startDate = new Date('2026-09-26');
const classEndDate = new Date('2026-11-06');
const yearEndDate = new Date('2026-12-31');

for (let d = new Date(startDate); d <= yearEndDate; d.setDate(d.getDate() + 1)) {
  const day = d.getDay();
  const dateStr = d.toISOString().split('T')[0];

  // Weekly classes (only if before classEndDate and not a Sunday)
  if (d <= classEndDate) {
    if (day === 1) { // Monday
      EVENTS.push({ date: dateStr, title: 'Lecture: WTW 364', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Lecture: IAS 382', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Lecture: Math Stat 344', type: 'SU_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Lecture: Actuarial Sci 371', type: 'SU_CLASS' });
    }
    if (day === 2) { // Tuesday
      EVENTS.push({ date: dateStr, title: 'Lecture: WST 321', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Lecture: WST 322', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Lecture: Math Stat 364', type: 'SU_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Practical: WTW 364', type: 'UP_CLASS' });
    }
    if (day === 3) { // Wednesday
      EVENTS.push({ date: dateStr, title: 'Practical: IAS 382 (Excel)', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Practical: Math Stat 344', type: 'SU_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Tutorial: Actuarial Sci 371', type: 'SU_CLASS' });
    }
    if (day === 4) { // Thursday
      EVENTS.push({ date: dateStr, title: 'Lecture: WTW 364', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Practical: WST 321', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Practical: Math Stat 364', type: 'SU_CLASS' });
    }
    if (day === 5) { // Friday
      EVENTS.push({ date: dateStr, title: 'Lecture: IAS 382', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Lecture: WST 321 & WST 322', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, title: 'Practical: WST 322', type: 'UP_CLASS' });
    }
  }

  // Work shifts
  if (day === 5 || day === 6) {
    EVENTS.push({
      date: dateStr,
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

function DayView({ dateStr, onBack }) {
  const dayEvents = EVENTS.filter(ev => (ev.end ? dateStr >= ev.date && dateStr <= ev.end : dateStr === ev.date));
  
  const upClasses = dayEvents.filter(ev => ev.type === 'UP_CLASS');
  const suClasses = dayEvents.filter(ev => ev.type === 'SU_CLASS');
  const assessments = dayEvents.filter(ev => ev.type.includes('ASSESSMENT'));
  const other = dayEvents.filter(ev => !['UP_CLASS', 'SU_CLASS', 'UP_ASSESSMENT', 'SU_ASSESSMENT'].includes(ev.type));

  const renderList = (items, color) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderLeft: `4px solid ${color}`, marginBottom: 8, borderRadius: '0 8px 8px 0', color: '#eee' }}>
          {item.title}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px', animation: 'fadeIn 0.2s ease-out' }}>
      <button onClick={onBack} style={{
        background: GLASS, border: GLASS_BORDER, color: TEXT, cursor: 'pointer', fontFamily: FONT,
        fontSize: 14, padding: '8px 16px', borderRadius: 6, marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 8
      }}>
        &larr; Back to Calendar
      </button>

      <h2 style={{ fontFamily: SERIF, fontSize: 32, margin: '0 0 32px 0', color: '#fff' }}>
        {new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </h2>

      {assessments.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: '#FF5E5B', marginBottom: 16 }}>Assessments & Deadlines</h3>
          {renderList(assessments, '#FF5E5B')}
        </div>
      )}

      {upClasses.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: UP_COLOR, marginBottom: 16 }}>UP Attendance (Lectures & Pracs)</h3>
          {renderList(upClasses, UP_COLOR)}
        </div>
      )}

      {suClasses.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: SU_COLOR, marginBottom: 16 }}>SU Attendance (Lectures & Tutorials)</h3>
          {renderList(suClasses, SU_COLOR)}
        </div>
      )}

      {other.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: '#aaa', marginBottom: 16 }}>Other Events & Shifts</h3>
          {renderList(other, '#E2711D')}
        </div>
      )}

      {dayEvents.length === 0 && (
        <p style={{ color: '#888', fontStyle: 'italic' }}>Nothing scheduled for this day. Rest up!</p>
      )}
    </div>
  );
}

export default function Timetable() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null); // 'YYYY-MM-DD'
  
  if (selectedDate) {
    return <DayView dateStr={selectedDate} onBack={() => setSelectedDate(null)} />;
  }

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
      
      const hasUP = dayEvents.some(ev => ev.type.startsWith('UP'));
      const hasSU = dayEvents.some(ev => ev.type.startsWith('SU'));
      const hasAssessment = dayEvents.some(ev => ev.type.includes('ASSESSMENT'));
      const hasWork = dayEvents.some(ev => ev.type === 'WORK');

      days.push(
        <div 
          key={d} 
          onClick={() => setSelectedDate(dateStr)}
          style={{
            background: GLASS, border: GLASS_BORDER, borderRadius: 8,
            minHeight: 100, padding: 8, position: 'relative', cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = GLASS}
        >
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>{d}</div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {hasAssessment && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5E5B', title: 'Assessment' }} />}
            {hasUP && <div style={{ width: 8, height: 8, borderRadius: '50%', background: UP_COLOR, title: 'UP Class/Event' }} />}
            {hasSU && <div style={{ width: 8, height: 8, borderRadius: '50%', background: SU_COLOR, title: 'SU Class/Event' }} />}
            {hasWork && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E2711D', title: 'Work Shift' }} />}
          </div>

          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {dayEvents.filter(ev => ev.type.includes('ASSESSMENT') || !ev.type.includes('CLASS')).slice(0, 2).map((ev, idx) => (
              <div key={idx} style={{
                fontSize: 10, padding: '2px 4px', borderRadius: 4,
                background: 'rgba(255,255,255,0.1)', color: '#ccc',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}>
                {ev.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div style={{ fontSize: 10, color: '#666' }}>+{dayEvents.length - 2} more...</div>}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: FONT, color: TEXT, background: BG, paddingBottom: 60 }}>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>
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
