
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star } from 'lucide-react';

interface CaseCardProps {
  caseData: {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    discountPrice: number;
    rarity: string;
    isNew?: boolean;
  };
  onPurchase: () => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'factory-new':
      return 'hsl(var(--csgo-gold))';
    case 'minimal-wear':
      return 'hsl(var(--csgo-purple))';
    case 'field-tested':
      return 'hsl(var(--csgo-blue))';
    default:
      return 'hsl(var(--csgo-orange))';
  }
};

const CaseCard: React.FC<CaseCardProps> = ({ caseData, onPurchase }) => {
  const discountPercentage = Math.round(((caseData.originalPrice - caseData.discountPrice) / caseData.originalPrice) * 100);

  return (
    <div className="group relative transform transition-all duration-500 hover:scale-105">
      {/* Enhanced Particle Effects */}
      <div className="absolute -inset-2 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full particle animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="csgo-card group-hover:csgo-case-glow transition-all duration-500 p-8 h-full flex flex-col relative overflow-hidden backdrop-blur-sm">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-card/90 to-card opacity-80"></div>
        
        {/* NEW Badge */}
        {caseData.isNew && (
          <div className="absolute -top-3 -left-3 z-20">
            <Badge className="bg-gradient-to-r from-accent to-primary text-white font-black px-4 py-2 text-sm shadow-2xl border-2 border-white animate-pulse">
              <Sparkles className="w-4 h-4 mr-1" />
              NEW
            </Badge>
          </div>
        )}

        {/* Discount Badge */}
        <div className="absolute -top-3 -right-3 z-20">
          <Badge className="bg-gradient-to-r from-primary to-accent text-white font-black px-4 py-2 text-lg shadow-2xl border-2 border-white">
            -{discountPercentage}%
          </Badge>
        </div>

        {/* Case Image - Much Larger */}
        <div className="relative mb-6 overflow-hidden rounded-xl z-10">
          <div className="relative bg-gradient-to-br from-card/30 to-card/60 p-4 rounded-xl">
            <img
              src={caseData.image}
              alt={caseData.name}
              className="w-full h-80 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 drop-shadow-2xl"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"
              style={{
                background: `linear-gradient(to top, ${getRarityColor(caseData.rarity)}15, transparent 50%)`
              }}
            />
          </div>
          
          {/* Enhanced Rarity Indicator */}
          <div className="absolute bottom-4 left-4 z-10">
            <Badge 
              style={{ 
                backgroundColor: getRarityColor(caseData.rarity),
                boxShadow: `0 0 20px ${getRarityColor(caseData.rarity)}50`
              }}
              className="text-white text-sm font-bold px-4 py-2 border-2 border-white/50"
            >
              <Star className="w-4 h-4 mr-1 fill-current" />
              {caseData.rarity.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Case Info */}
        <div className="flex-1 flex flex-col z-10 relative">
          <h3 className="text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors text-center">
            {caseData.name}
          </h3>

          {/* Enhanced Pricing */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-primary drop-shadow-lg">
                ${caseData.discountPrice}
              </div>
              <div className="text-lg text-muted-foreground line-through opacity-75">
                ${caseData.originalPrice}
              </div>
            </div>
            <div className="text-center">
              <div className="text-accent font-bold text-lg">
                ЭКОНОМИЯ
              </div>
              <div className="text-2xl font-black text-accent">
                ${caseData.originalPrice - caseData.discountPrice}
              </div>
            </div>
          </div>

          {/* Enhanced Purchase Button */}
          <Button
            onClick={onPurchase}
            className="w-full csgo-gradient hover:opacity-90 text-white font-black py-4 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              КУПИТЬ СЕЙЧАС
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
