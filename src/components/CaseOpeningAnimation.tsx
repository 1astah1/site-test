import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, Star, Sparkles, DollarSign, Zap, Trophy } from 'lucide-react';
import { WEAPON_CASES } from '@/pages/Index';

interface CaseOpeningAnimationProps {
  isOpen: boolean;
  onComplete: () => void;
  selectedCase: {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    discountPrice: number;
    rarity: string;
  } | null;
}

const CaseOpeningAnimation: React.FC<CaseOpeningAnimationProps> = ({
  isOpen,
  onComplete,
  selectedCase
}) => {
  const [stage, setStage] = useState('loading');
  const [particles, setParticles] = useState([]);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setStage('loading');
      setCountdown(5);
      return;
    }

    if (stage === 'loading') {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setStage('spinning');
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (stage === 'spinning') {
      const timer = setTimeout(() => {
        setStage('result');
      }, 5200);
      return () => clearTimeout(timer);
    }

    if (stage === 'result') {
      const timer = setTimeout(() => {
        setStage('bonus');
      }, 5000);
      return () => clearTimeout(timer);
    }

    if (stage === 'bonus') {
      const timer = setTimeout(() => {
        setStage('cashback');
      }, 5500);
      return () => clearTimeout(timer);
    }

    if (stage === 'cashback') {
      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [stage, isOpen, onComplete]);

  if (!selectedCase) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-background/95 backdrop-blur-md border-2 border-primary/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.3)_0%,_transparent_70%)]" />
          
          {/* Animated particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: '2s'
              }}
            />
          ))}

          <div className="relative z-10 text-center max-w-2xl mx-auto p-8">
            {stage === 'loading' && (
              <div className="space-y-6">
                <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                <h2 className="text-3xl font-bold text-primary animate-pulse">
                  Подготавливаем твой кейс...
                </h2>
                <p className="text-lg text-muted-foreground">
                  Активируем бонусы и скидки
                </p>
              </div>
            )}

            {stage === 'spinning' && (
              <div className="space-y-6">
                <div className="relative w-full max-w-2xl mx-auto overflow-hidden h-48 bg-card rounded-xl border border-primary/20">
                  <div
                    className="flex items-center transition-transform duration-1000"
                    style={{
                      transform: `translateX(-${Math.floor(Math.random() * (WEAPON_CASES.length - 3)) * 180}px)`
                    }}
                  >
                    {WEAPON_CASES.concat(WEAPON_CASES).map((item, idx) => (
                      <div key={idx} className="w-44 h-44 flex-shrink-0 flex flex-col items-center justify-center mx-2">
                        <img src={item.image} alt={item.name} className="w-32 h-32 object-contain rounded-xl border-2 border-primary/30 bg-background" />
                        <span className="text-xs text-muted-foreground mt-2 text-center">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Индикатор выигрыша */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-accent/80 rounded" style={{zIndex:2}}></div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">{selectedCase.name}</h2>
                  <div className="flex justify-center gap-4">
                    <div className="bg-primary/20 rounded-lg px-4 py-2">
                      <p className="text-sm text-muted-foreground">Твоя цена</p>
                      <p className="text-xl font-bold text-primary">${selectedCase.discountPrice}</p>
                    </div>
                    <div className="bg-accent/20 rounded-lg px-4 py-2">
                      <p className="text-sm text-muted-foreground">Экономия</p>
                      <p className="text-xl font-bold text-accent">${selectedCase.originalPrice - selectedCase.discountPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stage === 'result' && (
              <div className="space-y-6">
                <div className="text-8xl animate-bounce">😔</div>
                <h2 className="text-4xl font-bold text-red-400">
                  Не повезло!
                </h2>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                  К сожалению, в этот раз удача была не на вашей стороне...
                </p>
                <div className="text-6xl animate-pulse">💔</div>
              </div>
            )}

            {stage === 'bonus' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
                  <div className="text-6xl mb-4 animate-bounce">🎉</div>
                  
                  <h2 className="text-3xl font-bold mb-4 text-green-400">
                    НО У НАС ЕСТЬ СЮРПРИЗ!
                  </h2>
                  
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Gift className="w-12 h-12 text-green-400" />
                      <div className="text-center">
                        <div className="text-4xl font-black text-green-400">+10%</div>
                        <div className="text-lg text-green-300">к депозиту на следующее пополнение</div>
                      </div>
                      <Sparkles className="w-12 h-12 text-blue-400" />
                    </div>
                    
                    <p className="text-lg text-white mb-4">
                      Пополни баланс на любую сумму и получи <span className="text-green-400 font-bold">+10% к депозиту на следующее пополнение!</span>
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-green-400 font-bold">$10 → $11</div>
                        <div className="text-muted-foreground">+10% бонус</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-green-400 font-bold">$50 → $55</div>
                        <div className="text-muted-foreground">+10% бонус</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-green-400 font-bold">$100 → $110</div>
                        <div className="text-muted-foreground">+10% бонус</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Экономия</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400">
                      <Zap className="w-4 h-4" />
                      <span>Без комиссий</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-400">
                      <Trophy className="w-4 h-4" />
                      <span>Экономия</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stage === 'cashback' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-8 border border-primary/30">
                  <Gift className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                  
                  <h2 className="text-3xl font-bold mb-4 text-primary">
                    Плюс кэшбэк $5!
                  </h2>
                  
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    <span className="text-4xl font-bold text-green-400">5</span>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    Получи $5 кэшбэка и попробуй другие кейсы с бонусом +10%!
                  </p>
                  
                  <div className="bg-muted/20 p-4 rounded-lg mb-6">
                    <p className="text-sm text-muted-foreground">
                      Перенаправление через: <span className="text-primary font-bold">{countdown}с</span>
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={onComplete}
                    className="csgo-gradient text-white font-bold px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Забрать бонус +10%
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {['loading', 'spinning', 'result', 'bonus', 'cashback'].map((stageName, index) => (
                <div
                  key={stageName}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    ['loading', 'spinning', 'result', 'bonus', 'cashback'].indexOf(stage) >= index
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseOpeningAnimation;