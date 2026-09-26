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
  { date: '2026-10-12', time: '14:00-16:00', title: 'WTW 364 Semester Test 2', type: 'UP_ASSESSMENT', description: 'Covers financial engineering topics from weeks 4-7. Expect binomial pricing models.' },
  { date: '2026-10-13', time: '14:00-16:00', title: 'IAS 382 Prac Semester Test 2', type: 'UP_ASSESSMENT', description: 'Practical Excel exam building survival models and mortality tables from raw data.' },
  { date: '2026-10-15', time: '14:00-16:00', title: 'WST 321 Prac Semester Test 2', type: 'UP_ASSESSMENT', description: 'Time series analysis practical test using RStudio. ARIMA models focus.' },
  { date: '2026-10-16', time: '14:00-16:00', title: 'WST 322 Semester Test 2', type: 'UP_ASSESSMENT', description: 'Actuarial statistics theory test. Bayes estimation and loss distributions.' },
  { date: '2026-10-17', time: '14:00-16:00', title: 'WST 321 Semester Test 2', type: 'UP_ASSESSMENT', description: 'Time series theory test covering AR, MA, and ARMA properties.' },
  { date: '2026-10-24', time: '14:00-16:00', title: 'WST 322 Prac Semester Test 2', type: 'UP_ASSESSMENT', description: 'Actuarial statistics practical test in R. Fitting loss distributions.' },
  { date: '2026-11-08', time: '09:00-12:00', title: 'WTW 364 Exam', type: 'UP_ASSESSMENT', description: 'Final financial engineering examination.' },
  { date: '2026-11-14', time: '09:00-12:00', title: 'IAS 382 Exam', type: 'UP_ASSESSMENT', description: 'Final survival models examination.' },
  { date: '2026-11-19', time: '09:00-12:00', title: 'WST 322 Exam', type: 'UP_ASSESSMENT', description: 'Final actuarial statistics examination.' },
  { date: '2026-11-24', time: '09:00-12:00', title: 'WST 321 Exam', type: 'UP_ASSESSMENT', description: 'Final time series analysis examination.' },

  // SU Assignments & Tutorials
  { date: '2026-09-30', time: '23:59-23:59', title: 'Math Stat 344 R-Assignment Due', type: 'SU_ASSESSMENT', description: 'Submission on SUNLearn. Requires full R-script and compiled PDF report on supervised learning models.' },
  { date: '2026-10-02', time: '23:59-23:59', title: 'Actuarial 371 Tutorial Submission', type: 'SU_ASSESSMENT', description: 'Loss reserving tutorial submission.' },
  { date: '2026-10-09', time: '23:59-23:59', title: 'Math Stat 364 R-Assignment Due', type: 'SU_ASSESSMENT', description: 'Submission on SUNLearn.' },
  { date: '2026-10-16', time: '17:00-17:00', title: 'Actuarial 371 Modelling Project', type: 'SU_ASSESSMENT', description: 'Major financial engineering modelling project submission.' },
  { date: '2026-10-21', time: '23:59-23:59', title: 'Math Stat 344 R-Assignment Due', type: 'SU_ASSESSMENT', description: 'Final R assignment before exams.' },

  // SU Exams
  { date: '2026-11-03', time: '09:00-12:00', title: 'Actuarial Science 371 Exam', type: 'SU_ASSESSMENT', description: 'Final examination for A214 exemption.' },
  { date: '2026-11-06', time: '09:00-12:00', title: 'Math Stats 312 Exam', type: 'SU_ASSESSMENT', description: 'Final exam.' },
  { date: '2026-11-10', time: '09:00-12:00', title: 'Math Stats 316 Exam', type: 'SU_ASSESSMENT', description: 'Final exam.' },
  { date: '2026-11-13', time: '09:00-12:00', title: 'Math Stats 344 Exam', type: 'SU_ASSESSMENT', description: 'Final exam on statistical learning.' },
  { date: '2026-11-17', time: '09:00-12:00', title: 'Math Stats 364 Exam', type: 'SU_ASSESSMENT', description: 'Final exam.' },
];

// --- INJECTED MINOR ASSESSMENTS ---
// UP Minor Assessments
EVENTS.push({ date: '2026-09-29', time: '18:00-23:59', title: 'IAS 382 Excel Prac Submission', type: 'UP_ASSESSMENT', description: 'Post-Practical Hand-in: Must upload your completed Excel model for the Kaplan-Meier estimator to ClickUP before midnight.' });
EVENTS.push({ date: '2026-10-01', time: '08:30-09:20', title: 'WTW 364 Class Test 3', type: 'UP_ASSESSMENT', description: 'In-Person Class Test: Closed book, invigilated test during the lecture slot. Have your student card, pen, and calculator ready. Covers Ito calculus.' });
EVENTS.push({ date: '2026-10-05', time: '12:00-12:30', title: 'WST 321 Pop Quiz', type: 'UP_ASSESSMENT', description: 'Online Quiz: Strict 30-minute ClickUP online quiz covering AR(p) models. Must be completed before the afternoon session.' });
EVENTS.push({ date: '2026-10-10', time: '23:59-23:59', title: 'WST 322 R-Script Submission', type: 'UP_ASSESSMENT', description: 'Post-Practical Hand-in: Upload your Loss distribution fitting R-Script and compiled PDF report online before midnight.' });
EVENTS.push({ date: '2026-10-19', time: '18:00-23:59', title: 'IAS 382 Excel Prac Submission', type: 'UP_ASSESSMENT', description: 'Post-Practical Hand-in: Must upload your completed Cox proportional hazards Excel model to ClickUP.' });
EVENTS.push({ date: '2026-10-22', time: '08:30-09:20', title: 'WTW 364 Class Test 4', type: 'UP_ASSESSMENT', description: 'In-Person Class Test: Closed book, invigilated test during the lecture slot. Have your student card and pen ready. Covers Black-Scholes PDEs.' });
EVENTS.push({ date: '2026-10-31', time: '23:59-23:59', title: 'WST 321 R-Script Submission', type: 'UP_ASSESSMENT', description: 'Post-Practical Hand-in: Upload your Time series forecasting R-Script and PDF online.' });

// SU Minor Assessments
EVENTS.push({ date: '2026-09-28', time: '14:00-15:00', title: 'Actuarial 371 Class Test', type: 'SU_ASSESSMENT', description: 'In-Tutorial Class Test: Must be there in person. First 45 mins of the tutorial is a written test on run-off triangles under exam conditions.' });
EVENTS.push({ date: '2026-10-04', time: '23:59-23:59', title: 'Math Stat 344 Quiz 4', type: 'SU_ASSESSMENT', description: 'Online Quiz: SUNLearn quiz on Decision Trees. Make sure you have a stable connection before starting.' });
EVENTS.push({ date: '2026-10-07', time: '23:59-23:59', title: 'Math Stat 364 Quiz 3', type: 'SU_ASSESSMENT', description: 'Online Quiz: Quick SUNLearn theory quiz to test your weekly reading.' });
EVENTS.push({ date: '2026-10-14', time: '14:00-15:00', title: 'Actuarial 371 Class Test 2', type: 'SU_ASSESSMENT', description: 'In-Tutorial Class Test: Must be there in person. Written test on derivative pricing under exam conditions.' });
EVENTS.push({ date: '2026-10-25', time: '23:59-23:59', title: 'Math Stat 344 Quiz 5', type: 'SU_ASSESSMENT', description: 'Online Quiz: SUNLearn quiz on Support Vector Machines.' });

const startDate = new Date('2026-09-26');
const classEndDate = new Date('2026-11-06');
const yearEndDate = new Date('2026-12-31');

for (let d = new Date(startDate); d <= yearEndDate; d.setDate(d.getDate() + 1)) {
  const day = d.getDay();
  const dateStr = d.toISOString().split('T')[0];

  if (d <= classEndDate) {
    if (day === 1) { // Monday
      EVENTS.push({ date: dateStr, time: '08:30-09:20', title: 'Lecture: WTW 364', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '10:00-10:50', title: 'Lecture: Math Stat 344', type: 'SU_CLASS' });
      EVENTS.push({ date: dateStr, time: '11:30-12:20', title: 'Lecture: IAS 382', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '14:00-14:50', title: 'Lecture: Actuarial Sci 371', type: 'SU_CLASS' });
    }
    if (day === 2) { // Tuesday
      EVENTS.push({ date: dateStr, time: '09:30-10:20', title: 'Lecture: WST 321', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '11:00-11:50', title: 'Lecture: Math Stat 364', type: 'SU_CLASS' });
      EVENTS.push({ date: dateStr, time: '13:30-14:20', title: 'Lecture: WST 322', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '15:30-17:00', title: 'Practical: WTW 364', type: 'UP_CLASS' });
    }
    if (day === 3) { // Wednesday
      EVENTS.push({ date: dateStr, time: '09:00-12:00', title: 'Practical: Math Stat 344', type: 'SU_CLASS' });
      EVENTS.push({ date: dateStr, time: '13:30-16:30', title: 'Practical: IAS 382 (Excel)', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '14:00-17:00', title: 'Tutorial: Actuarial Sci 371', type: 'SU_CLASS' });
    }
    if (day === 4) { // Thursday
      EVENTS.push({ date: dateStr, time: '08:30-09:20', title: 'Lecture: WTW 364', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '10:30-13:30', title: 'Practical: WST 321', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '14:00-17:00', title: 'Practical: Math Stat 364', type: 'SU_CLASS' });
    }
    if (day === 5) { // Friday
      EVENTS.push({ date: dateStr, time: '08:30-09:20', title: 'Lecture: IAS 382', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '09:30-10:20', title: 'Lecture: WST 321', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '10:30-11:20', title: 'Lecture: WST 322', type: 'UP_CLASS' });
      EVENTS.push({ date: dateStr, time: '13:30-16:30', title: 'Practical: WST 322', type: 'UP_CLASS' });
    }
  }

  if (day === 5 || day === 6) {
    EVENTS.push({ date: dateStr, time: '18:00-26:00', title: 'Dorp Bar: Barback', type: 'WORK' }); // 26:00 means 02:00 next day
  } else if (day === 3 || day === 4) {
    EVENTS.push({ date: dateStr, time: '17:00-23:00', title: 'Dorp Bar: Barback', type: 'WORK' });
  }
}

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }

function parseTime(timeStr) {
  if (!timeStr) return [0, 0];
  const parts = timeStr.split('-');
  const start = parts[0].split(':').map(Number);
  const end = parts[1].split(':').map(Number);
  return [start[0] + start[1]/60, end[0] + end[1]/60];
}

function DayTimeline({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // timeline from 08:00 to 26:00 (02:00 am)
  const startHour = 8;
  const endHour = 26;
  const pixelsPerHour = 60;
  
  const timelineEvents = events.filter(ev => ev.time && !ev.type.includes('PERIOD')).map(ev => {
    const [start, end] = parseTime(ev.time);
    let top = (start - startHour) * pixelsPerHour;
    let height = (end - start) * pixelsPerHour;
    if (height < 20) height = 20; // min height
    return { ...ev, top, height };
  });

  return (
    <div style={{ position: 'relative', marginTop: 24, display: 'flex', gap: 24, flexDirection: 'row' }}>
      <div style={{ flex: 1, position: 'relative', height: (endHour - startHour) * pixelsPerHour, background: 'rgba(255,255,255,0.02)', borderRadius: 8, overflow: 'hidden' }}>
        {/* Grid lines */}
        {Array.from({ length: endHour - startHour + 1 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: i * pixelsPerHour, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 10, color: '#666', transform: 'translateY(-50%)', paddingLeft: 8, background: '#0f0f1a' }}>
              {String((i + startHour) % 24).padStart(2, '0')}:00
            </span>
          </div>
        ))}
        
        {/* Events */}
        {timelineEvents.map((ev, i) => {
          let bg = 'rgba(255,255,255,0.1)';
          let border = '#aaa';
          if (ev.type.includes('UP')) { bg = 'rgba(30,58,138,0.3)'; border = UP_COLOR; }
          if (ev.type.includes('SU')) { bg = 'rgba(124,58,237,0.3)'; border = SU_COLOR; }
          if (ev.type.includes('WORK')) { bg = 'rgba(226,113,29,0.3)'; border = '#E2711D'; }
          if (ev.type.includes('ASSESSMENT')) { bg = 'rgba(255,94,91,0.3)'; border = '#FF5E5B'; }
          
          return (
            <div 
              key={i} 
              onClick={() => setSelectedEvent(ev)}
              style={{
                position: 'absolute', top: ev.top, height: ev.height, left: 50, right: 16,
                background: bg, borderLeft: `4px solid ${border}`, borderRadius: '0 4px 4px 0',
                padding: '4px 8px', fontSize: 12, color: '#fff', cursor: 'pointer',
                overflow: 'hidden', backdropFilter: 'blur(4px)', transition: 'transform 0.1s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{ev.title}</div>
              <div style={{ fontSize: 10, color: '#ddd' }}>{ev.time.replace('26:00', '02:00').replace('25:00', '01:00').replace('23:59-23:59', '23:59')}</div>
            </div>
          );
        })}
      </div>

      {/* Details sidebar for selected event */}
      <div style={{ width: 250, minWidth: 250, background: GLASS, border: GLASS_BORDER, borderRadius: 8, padding: 16, height: 'fit-content' }}>
        {selectedEvent ? (
          <div style={{ animation: 'fadeIn 0.2s' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#fff' }}>{selectedEvent.title}</h3>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 16, fontFamily: 'monospace' }}>{selectedEvent.time.replace('26:00', '02:00').replace('25:00', '01:00').replace('23:59-23:59', '23:59 Deadline')}</div>
            <p style={{ fontSize: 14, color: '#ddd', lineHeight: 1.5 }}>
              {selectedEvent.description || 'Routine scheduled block. Attendance highly recommended.'}
            </p>
          </div>
        ) : (
          <div style={{ color: '#666', fontSize: 14, fontStyle: 'italic', textAlign: 'center', marginTop: 40 }}>
            Click an event on the timeline to view details.
          </div>
        )}
      </div>
    </div>
  );
}

function DayView({ dateStr, onBack }) {
  const dayEvents = EVENTS.filter(ev => (ev.end ? dateStr >= ev.date && dateStr <= ev.end : dateStr === ev.date));
  return (
    <div style={{ padding: '24px 16px', animation: 'fadeIn 0.2s ease-out' }}>
      <button onClick={onBack} style={{
        background: GLASS, border: GLASS_BORDER, color: TEXT, cursor: 'pointer', fontFamily: FONT,
        fontSize: 14, padding: '8px 16px', borderRadius: 6, marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 8
      }}>
        &larr; Back to Calendar
      </button>
      <h2 style={{ fontFamily: SERIF, fontSize: 32, margin: '0 0 8px 0', color: '#fff' }}>
        {new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </h2>
      <DayTimeline events={dayEvents} />
    </div>
  );
}

function UpcomingDeadlines() {
  const today = new Date('2026-09-26').toISOString().split('T')[0];
  const upcoming = EVENTS.filter(ev => ev.type.includes('ASSESSMENT') && ev.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="calendar-scroll" style={{ width: 280, minWidth: 280, background: 'rgba(0,0,0,0.2)', borderLeft: GLASS_BORDER, padding: '24px 16px', overflowY: 'auto', maxHeight: '100vh' }}>
      <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: '#FF5E5B', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 8 }}>
        Upcoming Deadlines
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {upcoming.map((ev, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, borderLeft: `4px solid ${ev.type.includes('UP') ? UP_COLOR : SU_COLOR}` }}>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>
              {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div style={{ fontSize: 14, color: '#fff', fontWeight: 'bold', marginBottom: 4 }}>{ev.title}</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>{ev.description || 'Assessment'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Timetable() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  
  if (selectedDate) {
    return <DayView dateStr={selectedDate} onBack={() => setSelectedDate(null)} />;
  }

  const months = [
    { name: 'September', year: 2026, month: 8 }, { name: 'October', year: 2026, month: 9 },
    { name: 'November', year: 2026, month: 10 }, { name: 'December', year: 2026, month: 11 }
  ];
  const current = months[currentMonthIndex];
  const daysInMonth = getDaysInMonth(current.year, current.month);
  const firstDay = getFirstDayOfMonth(current.year, current.month);

  const prevMonth = () => setCurrentMonthIndex(i => Math.max(0, i - 1));
  const nextMonth = () => setCurrentMonthIndex(i => Math.min(months.length - 1, i + 1));

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) { days.push(<div key={`pad-${i}`} />); }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${current.year}-${String(current.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvents = EVENTS.filter(ev => (ev.end ? dateStr >= ev.date && dateStr <= ev.end : dateStr === ev.date));
      
      const hasUP = dayEvents.some(ev => ev.type.startsWith('UP'));
      const hasSU = dayEvents.some(ev => ev.type.startsWith('SU'));
      const hasAssessment = dayEvents.some(ev => ev.type.includes('ASSESSMENT'));
      const hasWork = dayEvents.some(ev => ev.type === 'WORK');

      const textEvents = [];
      EVENTS.forEach(ev => {
        if (ev.type === 'WORK' || ev.type.includes('CLASS')) return;
        if (ev.end) {
          if (dateStr === ev.date) textEvents.push({ ...ev, title: `Start: ${ev.title}` });
          else if (dateStr === ev.end) textEvents.push({ ...ev, title: `End: ${ev.title}` });
        } else {
          if (dateStr === ev.date) textEvents.push(ev);
        }
      });

      days.push(
        <div key={d} onClick={() => setSelectedDate(dateStr)}
          style={{
            background: GLASS, border: GLASS_BORDER, borderRadius: 8, minHeight: 100, padding: 8, position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
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
            {textEvents.slice(0, 3).map((ev, idx) => (
              <div key={idx} style={{ fontSize: 10, padding: '2px 4px', borderRadius: 4, background: 'rgba(255,255,255,0.1)', color: '#ccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ev.title}
              </div>
            ))}
            {textEvents.length > 3 && <div style={{ fontSize: 10, color: '#666' }}>+{textEvents.length - 3} more...</div>}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: FONT, color: TEXT, background: BG }}>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .calendar-scroll::-webkit-scrollbar { height: 8px; width: 8px; }
          .calendar-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
          .calendar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
          .calendar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        `}
      </style>
      
      <div style={{ flex: 1, paddingBottom: 60, height: '100vh', overflowY: 'auto' }} className="calendar-scroll">
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
          <div style={{ marginBottom: 24, padding: 24, background: GLASS, border: GLASS_BORDER, borderRadius: 12 }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 24, margin: '0 0 16px 0', color: '#fff' }}>Massive Stellies Third Year Module</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#ddd' }}>
              In the Stellenbosch BCom (Actuarial Science) program, <strong>Actuarial Science 311 (Actuarial Mathematics/Life Contingencies)</strong> is widely considered the massive "blocker" module in the third year. 
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <button onClick={prevMonth} disabled={currentMonthIndex === 0} style={{ padding: '8px 16px', background: GLASS, border: GLASS_BORDER, color: '#fff', borderRadius: 6, cursor: 'pointer', opacity: currentMonthIndex === 0 ? 0.3 : 1 }}>&larr; Prev</button>
            <div style={{ fontFamily: SERIF, fontSize: 28, fontStyle: 'italic', color: '#fff' }}>{current.name} {current.year}</div>
            <button onClick={nextMonth} disabled={currentMonthIndex === months.length - 1} style={{ padding: '8px 16px', background: GLASS, border: GLASS_BORDER, color: '#fff', borderRadius: 6, cursor: 'pointer', opacity: currentMonthIndex === months.length - 1 ? 0.3 : 1 }}>Next &rarr;</button>
          </div>

          <div className="calendar-scroll" style={{ width: '100%', overflowX: 'auto', paddingBottom: 16 }}>
            <div style={{ minWidth: 800 }}>
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
        </div>
      </div>
      
      <UpcomingDeadlines />
    </div>
  );
}
