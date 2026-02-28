import { Pattern, PatternType } from '@/lib/types';
import { patterns } from '@/lib/mock-data';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const patternTypeLabels: Record<PatternType, string> = {
  neon: 'Neon Series',
  floral: 'Floral Fairway',
  geometric: 'Geometric Dash',
  retro: 'Retro 90s',
  solid: 'Solid Colors',
  camo: 'Electric Camo',
  abstract: 'Abstract Flow'
};

const patternTypeColors: Record<PatternType, string> = {
  neon: 'bg-gradient-to-r from-electric-green to-neon-pink',
  floral: 'bg-gradient-to-r from-floral-red to-electric-green',
  geometric: 'bg-gradient-to-r from-deep-navy to-electric-blue',
  retro: 'bg-gradient-to-r from-sunset-orange to-retro-purple',
  solid: 'bg-gradient-to-r from-gray-700 to-gray-900',
  camo: 'bg-gradient-to-r from-electric-green to-deep-navy',
  abstract: 'bg-gradient-to-r from-neon-pink to-electric-blue'
};

export default function PatternFilter() {
  const { selectedPatterns, setSelectedPatterns } = useStore();

  const handlePatternToggle = (patternId: string) => {
    if (selectedPatterns.includes(patternId)) {
      setSelectedPatterns(selectedPatterns.filter(id => id !== patternId));
    } else {
      setSelectedPatterns([...selectedPatterns, patternId]);
    }
  };

  const handleTypeToggle = (type: PatternType) => {
    const typePatterns = patterns.filter(p => p.type === type).map(p => p.id);
    const allTypeSelected = typePatterns.every(id => selectedPatterns.includes(id));
    
    if (allTypeSelected) {
      setSelectedPatterns(selectedPatterns.filter(id => !typePatterns.includes(id)));
    } else {
      const newSelection = [...selectedPatterns];
      typePatterns.forEach(id => {
        if (!newSelection.includes(id)) {
          newSelection.push(id);
        }
      });
      setSelectedPatterns(newSelection);
    }
  };

  const clearAll = () => setSelectedPatterns([]);

  const selectAll = () => setSelectedPatterns(patterns.map(p => p.id));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Shop by Vibe</h2>
        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-deep-navy transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={selectAll}
            className="text-sm text-electric-green hover:text-sunset-orange transition-colors"
          >
            Select All
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(patternTypeLabels).map(([type, label]) => {
          const typePatterns = patterns.filter(p => p.type === type);
          const allTypeSelected = typePatterns.every(p => selectedPatterns.includes(p.id));
          const someTypeSelected = typePatterns.some(p => selectedPatterns.includes(p.id));

          return (
            <div key={type} className="space-y-3">
              <button
                onClick={() => handleTypeToggle(type as PatternType)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200",
                  allTypeSelected
                    ? "border-electric-green bg-electric-green/10"
                    : someTypeSelected
                    ? "border-sunset-orange bg-sunset-orange/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-4 h-4 rounded-full", patternTypeColors[type as PatternType])} />
                  <span className="font-semibold text-deep-navy">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {typePatterns.filter(p => selectedPatterns.includes(p.id)).length}/{typePatterns.length}
                  </span>
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
                    allTypeSelected
                      ? "border-electric-green bg-electric-green"
                      : someTypeSelected
                      ? "border-sunset-orange bg-sunset-orange"
                      : "border-gray-300"
                  )}>
                    {(allTypeSelected || someTypeSelected) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-2 ml-4">
                {typePatterns.map(pattern => (
                  <button
                    key={pattern.id}
                    onClick={() => handlePatternToggle(pattern.id)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 text-left",
                      selectedPatterns.includes(pattern.id)
                        ? "border-electric-green bg-electric-green/5"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="flex gap-1">
                      {pattern.colors.slice(0, 2).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full border border-white/50"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-deep-navy truncate">
                      {pattern.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedPatterns.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-electric-green/10 to-sunset-orange/10 rounded-lg">
          <p className="text-sm font-semibold text-deep-navy mb-2">
            {selectedPatterns.length} pattern{selectedPatterns.length > 1 ? 's' : ''} selected
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedPatterns.map(patternId => {
              const pattern = patterns.find(p => p.id === patternId);
              if (!pattern) return null;
              return (
                <span
                  key={patternId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full text-xs font-medium text-deep-navy border border-electric-green/30"
                >
                  {pattern.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
