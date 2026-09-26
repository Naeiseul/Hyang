import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_KEY, FONT, LS, MONO, TEXT } from '../styles/tokens.js';

const CLOUDS = [
  { label: 'Cambridge A Levels', top: '8%', left: '8%', color: '#378ADD', delay: '0s' },
  { label: 'UCT', top: '9%', left: '38%', color: '#c9a86a', delay: '-2s' },
  { label: 'Oxford', top: '10%', right: '12%', color: '#d8b4fe', delay: '-4s' },

  { label: 'LogTraq', top: '21%', left: '6%', color: '#D4617A', delay: '-3s' },
  { label: 'Filthy Rich', top: '24%', left: '36%', color: '#f2c14e', delay: '-5s' },
  { label: 'Hyang', top: '25%', right: '30%', color: '#ff9bd2', delay: '-6s' },
  { label: 'Painting', top: '27%', right: '8%', color: '#d9a7ff', delay: '-2s' },

  { label: 'Olympic Weightlifting', top: '34%', left: '5%', color: '#2D8A4E', delay: '-7s' },
  { label: 'Cinematic Piece', top: '39%', left: '22%', color: '#7C3AED', delay: '-1s' },
  { label: 'Embroidery', top: '41%', left: '39%', color: '#f0a6ca', delay: '-8s' },
  { label: 'Travel', top: '42%', right: '36%', color: '#7dd3fc', delay: '-3s' },

  { label: 'Writing', top: '50%', left: '7%', color: '#f8fafc', delay: '-4s' },
  { label: 'Gardening', top: '51%', right: '15%', color: '#80ed99', delay: '-7s' },
  { label: 'Calligraphy', top: '58%', left: '45%', color: '#f5d0fe', delay: '-2s' },
  { label: 'Military', bottom: '24%', left: '31%', color: '#9ca3af', delay: '-8s' },
  { label: 'Luxury Apartment', bottom: '27%', right: '31%', color: '#fbbf24', delay: '-4s' },
  { label: 'Cooking', bottom: '24%', right: '9%', color: '#fdba74', delay: '-1s' },

  { label: 'Family', bottom: '15%', left: '24%', color: '#fda4af', delay: '-5s' },
  { label: 'Big Girl Corporate Job', bottom: '17%', left: '46%', color: '#c9a86a', delay: '-9s' },
  { label: 'North Korea', bottom: '8%', left: '6%', color: '#93c5fd', delay: '-7s' },
];

const CLOUD_BOARDS = {
  'Cambridge A Levels': [
    {
      src: '/cambridge-assessment-sticker.png?v=1',
      alt: 'Cambridge Assessment International Education logo',
      className: 'cambridge-logo-sticker',
      stickerClass: 'sticker-cambridge',
    },
  ],
  UCT: [
    {
      src: '/uct-assa-sticker.png?v=1',
      alt: 'Actuarial Society of South Africa logo',
      className: 'uct-logo-sticker',
      stickerClass: 'sticker-assa',
    },
    {
      src: '/uct-nbt-sticker.png?v=1',
      alt: 'National Benchmark Test logo',
      className: 'uct-nbt-sticker',
      stickerClass: 'sticker-nbt',
    },
  ],
  'Luxury Apartment': [
    {
      src: '/luxury-apartment-sticker.jpg?v=1',
      alt: 'Luxury apartment room reference',
      className: 'luxury-apartment-sticker',
      stickerClass: 'sticker-apartment',
    },
  ],
};

export default function InsideBlank() {
  const navigate = useNavigate();
  const [openCloud, setOpenCloud] = useState(null);
  const boardItems = openCloud ? CLOUD_BOARDS[openCloud] : null;

  const lock = () => {
    LS.del(AUTH_KEY);
    navigate('/');
  };

  return (
    <main className="vision-shell" style={{ fontFamily: FONT, color: TEXT }}>
      <style>{`
        .vision-shell {
          min-height: 100vh;
          min-height: 100svh;
          position: relative;
          overflow: hidden;
          padding: 32px;
          background-image:
            linear-gradient(rgba(5, 4, 10, .18), rgba(5, 4, 10, .42)),
            url('/vision-luxury-apartment-gf.png?v=lux1back');
          background-size: cover;
          background-position: center top;
        }

        .vision-shell *,
        .vision-shell *::before,
        .vision-shell *::after {
          box-sizing: border-box;
        }

        .vision-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 48%, rgba(124, 58, 237, .18), transparent 24%),
            radial-gradient(circle at 50% 52%, transparent 0 20%, rgba(5, 4, 10, .34) 70%);
          pointer-events: none;
        }

        .vision-stage {
          position: relative;
          z-index: 2;
          min-height: calc(100vh - 64px);
          display: grid;
          place-items: center;
        }

        .girlfriend-frame {
          width: min(31vw, 280px);
          aspect-ratio: 3 / 4;
          position: relative;
          border-radius: 4px;
          padding: 14px;
          background:
            linear-gradient(145deg, #2b1832 0%, #100a16 46%, #050409 100%);
          border: 7px solid #120b18;
          outline: 1px solid rgba(220, 184, 122, .32);
          box-shadow:
            18px 30px 48px rgba(0,0,0,.50),
            4px 8px 16px rgba(0,0,0,.32),
            inset 0 0 0 1px rgba(255,255,255,.05);
          transform: translateY(-3vh) perspective(900px) rotateX(.8deg) rotateZ(-.4deg);
        }

        .girlfriend-frame::before {
          content: '';
          position: absolute;
          top: -22px;
          left: 50%;
          width: 54px;
          height: 24px;
          transform: translateX(-50%);
          border-top: 1px solid rgba(210, 177, 117, .34);
          border-left: 1px solid rgba(210, 177, 117, .22);
          border-right: 1px solid rgba(210, 177, 117, .22);
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
          opacity: .65;
        }

        .girlfriend-frame::after {
          content: '';
          position: absolute;
          inset: 14px;
          border-radius: 2px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.10), transparent 24%),
            linear-gradient(rgba(84, 39, 126, .14), rgba(4, 3, 8, .26));
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.08),
            inset 0 0 40px rgba(0,0,0,.36);
          pointer-events: none;
        }

        .girlfriend-photo {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 2px;
          object-fit: cover;
          object-position: center;
          filter: brightness(.82) saturate(.92) contrast(1.02);
          opacity: .88;
          box-shadow: 0 0 0 1px rgba(255,255,255,.08);
        }
        .vision-cloud {
          position: absolute;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 30px;
          border: 1px solid rgba(255,255,255,.13);
          border-left-color: color-mix(in srgb, var(--cloud-color) 76%, white 10%);
          background:
            linear-gradient(90deg,
              color-mix(in srgb, var(--cloud-color) 14%, rgba(5, 4, 10, .72)) 0%,
              rgba(8, 7, 15, .48) 46%,
              rgba(8, 7, 15, .24) 100%);
          color: rgba(255,255,255,.80);
          border-radius: 8px;
          padding: 8px 11px 8px 10px;
          font-family: ${MONO};
          font-size: 9px;
          letter-spacing: .14em;
          text-transform: uppercase;
          cursor: pointer;
          touch-action: manipulation;
          box-shadow:
            0 12px 34px rgba(0,0,0,.30),
            0 0 18px color-mix(in srgb, var(--cloud-color) 18%, transparent),
            inset 0 1px 0 rgba(255,255,255,.10);
          backdrop-filter: blur(18px) saturate(1.15);
          -webkit-backdrop-filter: blur(18px) saturate(1.15);
          animation: cloudFloat 12s ease-in-out infinite;
          transition: border-color .2s ease, background .2s ease, color .2s ease, box-shadow .2s ease;
        }

        .vision-cloud::before {
          content: '';
          width: 5px;
          height: 5px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: var(--cloud-color);
          box-shadow: 0 0 14px color-mix(in srgb, var(--cloud-color) 76%, transparent);
          opacity: .76;
        }

        .vision-cloud:hover {
          color: #fff;
          border-color: rgba(255,255,255,.24);
          background:
            linear-gradient(90deg,
              color-mix(in srgb, var(--cloud-color) 20%, rgba(5, 4, 10, .74)) 0%,
              rgba(12, 10, 20, .58) 54%,
              rgba(12, 10, 20, .34) 100%);
          box-shadow:
            0 16px 38px rgba(0,0,0,.36),
            0 0 26px color-mix(in srgb, var(--cloud-color) 28%, transparent),
            inset 0 1px 0 rgba(255,255,255,.14);
        }

        .vision-cloud.has-board::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 11px;
          border: 1px solid color-mix(in srgb, var(--cloud-color) 42%, transparent);
          opacity: .22;
          pointer-events: none;
        }

        .vision-lock {
          position: absolute;
          top: 22px;
          right: 24px;
          z-index: 4;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(7,6,14,.36);
          color: rgba(240,240,240,.72);
          border-radius: 999px;
          padding: 9px 13px;
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          cursor: pointer;
          touch-action: manipulation;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .vision-board-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: block;
          padding: 0;
          background:
            radial-gradient(circle at 22% 18%, rgba(201, 168, 106, .12), transparent 28%),
            radial-gradient(circle at 78% 72%, rgba(124, 58, 237, .18), transparent 30%),
            #020205;
        }

        .vision-board {
          width: 100vw;
          width: 100dvw;
          height: 100vh;
          height: 100dvh;
          min-height: 100svh;
          position: relative;
          overflow: hidden;
          border: 0;
          border-radius: 0;
          background:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px),
            #020205;
          background-size: 72px 72px;
          box-shadow: none;
        }

        .vision-board::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, transparent 0 42%, rgba(0,0,0,.32) 100%),
            linear-gradient(135deg, rgba(255,255,255,.06), transparent 34%);
          pointer-events: none;
        }

        .vision-board-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          pointer-events: none;
        }

        .vision-board-title {
          margin: 0;
          font-family: ${MONO};
          font-size: 11px;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(255,255,255,.72);
        }

        .vision-board-close {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 999px;
          background: rgba(255,255,255,.07);
          color: rgba(255,255,255,.78);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          touch-action: manipulation;
          pointer-events: auto;
        }
        .vision-collage {
          position: absolute;
          inset: 88px 48px 42px;
        }

        .paper-sticker {
          position: absolute;
          margin: 0;
          padding: 0;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,.20);
          background: rgba(8, 8, 14, .9);
          box-shadow:
            0 26px 60px rgba(0,0,0,.55),
            0 0 34px rgba(255,255,255,.08),
            inset 0 1px 0 rgba(255,255,255,.16);
          isolation: isolate;
        }

        .sticker-assa {
          left: 8%;
          top: 8%;
          width: min(470px, 68vw);
          transform: rotate(-3deg);
        }

        .sticker-nbt {
          left: 50%;
          top: 39%;
          width: min(285px, 38vw);
          transform: rotate(5deg);
        }

        .sticker-cambridge {
          left: 10%;
          top: 17%;
          width: min(600px, 78vw);
          transform: rotate(-3deg);
        }

        .sticker-apartment {
          left: 9%;
          top: 7%;
          width: min(690px, 82vw);
          transform: rotate(2deg);
        }

        .paper-sticker::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(125deg, rgba(255,255,255,.34), transparent 24%, transparent 64%, rgba(255,255,255,.10)),
            radial-gradient(circle at 20% 10%, rgba(255,255,255,.22), transparent 26%);
          mix-blend-mode: screen;
          pointer-events: none;
          opacity: .58;
        }

        .paper-sticker img {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          height: auto;
          filter: brightness(1.08) saturate(1.22) contrast(1.08);
        }

        .uct-logo-sticker {
          max-width: 100%;
        }
        .luxury-apartment-sticker {
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 2px;
        }

        @keyframes cloudFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-.45deg); }
          50% { transform: translate3d(6px, -8px, 0) rotate(.45deg); }
        }

        @keyframes portraitFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (min-width: 721px) and (max-width: 1180px) {
          .vision-shell { padding: 24px; }
          .vision-cloud {
            max-width: min(25vw, 190px);
            white-space: normal;
            line-height: 1.25;
            font-size: 8.5px;
          }
          .vision-collage { inset: 88px 34px 36px; }
          .sticker-assa { left: 6%; top: 9%; width: min(430px, 58vw); }
          .sticker-nbt { left: 47%; top: 42%; width: min(270px, 34vw); }
          .sticker-cambridge { left: 8%; top: 18%; width: min(560px, 72vw); }
          .sticker-apartment { left: 7%; top: 10%; width: min(640px, 78vw); }
        }

        @media (max-width: 720px) {
          .vision-shell {
            padding-top: max(14px, env(safe-area-inset-top));
            padding-right: max(12px, env(safe-area-inset-right));
            padding-bottom: max(14px, env(safe-area-inset-bottom));
            padding-left: max(12px, env(safe-area-inset-left));
            background-position: center top;
          }
          .vision-stage { min-height: calc(100svh - 28px); }
          .girlfriend-frame { width: min(54vw, 235px); border-radius: 4px; padding: 10px; border-width: 5px; transform: translateY(-2vh) rotateZ(-.4deg); }
          .girlfriend-photo { border-radius: 2px; }
          .vision-cloud {
            max-width: min(38vw, 145px);
            min-height: 28px;
            padding: 7px 9px;
            font-size: 8px;
            line-height: 1.22;
            letter-spacing: .12em;
            white-space: normal;
            text-align: left;
          }
          .vision-cloud::before { width: 4px; height: 4px; }
          .vision-lock {
            top: max(14px, env(safe-area-inset-top));
            right: max(14px, env(safe-area-inset-right));
          }
          .vision-board-top {
            padding-top: max(14px, env(safe-area-inset-top));
            padding-right: 16px;
            padding-left: 16px;
          }
          .vision-board-title {
            max-width: calc(100vw - 82px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .vision-collage { inset: 82px 18px 28px; }
          .sticker-assa { left: 3%; top: 12%; width: min(340px, 82vw); }
          .sticker-nbt { left: 18%; top: 48%; width: min(230px, 64vw); }
          .sticker-cambridge { left: 3%; top: 20%; width: min(360px, 84vw); }
          .sticker-apartment { left: 2%; top: 16%; width: min(370px, 88vw); }
        }      `}</style>

      <button type="button" className="vision-lock" onClick={lock}>Lock</button>

      {CLOUDS.map((cloud) => {
        const hasBoard = Boolean(CLOUD_BOARDS[cloud.label]);

        return (
          <button
            key={cloud.label}
            type="button"
            className={`vision-cloud${hasBoard ? ' has-board' : ''}`}
            onClick={() => { if (cloud.label === 'University Timetable') navigate('/timetable'); else if (hasBoard) setOpenCloud(cloud.label); }}
            style={{
              top: cloud.top,
              left: cloud.left,
              right: cloud.right,
              bottom: cloud.bottom,
              '--cloud-color': cloud.color,
              animationDelay: cloud.delay,
            }}
          >
            {cloud.label}
          </button>
        );
      })}

      {boardItems && (
        <div className="vision-board-backdrop" onClick={() => setOpenCloud(null)}>
          <section className="vision-board" aria-label={`${openCloud} board`} onClick={(event) => event.stopPropagation()}>
            <div className="vision-board-top">
              <p className="vision-board-title">{openCloud}</p>
              <button type="button" className="vision-board-close" onClick={() => setOpenCloud(null)} aria-label="Close board">×</button>
            </div>
            <div className="vision-collage">
              {boardItems.map((item) => (
                <figure className={`paper-sticker ${item.stickerClass ?? ''}`} key={item.src}>
                  <img className={item.className} src={item.src} alt={item.alt} />
                </figure>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}











