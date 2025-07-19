import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Zap, Shield, Users, DollarSign, CheckCircle } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAfterRegistration: () => void;
  selectedCase: {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    discountPrice: number;
    rarity: string;
  } | null;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  onAfterRegistration,
  selectedCase
}) => {
  const [activeTab, setActiveTab] = useState('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация регистрации
    setTimeout(() => {
      setIsLoading(false);
      onAfterRegistration();
    }, 2000);
  };

  const handleDirectRedirect = () => {
    window.open('https://csgofastx.com/ru', '_blank');
  };

  if (!selectedCase) return null;

  const discountPercentage = Math.round(((selectedCase.originalPrice - selectedCase.discountPrice) / selectedCase.originalPrice) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 bg-background border-2 border-primary/30">
        <div className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
          
          {/* Animated particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 10}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}

          <div className="relative z-10 p-8">
            <DialogHeader className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={selectedCase.image}
                    alt={selectedCase.name}
                    className="w-32 h-32 object-contain rounded-xl"
                  />
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white font-bold animate-pulse">
                    -{discountPercentage}%
                  </Badge>
                </div>
              </div>
              
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🎉 ЭКСКЛЮЗИВНОЕ ПРЕДЛОЖЕНИЕ! 🎉
              </DialogTitle>
              
              <div className="flex justify-center gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">${selectedCase.discountPrice}</div>
                  <div className="text-sm text-muted-foreground line-through">${selectedCase.originalPrice}</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold text-lg">ЭКОНОМИЯ</div>
                  <div className="text-xl font-bold text-green-400">${selectedCase.originalPrice - selectedCase.discountPrice}</div>
                </div>
              </div>
            </DialogHeader>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 mb-6">
              <h3 className="text-center font-bold text-primary mb-4 text-xl">
                🎁 Что ты получишь:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-green-400 font-bold">10% к пополнению</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-blue-400 font-bold">Скин с кейса</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-purple-400 font-bold">Мгновенные выводы</div>
                </div>
              </div>
            </div>

            {/* Only Steam login button */}
            <div className="text-center mt-8">
              <Button
                onClick={handleDirectRedirect}
                className="w-full csgo-gradient text-white font-bold py-3 text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <img src="/public/favicon.ico" alt="Steam" className="w-6 h-6 mr-2" />
                Войти через Steam
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;