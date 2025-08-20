import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Calculator, Play, RotateCcw } from 'lucide-react';

const TriangleAreaModule = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  // Calculator states
  const [base, setBase] = useState(8);
  const [height, setHeight] = useState(6);
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const [sideC, setSideC] = useState(5);
  
  // Interactive triangle states
  const [triangleVertices, setTriangleVertices] = useState({
    A: { x: 50, y: 20 },
    B: { x: 20, y: 80 },
    C: { x: 80, y: 80 }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragVertex, setDragVertex] = useState(null);
  
  // Animation states
  const [animatedParticles, setAnimatedParticles] = useState([]);
  const animationRef = useRef();

  // Calculate area using basic formula
  const calculateBasicArea = () => (base * height) / 2;

  // Calculate area using Heron's formula
  const calculateHeronArea = () => {
    const s = (sideA + sideB + sideC) / 2;
    const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
    return isNaN(area) ? 0 : area;
  };

  // Calculate area from vertices
  const calculateVertexArea = () => {
    const { A, B, C } = triangleVertices;
    return Math.abs((A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2) / 10;
  };

  // Animated particles for visual effects
  useEffect(() => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setAnimatedParticles(particles);

    const animate = () => {
      setAnimatedParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.vx + 100) % 100,
          y: (particle.y + particle.vy + 100) % 100
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const slides = [
    {
      id: 'intro',
      title: 'Triangle Geometry: Understanding Area',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <p className="text-slate-300 text-lg leading-relaxed">
                Triangles are fundamental shapes in geometry. We'll explore how to calculate 
                their area using different methods, understand the relationship between base, 
                height, and area, and discover real-world applications.
              </p>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">What is Area?</h3>
              <p className="text-slate-300 mb-4">
                Area measures the amount of space inside a two-dimensional shape. 
                For triangles, we can calculate this in several ways:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Using base and height (most common)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Using all three sides (Heron's formula)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Using coordinates of vertices
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-slate-700/50 p-6 rounded-lg">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Types of Triangles</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <svg width="50" height="40" viewBox="0 0 60 50">
                    <polygon points="30,5 55,45 5,45" fill="white" stroke="none"/>
                  </svg>
                </div>
                <p className="text-sm text-slate-300">Equilateral</p>
                <p className="text-xs text-slate-400">All sides equal</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg width="50" height="40" viewBox="0 0 60 50">
                    <polygon points="30,5 50,45 10,45" fill="white" stroke="none"/>
                  </svg>
                </div>
                <p className="text-sm text-slate-300">Isosceles</p>
                <p className="text-xs text-slate-400">Two sides equal</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg width="50" height="40" viewBox="0 0 60 50">
                    <polygon points="15,5 55,45 5,45" fill="white" stroke="none"/>
                  </svg>
                </div>
                <p className="text-sm text-slate-300">Scalene</p>
                <p className="text-xs text-slate-400">All sides different</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-blue-400 text-lg font-semibold mb-4">Real-world Applications</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-8 h-8 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
                    🏠
                  </div>
                  <p className="text-xs text-slate-300">Architecture</p>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-8 h-8 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center">
                    🗺️
                  </div>
                  <p className="text-xs text-slate-300">Land Survey</p>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-8 h-8 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
                    ⚡
                  </div>
                  <p className="text-xs text-slate-300">Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    {
      id: 'basic-formula',
      title: 'Basic Area Formula',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">The Fundamental Formula</h3>
              <p className="text-slate-300 mb-6">
                The most common way to find a triangle's area is using its base and height:
              </p>
              
              <div className="bg-slate-800/50 p-6 rounded-lg text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">
                  Area = <span className="text-blue-400">½</span> × base × height
                </div>
                <div className="text-lg text-slate-400">
                  A = <span className="text-blue-400">½</span> × b × h
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-slate-300"><strong className="text-blue-400">Base (b):</strong> Any side of the triangle</p>
                <p className="text-slate-300"><strong className="text-blue-400">Height (h):</strong> Perpendicular distance from the base to the opposite vertex</p>
                <p className="text-slate-300"><strong className="text-blue-400">½:</strong> Because a triangle is half of a rectangle</p>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Why the ½?</h3>
              <p className="text-slate-300 mb-4">
                Imagine a rectangle with the same base and height. A triangle takes up exactly 
                half the space of that rectangle.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-24 h-16 mx-auto mb-2 bg-blue-500/30 border-2 border-blue-400 relative">
                    <div className="absolute inset-0 bg-blue-500/50" style={{clipPath: 'polygon(0 0, 100% 0, 0 100%)'}}>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">Triangle = ½ Rectangle</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-16 mx-auto mb-2 bg-slate-500/30 border-2 border-slate-400">
                  </div>
                  <p className="text-sm text-slate-300">Full Rectangle</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 p-6 rounded-lg">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Interactive Calculator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Base (b): {base} units
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={base}
                  onChange={(e) => setBase(Number(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Height (h): {height} units
                </label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Calculated Area:</div>
                  <div className="text-3xl font-bold text-green-400">
                    {calculateBasicArea().toFixed(1)} square units
                  </div>
                </div>
              </div>

              <div className="relative bg-slate-800 rounded-lg p-4" style={{height: '300px'}}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#374151" strokeWidth="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                  
                  {/* Triangle */}
                  <polygon 
                    points={`20,80 ${20 + base * 3},80 20,${80 - height * 3}`}
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  
                  {/* Base line */}
                  <line 
                    x1="20" 
                    y1="80" 
                    x2={20 + base * 3} 
                    y2="80" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                  />
                  <text x={20 + base * 1.5} y="90" fill="#ef4444" fontSize="3" textAnchor="middle">
                    base = {base}
                  </text>
                  
                  {/* Height line */}
                  <line 
                    x1="20" 
                    y1="80" 
                    x2="20" 
                    y2={80 - height * 3} 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeDasharray="1,1"
                  />
                  <text x="12" y={80 - height * 1.5} fill="#10b981" fontSize="3" textAnchor="middle">
                    h = {height}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'herons-formula',
      title: 'Heron\'s Formula',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">When You Know All Three Sides</h3>
              <p className="text-slate-300 mb-6">
                Sometimes you don't know the height, but you know all three sides. 
                Heron's formula helps calculate area in this situation.
              </p>
              
              <div className="bg-slate-800/50 p-6 rounded-lg text-center mb-6">
                <div className="text-lg font-bold text-white mb-4">
                  Step 1: Calculate semi-perimeter (s)
                </div>
                <div className="text-xl text-blue-400 mb-4">
                  s = (a + b + c) ÷ 2
                </div>
                
                <div className="text-lg font-bold text-white mb-4">
                  Step 2: Apply Heron's formula
                </div>
                <div className="text-xl text-green-400">
                  Area = √[s(s-a)(s-b)(s-c)]
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-slate-300"><strong className="text-blue-400">a, b, c:</strong> The three sides of the triangle</p>
                <p className="text-slate-300"><strong className="text-blue-400">s:</strong> Semi-perimeter (half the perimeter)</p>
                <p className="text-slate-300"><strong className="text-blue-400">√:</strong> Square root symbol</p>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Example Calculation</h3>
              <p className="text-slate-300 mb-4">For a triangle with sides 3, 4, 5:</p>
              <div className="space-y-2 text-sm font-mono bg-slate-800/50 p-4 rounded">
                <div className="text-blue-400">s = (3 + 4 + 5) ÷ 2 = 6</div>
                <div className="text-green-400">Area = √[6(6-3)(6-4)(6-5)]</div>
                <div className="text-green-400">Area = √[6 × 3 × 2 × 1]</div>
                <div className="text-green-400">Area = √36 = 6 square units</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 p-6 rounded-lg">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Heron's Calculator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Side A: {sideA} units
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Side B: {sideB} units
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Side C: {sideC} units
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={sideC}
                  onChange={(e) => setSideC(Number(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Semi-perimeter (s):</span>
                  <span className="text-blue-400">{((sideA + sideB + sideC) / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Triangle exists:</span>
                  <span className={sideA + sideB > sideC && sideB + sideC > sideA && sideA + sideC > sideB ? "text-green-400" : "text-red-400"}>
                    {sideA + sideB > sideC && sideB + sideC > sideA && sideA + sideC > sideB ? "Yes" : "No"}
                  </span>
                </div>
                <div className="border-t border-slate-600 pt-3">
                  <div className="text-center">
                    <div className="text-sm text-slate-400 mb-2">Calculated Area:</div>
                    <div className="text-2xl font-bold text-green-400">
                      {calculateHeronArea().toFixed(2)} square units
                    </div>
                  </div>
                </div>
              </div>

              {!(sideA + sideB > sideC && sideB + sideC > sideA && sideA + sideC > sideB) && (
                <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg">
                  <p className="text-red-400 text-sm">
                    <strong>Triangle Inequality:</strong> The sum of any two sides must be greater than the third side.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'interactive-triangle',
      title: 'Interactive Triangle Explorer',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="bg-slate-700/50 p-6 rounded-lg">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Drag the Vertices!</h3>
            <p className="text-slate-300 mb-6">
              Click and drag the triangle corners to see how the area changes in real-time. 
              This helps visualize the relationship between shape and area.
            </p>
            
            <div 
              className="relative bg-slate-800 rounded-lg overflow-hidden"
              style={{height: '400px'}}
              onMouseMove={(e) => {
                if (!isDragging || !dragVertex) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                setTriangleVertices(prev => ({
                  ...prev,
                  [dragVertex]: { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
                }));
              }}
              onMouseUp={() => {
                setIsDragging(false);
                setDragVertex(null);
              }}
              onMouseLeave={() => {
                setIsDragging(false);
                setDragVertex(null);
              }}
            >
              {/* Animated background particles */}
              <div className="absolute inset-0">
                {animatedParticles.map(particle => (
                  <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      opacity: particle.opacity * 0.3
                    }}
                  />
                ))}
              </div>

              <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
                {/* Grid */}
                <defs>
                  <pattern id="interactiveGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#374151" strokeWidth="0.1"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#interactiveGrid)" />
                
                {/* Triangle fill */}
                <polygon 
                  points={`${triangleVertices.A.x},${triangleVertices.A.y} ${triangleVertices.B.x},${triangleVertices.B.y} ${triangleVertices.C.x},${triangleVertices.C.y}`}
                  fill="rgba(59, 130, 246, 0.3)"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                />
                
                {/* Vertices */}
                {Object.entries(triangleVertices).map(([vertex, pos]) => (
                  <circle
                    key={vertex}
                    cx={pos.x}
                    cy={pos.y}
                    r="2"
                    fill="#ef4444"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    className="cursor-pointer hover:r-3 transition-all"
                    onMouseDown={() => {
                      setIsDragging(true);
                      setDragVertex(vertex);
                    }}
                  />
                ))}
                
                {/* Vertex labels */}
                {Object.entries(triangleVertices).map(([vertex, pos]) => (
                  <text
                    key={`label-${vertex}`}
                    x={pos.x}
                    y={pos.y - 3}
                    fill="#ffffff"
                    fontSize="3"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {vertex}
                  </text>
                ))}
              </svg>
            </div>

            <button
              onClick={() => setTriangleVertices({
                A: { x: 50, y: 20 },
                B: { x: 20, y: 80 },
                C: { x: 80, y: 80 }
              })}
              className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
              Reset Triangle
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Live Measurements</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-slate-400 mb-2">Current Area</div>
                    <div className="text-3xl font-bold text-green-400">
                      {calculateVertexArea().toFixed(1)} square units
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-800/50 p-3 rounded text-center">
                    <div className="text-xs text-slate-400">Vertex A</div>
                    <div className="text-sm text-white">
                      ({triangleVertices.A.x.toFixed(0)}, {triangleVertices.A.y.toFixed(0)})
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded text-center">
                    <div className="text-xs text-slate-400">Vertex B</div>
                    <div className="text-sm text-white">
                      ({triangleVertices.B.x.toFixed(0)}, {triangleVertices.B.y.toFixed(0)})
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded text-center">
                    <div className="text-xs text-slate-400">Vertex C</div>
                    <div className="text-sm text-white">
                      ({triangleVertices.C.x.toFixed(0)}, {triangleVertices.C.y.toFixed(0)})
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Triangle Properties</h3>
              
              <div className="space-y-3">
                {(() => {
                  const { A, B, C } = triangleVertices;
                  const sideAB = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2);
                  const sideBC = Math.sqrt((C.x - B.x) ** 2 + (C.y - B.y) ** 2);
                  const sideCA = Math.sqrt((A.x - C.x) ** 2 + (A.y - C.y) ** 2);
                  const perimeter = sideAB + sideBC + sideCA;
                  
                  // Determine triangle type
                  let triangleType = "Scalene";
                  if (Math.abs(sideAB - sideBC) < 2 && Math.abs(sideBC - sideCA) < 2) {
                    triangleType = "Equilateral";
                  } else if (Math.abs(sideAB - sideBC) < 2 || Math.abs(sideBC - sideCA) < 2 || Math.abs(sideCA - sideAB) < 2) {
                    triangleType = "Isosceles";
                  }
                  
                  return (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Side AB:</span>
                        <span className="text-white">{sideAB.toFixed(1)} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Side BC:</span>
                        <span className="text-white">{sideBC.toFixed(1)} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Side CA:</span>
                        <span className="text-white">{sideCA.toFixed(1)} units</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-600 pt-3">
                        <span className="text-slate-400">Perimeter:</span>
                        <span className="text-blue-400">{perimeter.toFixed(1)} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type:</span>
                        <span className="text-green-400">{triangleType}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Area Formula Used</h3>
              <p className="text-slate-300 mb-4">
                For coordinate geometry, we use the cross product formula:
              </p>
              <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                <div className="text-lg text-white">
                  Area = ½|x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'applications',
      title: 'Real-World Applications',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Where Do We Use Triangle Areas?</h3>
              <p className="text-slate-300 mb-6">
                Triangle area calculations appear in many real-world situations. 
                Let's explore some practical applications!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setModalContent({
                    title: "Architecture & Construction",
                    content: (
                      <div className="space-y-4">
                        <p className="text-slate-300">
                          Architects use triangle areas to calculate roof spaces, triangular windows, 
                          and structural supports. The area helps determine material costs and load distribution.
                        </p>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <h4 className="text-blue-400 font-semibold mb-2">Example Problem:</h4>
                          <p className="text-sm text-slate-300">
                            A triangular roof section has a base of 12 meters and height of 8 meters. 
                            How many square meters of roofing material are needed?
                          </p>
                          <div className="mt-2 p-2 bg-slate-700 rounded">
                            <span className="text-green-400">Solution: ½ × 12 × 8 = 48 m²</span>
                          </div>
                        </div>
                      </div>
                    )
                  });
                  setIsModalOpen(true);
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🏗️</div>
                  <h4 className="text-white font-semibold">Architecture</h4>
                  <p className="text-blue-100 text-sm mt-2">Roof areas, structural design</p>
                </div>
              </div>

              <div 
                className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setModalContent({
                    title: "Land Surveying",
                    content: (
                      <div className="space-y-4">
                        <p className="text-slate-300">
                          Surveyors divide irregular land plots into triangles to calculate total area. 
                          This method is called triangulation and is very accurate.
                        </p>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <h4 className="text-blue-400 font-semibold mb-2">Example Problem:</h4>
                          <p className="text-sm text-slate-300">
                            A triangular plot of land has sides measuring 50m, 80m, and 60m. 
                            What is the area using Heron's formula?
                          </p>
                          <div className="mt-2 p-2 bg-slate-700 rounded text-xs">
                            <div className="text-green-400">s = (50+80+60)÷2 = 95m</div>
                            <div className="text-green-400">Area = √[95×45×15×35] = √2,238,750 ≈ 1,496 m²</div>
                          </div>
                        </div>
                      </div>
                    )
                  });
                  setIsModalOpen(true);
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🗺️</div>
                  <h4 className="text-white font-semibold">Land Survey</h4>
                  <p className="text-green-100 text-sm mt-2">Property boundaries, mapping</p>
                </div>
              </div>

              <div 
                className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setModalContent({
                    title: "Art & Design",
                    content: (
                      <div className="space-y-4">
                        <p className="text-slate-300">
                          Artists and designers use triangular compositions and need to calculate 
                          areas for material planning, especially in mosaic work and geometric art.
                        </p>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <h4 className="text-blue-400 font-semibold mb-2">Example Problem:</h4>
                          <p className="text-sm text-slate-300">
                            An artist is creating a triangular mosaic with base 30cm and height 25cm. 
                            If each tile covers 1cm², how many tiles are needed?
                          </p>
                          <div className="mt-2 p-2 bg-slate-700 rounded">
                            <span className="text-green-400">Solution: Area = ½ × 30 × 25 = 375 tiles</span>
                          </div>
                        </div>
                      </div>
                    )
                  });
                  setIsModalOpen(true);
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">🎨</div>
                  <h4 className="text-white font-semibold">Art & Design</h4>
                  <p className="text-purple-100 text-sm mt-2">Composition, material planning</p>
                </div>
              </div>

              <div 
                className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setModalContent({
                    title: "Navigation & GPS",
                    content: (
                      <div className="space-y-4">
                        <p className="text-slate-300">
                          GPS systems use triangulation with satellite signals. The area of triangles 
                          formed by satellites and receivers helps determine precise location.
                        </p>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <h4 className="text-blue-400 font-semibold mb-2">How It Works:</h4>
                          <p className="text-sm text-slate-300">
                            Your GPS receiver measures distances to at least 3 satellites. 
                            These form triangles, and the intersection point is your location!
                          </p>
                        </div>
                      </div>
                    )
                  });
                  setIsModalOpen(true);
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">📍</div>
                  <h4 className="text-white font-semibold">Navigation</h4>
                  <p className="text-red-100 text-sm mt-2">GPS, positioning systems</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Practice Problems</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Problem 1: Garden Design</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Sarah wants to plant flowers in a triangular garden bed. The triangle has 
                    a base of 6 meters and height of 4 meters. How much area will she cover?
                  </p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                    onClick={() => {
                      setModalContent({
                        title: "Solution: Garden Design",
                        content: (
                          <div className="space-y-4">
                            <p className="text-slate-300">Given: Base = 6m, Height = 4m</p>
                            <p className="text-slate-300">Formula: Area = ½ × base × height</p>
                            <p className="text-slate-300">Area = ½ × 6 × 4 = ½ × 24 = 12 m²</p>
                            <div className="bg-green-900/30 border border-green-500/50 p-3 rounded">
                              <p className="text-green-400">Answer: Sarah will cover 12 square meters.</p>
                            </div>
                          </div>
                        )
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    View Solution →
                  </button>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Problem 2: Flag Design</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    A flag has a triangular section with sides 5cm, 12cm, and 13cm. 
                    What is the area of this triangle?
                  </p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                    onClick={() => {
                      setModalContent({
                        title: "Solution: Flag Design",
                        content: (
                          <div className="space-y-4">
                            <p className="text-slate-300">Given: Sides a=5cm, b=12cm, c=13cm</p>
                            <p className="text-slate-300">Using Heron's formula:</p>
                            <div className="bg-slate-800/50 p-3 rounded font-mono text-sm">
                              <div>s = (5+12+13)÷2 = 15cm</div>
                              <div>Area = √[15×(15-5)×(15-12)×(15-13)]</div>
                              <div>Area = √[15×10×3×2] = √900 = 30 cm²</div>
                            </div>
                            <div className="bg-green-900/30 border border-green-500/50 p-3 rounded">
                              <p className="text-green-400">Answer: The triangular section has an area of 30 cm².</p>
                            </div>
                          </div>
                        )
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    View Solution →
                  </button>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Problem 3: Coordinate Challenge</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    A triangle has vertices at A(2,1), B(6,1), and C(4,5). 
                    Calculate its area using the coordinate formula.
                  </p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                    onClick={() => {
                      setModalContent({
                        title: "Solution: Coordinate Challenge",
                        content: (
                          <div className="space-y-4">
                            <p className="text-slate-300">Given: A(2,1), B(6,1), C(4,5)</p>
                            <p className="text-slate-300">Formula: Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|</p>
                            <div className="bg-slate-800/50 p-3 rounded font-mono text-sm">
                              <div>Area = ½|2(1-5) + 6(5-1) + 4(1-1)|</div>
                              <div>Area = ½|2(-4) + 6(4) + 4(0)|</div>
                              <div>Area = ½|-8 + 24 + 0| = ½|16| = 8</div>
                            </div>
                            <div className="bg-green-900/30 border border-green-500/50 p-3 rounded">
                              <p className="text-green-400">Answer: The triangle has an area of 8 square units.</p>
                            </div>
                          </div>
                        )
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    View Solution →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-300">The largest triangle that fits inside a circle is equilateral</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-300">Ancient Egyptians used the 3-4-5 triangle for building pyramids</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-300">Triangulation is used in GPS systems worldwide</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-300">Triangle areas help calculate forces in engineering structures</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'formula-reference',
      title: 'Formula Reference & Study Guide',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">📋 All Triangle Area Formulas</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="text-white font-semibold mb-2">1. Basic Formula (Base × Height)</h4>
                  <div className="text-xl text-green-400 font-mono mb-2">Area = ½ × base × height</div>
                  <p className="text-slate-300 text-sm">Use when you know any side and its corresponding height</p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="text-white font-semibold mb-2">2. Heron's Formula (Three Sides)</h4>
                  <div className="text-lg text-green-400 font-mono mb-1">s = (a + b + c) ÷ 2</div>
                  <div className="text-lg text-green-400 font-mono mb-2">Area = √[s(s-a)(s-b)(s-c)]</div>
                  <p className="text-slate-300 text-sm">Use when you know all three sides</p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="text-white font-semibold mb-2">3. Coordinate Formula</h4>
                  <div className="text-lg text-green-400 font-mono mb-2">Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|</div>
                  <p className="text-slate-300 text-sm">Use when you have coordinates of vertices</p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="text-white font-semibold mb-2">4. Using Two Sides & Included Angle</h4>
                  <div className="text-lg text-green-400 font-mono mb-2">Area = ½ × a × b × sin(C)</div>
                  <p className="text-slate-300 text-sm">Use when you know two sides and the angle between them</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">🎯 Exam Strategy</h3>
              
              <div className="space-y-3">
                <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-2">Step-by-Step Approach:</h4>
                  <ol className="text-slate-300 text-sm space-y-1">
                    <li>1. Draw and label the triangle</li>
                    <li>2. Identify what information is given</li>
                    <li>3. Choose the appropriate formula</li>
                    <li>4. Substitute values carefully</li>
                    <li>5. Calculate step by step</li>
                    <li>6. Write the answer with correct units</li>
                  </ol>
                </div>

                <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">Common Mistakes to Avoid:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Forgetting the ½ in basic formula</li>
                    <li>• Using wrong height (not perpendicular)</li>
                    <li>• Not checking triangle inequality for Heron's</li>
                    <li>• Mixing up coordinates in coordinate formula</li>
                    <li>• Forgetting square units in final answer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">🧮 Practice Problems</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Problem 1: Basic Formula</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Find the area of a triangle with base 12 cm and height 8 cm.
                  </p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                    onClick={() => {
                      setModalContent({
                        title: "Solution: Basic Formula Problem",
                        content: (
                          <div className="space-y-4">
                            <p className="text-slate-300">Given: Base = 12 cm, Height = 8 cm</p>
                            <p className="text-slate-300">Formula: Area = ½ × base × height</p>
                            <div className="bg-slate-800/50 p-3 rounded font-mono">
                              <div>Area = ½ × 12 × 8</div>
                              <div>Area = ½ × 96</div>
                              <div className="text-green-400">Area = 48 cm²</div>
                            </div>
                          </div>
                        )
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    View Solution →
                  </button>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Problem 2: Heron's Formula</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Find the area of a triangle with sides 6 cm, 8 cm, and 10 cm.
                  </p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                    onClick={() => {
                      setModalContent({
                        title: "Solution: Heron's Formula Problem",
                        content: (
                          <div className="space-y-4">
                            <p className="text-slate-300">Given: a = 6 cm, b = 8 cm, c = 10 cm</p>
                            <div className="bg-slate-800/50 p-3 rounded font-mono text-sm">
                              <div>s = (6 + 8 + 10) ÷ 2 = 12 cm</div>
                              <div>Area = √[s(s-a)(s-b)(s-c)]</div>
                              <div>Area = √[12 × 6 × 4 × 2]</div>
                              <div>Area = √576</div>
                              <div className="text-green-400">Area = 24 cm²</div>
                            </div>
                            <div className="bg-blue-900/30 border border-blue-500/50 p-3 rounded">
                              <p className="text-blue-400 text-sm">💡 Notice: This is a right triangle (6² + 8² = 10²)!</p>
                            </div>
                          </div>
                        )
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    View Solution →
                  </button>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Problem 3: Coordinate Geometry</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    Find the area of triangle with vertices A(0,0), B(4,0), and C(2,3).
                  </p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                    onClick={() => {
                      setModalContent({
                        title: "Solution: Coordinate Geometry Problem",
                        content: (
                          <div className="space-y-4">
                            <p className="text-slate-300">Given: A(0,0), B(4,0), C(2,3)</p>
                            <p className="text-slate-300">Formula: Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|</p>
                            <div className="bg-slate-800/50 p-3 rounded font-mono text-sm">
                              <div>Area = ½|0(0-3) + 4(3-0) + 2(0-0)|</div>
                              <div>Area = ½|0 + 12 + 0|</div>
                              <div>Area = ½ × 12</div>
                              <div className="text-green-400">Area = 6 square units</div>
                            </div>
                          </div>
                        )
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    View Solution →
                  </button>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Problem 4: Mixed Practice</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    A triangular garden has two sides 15m and 20m with included angle 60°. Find its area.
                  </p>
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                    onClick={() => {
                      setModalContent({
                        title: "Solution: Trigonometric Area Formula",
                        content: (
                          <div className="space-y-4">
                            <p className="text-slate-300">Given: a = 15m, b = 20m, angle C = 60°</p>
                            <p className="text-slate-300">Formula: Area = ½ × a × b × sin(C)</p>
                            <div className="bg-slate-800/50 p-3 rounded font-mono text-sm">
                              <div>Area = ½ × 15 × 20 × sin(60°)</div>
                              <div>Area = ½ × 300 × (√3/2)</div>
                              <div>Area = 150 × 0.866</div>
                              <div className="text-green-400">Area ≈ 129.9 m²</div>
                            </div>
                            <div className="bg-yellow-900/30 border border-yellow-500/50 p-3 rounded">
                              <p className="text-yellow-400 text-sm">📝 Remember: sin(60°) = √3/2 ≈ 0.866</p>
                            </div>
                          </div>
                        )
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    View Solution →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">📚 Memory Aids</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-2">Triangle Area Rhymes:</h4>
                  <div className="text-slate-300 text-sm space-y-1">
                    <p><em>"Half the base times height so neat,</em></p>
                    <p><em>Makes triangle area complete!"</em></p>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">Formula Selection Guide:</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                      <span className="text-slate-300">Have base + height?</span>
                      <span className="text-green-400">Use ½bh</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                      <span className="text-slate-300">Have all 3 sides?</span>
                      <span className="text-blue-400">Use Heron's</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                      <span className="text-slate-300">Have coordinates?</span>
                      <span className="text-purple-400">Use coordinate formula</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                      <span className="text-slate-300">Have 2 sides + angle?</span>
                      <span className="text-yellow-400">Use ½ab sin(C)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold mb-2">Unit Conversion Quick Reference:</h4>
                  <div className="text-slate-300 text-sm space-y-1">
                    <p>• 1 m² = 10,000 cm²</p>
                    <p>• 1 hectare = 10,000 m²</p>
                    <p>• Always check your units match!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-lg border border-blue-400/30">
              <h3 className="text-blue-400 text-xl font-semibold mb-4">🏆 Challenge Yourself!</h3>
              <p className="text-slate-300 mb-4">
                Try solving problems using different methods to verify your answers. 
                For example, if you know all three sides, try both Heron's formula and the basic formula (if you can find the height).
              </p>
              <div className="bg-slate-800/50 p-3 rounded">
                <p className="text-green-400 text-sm font-semibold">Pro Tip: In exams, always draw a neat diagram and show all your work step by step!</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 border-b border-slate-700/50">
        <h1 className="text-3xl font-bold text-white">{slides[currentSlide].title}</h1>
        <button
          onClick={() => window.location.reload()}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          {slides[currentSlide].content}
        </div>
      </main>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 border-t border-slate-700/50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </nav>

      {/* Modal */}
      {isModalOpen && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">{modalContent.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {modalContent.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriangleAreaModule;