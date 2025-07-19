import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Timer, Star, Sparkles, Gift, TrendingUp, Users, Shield, Zap, DollarSign, Trophy, Clock, CheckCircle, ArrowRight, Flame } from 'lucide-react';
import CaseCard from '@/components/CaseCard';
import PurchaseModal from '@/components/PurchaseModal';
import CaseOpeningAnimation from '@/components/CaseOpeningAnimation';
import CountdownTimer from '@/components/CountdownTimer';
import { Badge } from '@/components/ui/badge';
import WinnersMarquee from '@/components/WinnersMarquee';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const WEAPON_CASES = [
  {
    id: 1,
    name: "M4A1-S | Printstream",
    image: "/lovable-uploads/783fe957-ad25-4004-b5f2-a0d2423ad1e2.png",
    originalPrice: 475,
    discountPrice: 5,
    rarity: "field-tested",
    isNew: true
  },
  {
    id: 2,
    name: "Souvenir AWP | Desert Hydra",
    image: "/lovable-uploads/3266a881-074b-46c5-a4be-8402fbaaec9e.png",
    originalPrice: 2171,
    discountPrice: 13,
    rarity: "factory-new",
    isNew: true
  },
  {
    id: 3,
    name: "★ Karambit | Marble Fade",
    image: "/lovable-uploads/1a25f39d-4516-46f3-8566-fb5eb53a9431.png",
    originalPrice: 2752,
    discountPrice: 15,
    rarity: "factory-new",
    isNew: true
  },
  {
    id: 4,
    name: "★ StatTrak™ Butterfly Knife | Autotronic",
    image: "/lovable-uploads/8c09129f-e957-4e20-8a5b-6ce1788fedef.png",
    originalPrice: 3031,
    discountPrice: 17,
    rarity: "factory-new",
    isNew: true
  },
  {
    id: 5,
    name: "AWP | The Prince",
    image: "/lovable-uploads/bc68f5a9-e8aa-4550-9639-827c607b35af.png",
    originalPrice: 3521,
    discountPrice: 20,
    rarity: "factory-new",
    isNew: true
  },
  {
    id: 6,
    name: "AWP | Dragon Lore",
    image: "/lovable-uploads/87bf6e19-f40d-48cb-8be7-3e41d35ff364.png",
    originalPrice: 7395,
    discountPrice: 28,
    rarity: "field-tested",
    isNew: true
  }
];

// Фейковые уведомления о выигрышах для создания FOMO
const FAKE_WINS = [
  { name: "Алексей", item: "AK-47 Redline", amount: "$127" },
  { name: "Дмитрий", item: "AWP Dragon Lore", amount: "$2,847" },
  { name: "Максим", item: "Karambit Fade", amount: "$1,234" },
  { name: "Андрей", item: "M4A4 Howl", amount: "$892" },
  { name: "Сергей", item: "Glock Fade", amount: "$456" }
];

const Index = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showCaseAnimation, setShowCaseAnimation] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [currentWinIndex, setCurrentWinIndex] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(1247);
  const [showFloatingNotification, setShowFloatingNotification] = useState(false);
  const [showInsufficientFunds, setShowInsufficientFunds] = useState(false);
  const [canOpenCase, setCanOpenCase] = useState(false);

  // Эффект для sticky header
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Эффект для имитации онлайн пользователей
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Эффект для плавающих уведомлений о выигрышах
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFloatingNotification(true);
      setTimeout(() => {
        setShowFloatingNotification(false);
        setCurrentWinIndex((prev) => (prev + 1) % FAKE_WINS.length);
      }, 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePurchase = (caseItem) => {
    setSelectedCase(caseItem);
    if (!canOpenCase) {
      setShowInsufficientFunds(true);
    } else {
      setShowPurchaseModal(true);
    }
  };

  const handleTopUp = () => {
    setShowInsufficientFunds(false);
    setCanOpenCase(true);
    setShowPurchaseModal(true);
  };

  const handleAfterRegistration = () => {
    setShowPurchaseModal(false);
    setShowCaseAnimation(true);
  };

  const handleCaseAnimationComplete = () => {
    setShowCaseAnimation(false);
    window.open('https://csgofastx.com/ru', '_blank');
  };

  const handleMainCTA = () => {
    window.open('https://csgofastx.com/ru', '_blank');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Лента последних выигрышей */}
      <WinnersMarquee />

      {/* Sticky Header */}
      {showStickyHeader && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/20 animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 animate-pulse">
                <Users className="w-3 h-3 mr-1" />
                {onlineUsers} онлайн
              </Badge>
              <span className="text-sm text-muted-foreground">Скидки до 99%</span>
            </div>
            <Button 
              onClick={handleMainCTA}
              className="csgo-gradient text-white font-bold px-6 py-2 hover:scale-105 transition-transform"
            >
              <Zap className="w-4 h-4 mr-2" />
              НАЧАТЬ ИГРАТЬ
            </Button>
          </div>
        </div>
      )}

      {/* Floating Win Notification */}
      {showFloatingNotification && (
        <div className="fixed top-20 right-4 z-40 animate-in slide-in-from-right duration-500">
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 backdrop-blur-md max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-400">
                  {FAKE_WINS[currentWinIndex].name} выиграл
                </p>
                <p className="text-xs text-green-300">
                  {FAKE_WINS[currentWinIndex].item} • {FAKE_WINS[currentWinIndex].amount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-csgo-purple/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-csgo-blue/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Header Section */}
      <header className="relative py-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background"></div>
        
        {/* Top Benefits Bar */}
        <div className="relative max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 animate-pulse">
              <Users className="w-3 h-3 mr-1" />
              {onlineUsers} игроков онлайн
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              <Shield className="w-3 h-3 mr-1" />
              100% безопасно
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              <Zap className="w-3 h-3 mr-1" />
              Экономия
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 animate-pulse">
              <Flame className="w-3 h-3 mr-1" />
              Горячие скидки
            </Badge>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent/30 to-primary/30 border-2 border-accent/50 rounded-full px-8 py-3 mb-6 backdrop-blur-sm">
            <Timer className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-white font-extrabold text-lg md:text-2xl tracking-wide drop-shadow-lg">ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ</span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 csgo-glow leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Скидки до 99%
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              на легендарные скины
            </span>
          </h1>
          
          <div className="flex justify-center items-center gap-2 mb-8">
            <Star className="w-6 h-6 text-primary fill-current" />
            <p className="text-2xl font-semibold text-primary">
              Эксклюзивные скины со скидками до 99%
            </p>
            <Star className="w-6 h-6 text-primary fill-current" />
          </div>

          {/* Main CTA */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mt-2">
              {/* 🎁 Бонус +100% к первому депозиту */}
            </p>
          </div>
          
          <CountdownTimer />

          {/* Social Proof */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Более 50,000 довольных игроков</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <TrendingUp className="w-4 h-4" />
              <span>Выплачено более $2,000,000</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Clock className="w-4 h-4" />
              <span>Средний вывод: 2 минуты</span>
            </div>
          </div>
        </div>
      </header>

      {/* Urgency Banner */}
      <div className="relative max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-xl p-4 text-center backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="text-red-400 font-bold">ВНИМАНИЕ!</span>
            <Flame className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
          <p className="text-white">
            Осталось всего <span className="text-red-400 font-bold">47 кейсов</span> по акционной цене! 
            <span className="text-yellow-400 font-semibold ml-2">Успей купить!</span>
          </p>
        </div>
      </div>

      {/* Cases Section */}
      <main className="relative max-w-7xl mx-auto px-4 pb-20 z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🔥 ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ 🔥
          </h2>
          <p className="text-xl text-muted-foreground">
            Успей купить легендарные скины по лучшим ценам!
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Продано</span>
              <span className="text-primary font-semibold">73%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent h-full rounded-full animate-pulse" style={{width: '73%'}}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Осталось всего 27% кейсов по акционной цене
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WEAPON_CASES.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseData={caseItem}
              onPurchase={() => handlePurchase(caseItem)}
            />
          ))}
        </div>
      </main>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={handleMainCTA}
          className="csgo-gradient text-white font-bold px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce"
        >
          <Gift className="w-5 h-5 mr-2" />
          НАЧАТЬ
        </Button>
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onAfterRegistration={handleAfterRegistration}
        selectedCase={selectedCase}
      />

      <CaseOpeningAnimation
        isOpen={showCaseAnimation}
        onComplete={handleCaseAnimationComplete}
        selectedCase={selectedCase}
      />

      {/* Модалка: недостаточно средств */}
      <Dialog open={showInsufficientFunds} onOpenChange={setShowInsufficientFunds}>
        <DialogContent className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Недостаточно средств</h2>
          <p className="mb-6 text-muted-foreground">Для открытия кейса пополните баланс.</p>
          <button
            onClick={handleTopUp}
            className="csgo-gradient text-white font-bold px-8 py-3 rounded-lg text-lg hover:scale-105 transition-all duration-300"
          >
            Пополнить
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;