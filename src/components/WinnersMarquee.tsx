import React, { useMemo } from 'react';

const SKIN_IMAGES = [
  '/lovable-uploads/1e27ca32-fe38-4414-8823-8fda9a7ca9f5.png',
  '/lovable-uploads/74786e5e-54f8-4866-9994-7ef5e4dc3712.png',
  '/lovable-uploads/3266a881-074b-46c5-a4be-8402fbaaec9e.png',
  '/lovable-uploads/82754cea-d092-4528-83b8-0d4121729d76.png',
  '/lovable-uploads/da837062-d54f-42c7-baa8-84919ee49274.png',
  '/lovable-uploads/bc68f5a9-e8aa-4550-9639-827c607b35af.png',
  '/lovable-uploads/8da450cb-7670-481e-8da9-efcc45f86d6a.png',
  '/lovable-uploads/8c09129f-e957-4e20-8a5b-6ce1788fedef.png',
  '/lovable-uploads/87bf6e19-f40d-48cb-8be7-3e41d35ff364.png',
  '/lovable-uploads/1a25f39d-4516-46f3-8566-fb5eb53a9431.png',
  '/lovable-uploads/783fe957-ad25-4004-b5f2-a0d2423ad1e2.png',
  '/lovable-uploads/0e17dc03-08ad-4d2f-ba70-846f058fddfa.png',
];

const SKIN_NAMES = [
  'AK-47 | Bloodsport',
  'AWP | BOOM',
  '★ Hydra Gloves | Case Hardened',
  'PP-Bizon | Harvester',
  'M249 | System Lock',
  'UMP-45 | Riot',
  'SCAR-20 | Jungle Slipstream',
  'P90 | Asiimov',
  'P250 | Verdigris',
  'UMP-45 | Riot',
  'P90 | Facility Negative',
  'Desert Eagle | Night',
  'Glock-18 | Catacombs',
  'Desert Eagle | Directive',
];

const USER_NAMES = [
  'Алексей', 'Дмитрий', 'Максим', 'Андрей', 'Сергей', 'Иван', 'Павел', 'Владимир', 'Егор', 'Антон', 'Олег', 'Виктор', 'Никита', 'Роман', 'Кирилл', 'Михаил', 'Денис', 'Артём', 'Глеб', 'Виталий'
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomWin() {
  const imgIdx = getRandomInt(0, SKIN_IMAGES.length - 1);
  return {
    user: USER_NAMES[getRandomInt(0, USER_NAMES.length - 1)],
    skin: SKIN_NAMES[imgIdx % SKIN_NAMES.length],
    image: SKIN_IMAGES[imgIdx],
    price: getRandomInt(5, 500) + '$',
  };
}

const WIN_COUNT = 16;

export const WinnersMarquee: React.FC = () => {
  // Генерируем массив событий один раз при монтировании
  const wins = useMemo(() => Array.from({ length: WIN_COUNT }, getRandomWin), []);
  // Для бесконечной ленты дублируем массив
  const marqueeWins = [...wins, ...wins];

  return (
    <div className="w-full bg-background/80 border-t border-primary/20 py-3 overflow-hidden">
      <div
        className="flex gap-8 animate-marquee whitespace-nowrap items-center"
        style={{ animationDuration: '40s' }}
      >
        {marqueeWins.map((win, idx) => (
          <div key={idx} className="flex items-center gap-3 min-w-[220px] px-2">
            <img src={win.image} alt={win.skin} className="w-14 h-14 object-contain rounded-md border border-primary/30 bg-card" />
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">{win.user} выбил</span>
              <span className="font-bold text-primary text-xs md:text-base">{win.skin}</span>
              <span className="text-green-400 font-bold text-xs">{win.price}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WinnersMarquee; 