import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sha256, PASSWORD_HASH, LS, AUTH_KEY } from '../styles/tokens.js';

const HB_FILMS = [
  { kr: '무중',     ro: 'MUJUNG',     img: 'mujung',     en: 'In the Void',  year: 2026, runtime: "118'", status: 'Upcoming',   dir: '서현우' },
  { kr: '검은달',   ro: 'GEOMEUNDAL', img: 'geomeundal', en: 'Black Moon',   year: 2025, runtime: "104'", status: 'In release', dir: '임지환' },
  { kr: '적막',     ro: 'JEOKMAK',    img: 'jeokmak',    en: 'Silence',      year: 2024, runtime: "97'",  status: 'Archive',    dir: '박세린' },
  { kr: '파편',     ro: 'PAHYEON',    img: 'pahyeon',    en: 'Shard',        year: 2024, runtime: "112'", status: 'Archive',    dir: '이도윤' },
  { kr: '영도',     ro: 'YEONGDO',    img: 'yeongdo',    en: 'Zero Degree',  year: 2023, runtime: "89'",  status: 'Archive',    dir: '서현우' },
  { kr: '흰 재',    ro: 'HIN JAE',    img: 'hinjae',     en: 'White Ash',    year: 2023, runtime: "126'", status: 'Archive',    dir: '임지환' },
  { kr: '밤의 강',  ro: 'BAMUI GANG', img: 'bamgang',    en: 'Night River',  year: 2022, runtime: "101'", status: 'Archive',    dir: '박세린' },
  { kr: '그림자',   ro: 'GEURIMJA',   img: 'geurimja',   en: 'Shadow',       year: 2022, runtime: "94'",  status: 'Archive',    dir: '이도윤' },
];

const HB_ROSTER = [
  { name: '서현우', role: '감독',     roleEn: 'Director',        bio: '도시의 소음 속에서 침묵을 촬영한다.' },
  { name: '임지환', role: '감독',     roleEn: 'Director',        bio: '느린 장면을 오래 붙잡는 감독.' },
  { name: '박세린', role: '감독',     roleEn: 'Director',        bio: '빛보다 그림자에 더 관심이 많다.' },
  { name: '이도윤', role: '촬영감독', roleEn: 'Cinematographer', bio: '자연광만으로 밤을 담아낸다.' },
  { name: '정해은', role: '프로듀서', roleEn: 'Producer',        bio: '작은 영화를 끝까지 지켜낸다.' },
  { name: '한유나', role: '편집감독', roleEn: 'Editor',          bio: '리듬은 소리보다 공간에서 나온다.' },
];

export default function Decoy() {
  const navigate = useNavigate();
  const [page, setPage] = useState('home');
  const [email, setEmail] = useState('');
  const [flash, setFlash] = useState('');
  const [busy, setBusy] = useState(false);
  const flashTimer = useRef(null);

  useEffect(() => () => { if (flashTimer.current) clearTimeout(flashTimer.current); }, []);

  const submitWaitlist = async (e) => {
    if (e) e.preventDefault();
    if (!email || busy) return;
    setBusy(true);
    const h = await sha256(email);
    if (h === PASSWORD_HASH) {
      LS.set(AUTH_KEY, true);
      navigate('/dashboard');
      return;
    }
    setEmail('');
    setBusy(false);
    setFlash('등록이 완료되었습니다. 다음 개봉 정보를 이메일로 보내드립니다.');
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(''), 4000);
  };

  const goto = (id) => { setPage(id); window.scrollTo(0, 0); };

  const navItem = (id, kr, en) => (
    <button key={id} onClick={() => goto(id)} className={`hb-nav-link ${page === id ? 'active' : ''}`}>
      <span className="hb-nav-hangul">{kr}</span>{en}
    </button>
  );

  return (
    <div className="hb-shell">
      <nav style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 20 }}>
        <div onClick={() => goto('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span className="hb-hangul-bold" style={{ fontSize: 24, color: '#ede8f0', letterSpacing: '-.04em' }}>흑백</span>
          <span className="hb-mono" style={{ fontSize: 10, color: '#8a848f' }}>HEUKBAEK</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          {navItem('home',    '홈',   'Home')}
          {navItem('works',   '작품', 'Works')}
          {navItem('roster',  '소속', 'Roster')}
          {navItem('contact', '연락', 'Contact')}
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '0 32px 120px' }}>

        {page === 'home' && (
          <div className="hb-fade">
            <section style={{ padding: '80px 0 120px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 60, alignItems: 'end' }} className="hb-stack-mobile">
              <div>
                <div className="hb-label" style={{ marginBottom: 24 }}>
                  <span className="hb-accent">●</span>&nbsp;&nbsp;Upcoming · 2026
                </div>
                <h1 className="hb-hangul-bold" style={{ fontSize: 96, lineHeight: .95, margin: '0 0 24px', color: '#ede8f0', letterSpacing: '-.05em' }}>
                  무중
                </h1>
                <div className="hb-mono" style={{ fontSize: 13, color: '#b026ff', marginBottom: 36, letterSpacing: '.25em' }}>
                  MUJUNG &nbsp;·&nbsp; In the Void
                </div>
                <p className="hb-hangul" style={{ fontSize: 17, lineHeight: 1.8, color: '#c9c3cf', maxWidth: 520, margin: '0 0 40px' }}>
                  소리가 사라진 도시에서, 한 여자가 자신의 그림자만으로 돌아가는 길을 찾는다. 서현우 감독의 다섯 번째 장편.
                </p>
                <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                  <div>
                    <div className="hb-label" style={{ marginBottom: 6 }}>Runtime</div>
                    <div className="hb-mono" style={{ fontSize: 14, color: '#ede8f0' }}>118'</div>
                  </div>
                  <div style={{ width: 1, height: 32, background: 'rgba(176,38,255,.3)' }} />
                  <div>
                    <div className="hb-label" style={{ marginBottom: 6 }}>Director</div>
                    <div className="hb-hangul" style={{ fontSize: 14, color: '#ede8f0' }}>서현우</div>
                  </div>
                  <div style={{ width: 1, height: 32, background: 'rgba(176,38,255,.3)' }} />
                  <div>
                    <div className="hb-label" style={{ marginBottom: 6 }}>Release</div>
                    <div className="hb-mono" style={{ fontSize: 14, color: '#ede8f0' }}>AUT '26</div>
                  </div>
                </div>
              </div>
              <div style={{ animation: 'hbGlow 6s ease-in-out infinite' }}>
                <div className="hb-poster" style={{ borderRadius: 2, position: 'relative' }}>
                  <img className="hb-poster-img" src="/posters/mujung.jpg" alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="hb-poster-tint" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 32, zIndex: 3 }}>
                    <div className="hb-mono" style={{ fontSize: 10, color: 'rgba(237,232,240,.85)', textShadow: '0 2px 8px rgba(0,0,0,.6)' }}>HB · 06</div>
                    <div>
                      <div className="hb-hangul-bold" style={{ fontSize: 52, color: '#ede8f0', lineHeight: .9, letterSpacing: '-.04em', marginBottom: 8, textShadow: '0 2px 12px rgba(0,0,0,.7)' }}>무중</div>
                      <div className="hb-mono" style={{ fontSize: 9, color: 'rgba(237,232,240,.9)', textShadow: '0 1px 6px rgba(0,0,0,.6)' }}>MUJUNG · 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ padding: '0 0 120px', maxWidth: 680 }}>
              <div className="hb-label hb-accent" style={{ marginBottom: 32 }}>— Studio note</div>
              <p className="hb-hangul" style={{ fontSize: 20, lineHeight: 1.8, color: '#ede8f0', margin: '0 0 24px', letterSpacing: '-.01em' }}>
                흑백은 2019년 서울에서 시작된 독립 영화 스튜디오다. 우리는 조용한 영화를 믿는다.
              </p>
              <p className="hb-hangul" style={{ fontSize: 15, lineHeight: 1.9, color: '#8a848f', margin: '0 0 18px' }}>
                빠른 시대에 느린 이야기를 만드는 것은 선택이 아니라 책임이다. 우리는 장면 하나에 필요한 시간을 빼앗지 않는다. 관객의 호흡을 따라가지도, 앞서가지도 않는 영화를 만들려 한다.
              </p>
              <p className="hb-hangul" style={{ fontSize: 15, lineHeight: 1.9, color: '#8a848f', margin: 0 }}>
                지금까지 여덟 편의 장편을 제작했고, 그중 네 편이 부산, 전주, 베를린에서 초청 상영되었다.
              </p>
            </section>

            <div className="hb-hairline" style={{ marginBottom: 80 }} />

            <section style={{ padding: '0 0 40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div className="hb-label" style={{ marginBottom: 10 }}>Recent releases</div>
                  <h2 className="hb-hangul-bold" style={{ fontSize: 36, margin: 0, letterSpacing: '-.03em', color: '#ede8f0' }}>최근 작품</h2>
                </div>
                <button onClick={() => goto('works')} className="hb-mono" style={{ background: 'transparent', border: '1px solid rgba(176,38,255,.3)', color: '#b026ff', padding: '10px 18px', fontSize: 10, cursor: 'pointer', letterSpacing: '.2em' }}>
                  View all ↗
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="hb-stack-mobile">
                {HB_FILMS.slice(1, 4).map((f) => (
                  <article key={f.ro} className="hb-film-card" style={{ padding: 0 }}>
                    <div className="hb-poster">
                      <img className="hb-poster-img" src={`/posters/${f.img}.jpg`} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                      <div className="hb-poster-tint" />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 20, zIndex: 3 }}>
                        <div className="hb-mono" style={{ fontSize: 9, color: 'rgba(237,232,240,.85)', textShadow: '0 1px 6px rgba(0,0,0,.7)' }}>{f.year}</div>
                        <div className="hb-hangul-bold" style={{ fontSize: 32, color: '#ede8f0', letterSpacing: '-.03em', lineHeight: .95, textShadow: '0 2px 10px rgba(0,0,0,.75)' }}>{f.kr}</div>
                      </div>
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      <div className="hb-mono" style={{ fontSize: 10, color: '#b026ff', marginBottom: 8 }}>{f.ro}</div>
                      <div className="hb-hangul" style={{ fontSize: 13, color: '#8a848f' }}>{f.runtime} · {f.dir}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {page === 'works' && (
          <div className="hb-fade" style={{ padding: '80px 0 0' }}>
            <div style={{ marginBottom: 60, maxWidth: 600 }}>
              <div className="hb-label hb-accent" style={{ marginBottom: 18 }}>— Filmography</div>
              <h1 className="hb-hangul-bold" style={{ fontSize: 56, margin: '0 0 20px', letterSpacing: '-.04em', color: '#ede8f0', lineHeight: 1 }}>작품</h1>
              <p className="hb-hangul" style={{ fontSize: 15, lineHeight: 1.8, color: '#8a848f', margin: 0 }}>
                2019년부터 제작한 모든 장편. 각 작품은 필름 아카이브에서 열람 가능합니다.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="hb-stack-mobile">
              {HB_FILMS.map((f) => (
                <article key={f.ro} className="hb-film-card">
                  <div className="hb-poster">
                    <img className="hb-poster-img" src={`/posters/${f.img}.jpg`} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                    <div className="hb-poster-tint" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 20, zIndex: 3 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="hb-mono" style={{ fontSize: 9, color: 'rgba(237,232,240,.85)', textShadow: '0 1px 6px rgba(0,0,0,.7)' }}>{f.year}</div>
                        {f.status === 'Upcoming' && <div className="hb-mono" style={{ fontSize: 9, color: '#b026ff', textShadow: '0 0 8px rgba(176,38,255,.6)' }}>● UPCOMING</div>}
                      </div>
                      <div className="hb-hangul-bold" style={{ fontSize: 36, color: '#ede8f0', letterSpacing: '-.03em', lineHeight: .95, textShadow: '0 2px 12px rgba(0,0,0,.8)' }}>{f.kr}</div>
                    </div>
                  </div>
                  <div style={{ padding: '20px 22px' }}>
                    <div className="hb-mono" style={{ fontSize: 10, color: '#b026ff', marginBottom: 10, letterSpacing: '.2em' }}>{f.ro}</div>
                    <div className="hb-hangul" style={{ fontSize: 13, color: '#ede8f0', marginBottom: 4 }}>{f.en}</div>
                    <div className="hb-hangul" style={{ fontSize: 12, color: '#5a545f' }}>{f.runtime} · {f.dir}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {page === 'roster' && (
          <div className="hb-fade" style={{ padding: '80px 0 0' }}>
            <div style={{ marginBottom: 60, maxWidth: 600 }}>
              <div className="hb-label hb-accent" style={{ marginBottom: 18 }}>— Directors & crew</div>
              <h1 className="hb-hangul-bold" style={{ fontSize: 56, margin: '0 0 20px', letterSpacing: '-.04em', color: '#ede8f0', lineHeight: 1 }}>소속</h1>
              <p className="hb-hangul" style={{ fontSize: 15, lineHeight: 1.8, color: '#8a848f', margin: 0 }}>
                흑백과 함께 영화를 만드는 사람들.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(176,38,255,.12)' }} className="hb-stack-mobile">
              {HB_ROSTER.map((m) => (
                <div key={m.name} style={{ padding: '40px 32px', background: '#08060c', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="hb-hangul-bold" style={{ fontSize: 28, color: '#ede8f0', letterSpacing: '-.03em', marginBottom: 6 }}>{m.name}</div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
                      <span className="hb-hangul" style={{ fontSize: 12, color: '#b026ff' }}>{m.role}</span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#5a545f' }} />
                      <span className="hb-mono" style={{ fontSize: 10, color: '#5a545f' }}>{m.roleEn}</span>
                    </div>
                  </div>
                  <p className="hb-hangul" style={{ fontSize: 13, lineHeight: 1.7, color: '#8a848f', margin: 0 }}>{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="hb-fade" style={{ padding: '80px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            <div>
              <div className="hb-label hb-accent" style={{ marginBottom: 18 }}>— Press & festivals</div>
              <h1 className="hb-hangul-bold" style={{ fontSize: 56, margin: '0 0 28px', letterSpacing: '-.04em', color: '#ede8f0', lineHeight: 1 }}>연락</h1>
              <p className="hb-hangul" style={{ fontSize: 15, lineHeight: 1.9, color: '#8a848f', margin: '0 0 20px' }}>
                상영 문의, 보도 자료, 페스티벌 초청은 직접 이메일로 연락해주시기 바랍니다.
              </p>
              <div style={{ marginTop: 40 }}>
                <div className="hb-label" style={{ marginBottom: 8 }}>Studio</div>
                <div className="hb-hangul" style={{ fontSize: 14, color: '#ede8f0', marginBottom: 4 }}>서울특별시 마포구 상수동</div>
                <div className="hb-mono" style={{ fontSize: 11, color: '#5a545f' }}>SEOUL · KR</div>
              </div>
              <div style={{ marginTop: 28 }}>
                <div className="hb-label" style={{ marginBottom: 8 }}>Press</div>
                <div className="hb-mono" style={{ fontSize: 13, color: '#ede8f0' }}>press@heukbaek.kr</div>
              </div>
            </div>

            <div>
              <div className="hb-label hb-accent" style={{ marginBottom: 18 }}>— Next release</div>
              <h2 className="hb-hangul-bold" style={{ fontSize: 28, margin: '0 0 14px', letterSpacing: '-.03em', color: '#ede8f0', lineHeight: 1.2 }}>
                다음 개봉 알림 받기
              </h2>
              <p className="hb-hangul" style={{ fontSize: 14, lineHeight: 1.8, color: '#8a848f', margin: '0 0 28px' }}>
                대기자 명단에 등록하시면 「무중」 개봉과 상영 일정을 가장 먼저 전해드립니다.
              </p>

              <form onSubmit={submitWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소 / email address"
                  autoComplete="off"
                  className="hb-input"
                />
                <button type="submit" disabled={!email || busy} className="hb-btn">
                  {busy ? '...' : '대기자 명단 등록 · Join waitlist'}
                </button>
              </form>
              <div style={{ minHeight: 24, marginTop: 14 }} className="hb-hangul">
                {flash && <span style={{ fontSize: 12, color: '#b026ff' }}>{flash}</span>}
              </div>
            </div>
          </div>
        )}

      </main>

      <footer style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '40px 32px 60px', borderTop: '1px solid rgba(176,38,255,.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div className="hb-mono" style={{ fontSize: 10, color: '#5a545f' }}>
            © 2026 HEUKBAEK · <span className="hb-hangul" style={{ textTransform: 'none', letterSpacing: 0 }}>흑백 필름</span> · SEOUL
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" className="hb-link hb-mono" style={{ fontSize: 10 }}>Instagram</a>
            <a href="#" className="hb-link hb-mono" style={{ fontSize: 10 }}>Vimeo</a>
            <a href="#" className="hb-link hb-mono" style={{ fontSize: 10 }}>Letterboxd</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
