import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Zap, FileText, Clock, type LucideIcon } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  stats?: {
    value: string;
    label: string;
  };
  color: string;
}

interface AnimatedFeatureSliderProps {
  features: Feature[];
  autoPlay?: boolean;
  interval?: number;
}

export default function AnimatedFeatureSlider({
  features,
  autoPlay = true,
  interval = 4000
}: AnimatedFeatureSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % features.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, features.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, features.length]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, currentIndex]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  const currentFeature = features[currentIndex];
  const Icon = currentFeature.icon;

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Main Feature Card */}
      <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentFeature.color}/10 rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr ${currentFeature.color}/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className={`transition-all duration-600 ${isAnimating ? 'opacity-0 transform -translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
              {/* Icon and Badge */}
              <div className="flex items-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${currentFeature.color} rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 mr-6`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-2">
                    <Zap className="h-4 w-4 mr-2" />
                    Fonctionnalité Premium
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white">
                    {currentFeature.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                {currentFeature.description}
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Avantages clés :</h4>
                {currentFeature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 bg-gradient-to-r ${currentFeature.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-white/80 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              {currentFeature.stats && (
                <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white mb-2">{currentFeature.stats.value}</div>
                    <div className="text-white/60 text-sm">{currentFeature.stats.label}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Side */}
            <div className={`transition-all duration-600 delay-200 ${isAnimating ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
              <div className="relative">
                {/* Feature Illustration/Dashboard Preview */}
                <div className={`bg-gradient-to-br ${currentFeature.color}/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl`}>
                  {/* Mock Dashboard Content */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${currentFeature.color} rounded-2xl flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">Interface {currentFeature.title}</h4>
                          <p className="text-white/60 text-sm">Aperçu en temps réel</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>

                    {/* Mock Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`bg-gradient-to-br ${currentFeature.color}/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10`}>
                        <div className="flex items-center justify-between mb-2">
                          <FileText className="h-5 w-5 text-white/80" />
                          <span className="text-emerald-400 text-sm font-medium">+24%</span>
                        </div>
                        <div className="text-2xl font-bold text-white">1,247</div>
                        <div className="text-white/60 text-sm">Documents traités</div>
                      </div>

                      <div className={`bg-gradient-to-br ${currentFeature.color}/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10`}>
                        <div className="flex items-center justify-between mb-2">
                          <Clock className="h-5 w-5 text-white/80" />
                          <span className="text-cyan-400 text-sm font-medium">99.9%</span>
                        </div>
                        <div className="text-2xl font-bold text-white">24/7</div>
                        <div className="text-white/60 text-sm">Disponibilité</div>
                      </div>
                    </div>

                    {/* Animated Progress Bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm text-white/80 mb-2">
                          <span>Efficacité</span>
                          <span>94%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${currentFeature.color} rounded-full transition-all duration-1000`} style={{ width: '94%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm text-white/80 mb-2">
                          <span>Précision</span>
                          <span>98%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${currentFeature.color} rounded-full transition-all duration-1000 delay-200`} style={{ width: '98%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${currentFeature.color}/30 rounded-full blur-xl animate-pulse`}></div>
                <div className={`absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r ${currentFeature.color}/40 rounded-full blur-xl animate-pulse delay-1000`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="flex items-center space-x-3 px-6 py-3 bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-black/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Précédent</span>
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-gradient-to-r ${currentFeature.color} scale-125`
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="flex items-center space-x-3 px-6 py-3 bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-black/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Suivant</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Bar */}
      {autoPlay && (
        <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${currentFeature.color} rounded-full transition-all duration-300 ease-linear`}
            style={{
              width: `${((currentIndex + 1) / features.length) * 100}%`,
              animation: autoPlay ? `progress ${interval}ms linear` : 'none'
            }}
          />
        </div>
      )}
    </div>
  );
}
