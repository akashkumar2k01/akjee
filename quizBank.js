// AKJEE Quiz Bank — 200+ JEE Foundation Questions
// Subjects: Physics, Chemistry, Mathematics
// Format: { id, question, options:[A,B,C,D], correct(0-3), explanation, topic, subject, difficulty }

const quizBank = [

// ═══════════════════════════════════════════════
// PHYSICS — Units & Measurements (10 questions)
// ═══════════════════════════════════════════════
{
  id:"PHY001", subject:"Physics", topic:"Units & Measurements", difficulty:"easy",
  question:"The SI unit of force is:",
  options:["Joule","Pascal","Newton","Watt"],
  correct:2,
  explanation:"Newton (N) is the SI unit of force. 1 N = 1 kg·m/s². Joule is energy, Pascal is pressure, Watt is power."
},
{
  id:"PHY002", subject:"Physics", topic:"Units & Measurements", difficulty:"easy",
  question:"Dimensional formula of velocity is:",
  options:["[MLT⁻¹]","[M⁰LT⁻¹]","[MLT⁻²]","[M⁰L⁰T⁻¹]"],
  correct:1,
  explanation:"Velocity = distance/time = L/T = [M⁰LT⁻¹]. It has no mass dimension."
},
{
  id:"PHY003", subject:"Physics", topic:"Units & Measurements", difficulty:"medium",
  question:"The percentage error in measurement of a quantity A = a²b/c is (given % errors in a, b, c are 2%, 3%, 1% respectively):",
  options:["6%","8%","4%","7%"],
  correct:1,
  explanation:"% error in A = 2×(% error in a) + (% error in b) + (% error in c) = 2×2 + 3 + 1 = 8%"
},
{
  id:"PHY004", subject:"Physics", topic:"Units & Measurements", difficulty:"easy",
  question:"How many significant figures are in the number 0.00340?",
  options:["5","3","6","2"],
  correct:1,
  explanation:"Leading zeros are not significant. 0.00340 has 3 significant figures: 3, 4, and the trailing zero after 4."
},
{
  id:"PHY005", subject:"Physics", topic:"Units & Measurements", difficulty:"medium",
  question:"The dimension of Planck's constant h is same as that of:",
  options:["Linear momentum","Angular momentum","Power","Energy"],
  correct:1,
  explanation:"E = hν, so h = E/ν = [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹]. Angular momentum = mvr = [ML²T⁻¹]. They match!"
},
{
  id:"PHY006", subject:"Physics", topic:"Units & Measurements", difficulty:"medium",
  question:"If length L = (2.0 ± 0.1) cm and breadth B = (1.0 ± 0.1) cm, then area A = L×B has error:",
  options:["± 0.2 cm²","± 0.1 cm²","± 0.3 cm²","± 0.01 cm²"],
  correct:2,
  explanation:"For A = L×B, ΔA/A = ΔL/L + ΔB/B. ΔA = A(ΔL/L + ΔB/B) = 2(0.1/2 + 0.1/1) = 2(0.05+0.10) = 0.3 cm²"
},
{
  id:"PHY007", subject:"Physics", topic:"Units & Measurements", difficulty:"easy",
  question:"1 light year is a unit of:",
  options:["Time","Speed","Distance","Energy"],
  correct:2,
  explanation:"A light year is the distance light travels in one year. It equals approximately 9.46 × 10¹⁵ metres."
},
{
  id:"PHY008", subject:"Physics", topic:"Units & Measurements", difficulty:"hard",
  question:"The frequency of a tuning fork depends on length l, density ρ, and Young's modulus Y. By dimensional analysis, frequency ∝:",
  options:["(1/l)√(Y/ρ)","l√(Y/ρ)","(1/l)√(ρ/Y)","l²√(Y/ρ)"],
  correct:0,
  explanation:"[f] = T⁻¹. Combining dimensions: f ∝ (1/l)√(Y/ρ) gives [T⁻¹] = (1/m)×√(Pa/(kg/m³)) = [T⁻¹] ✓"
},
{
  id:"PHY009", subject:"Physics", topic:"Units & Measurements", difficulty:"easy",
  question:"The SI unit of pressure is:",
  options:["Newton","Pascal","Bar","Atm"],
  correct:1,
  explanation:"Pascal (Pa) is the SI unit of pressure. 1 Pa = 1 N/m². Other units like bar and atm are non-SI units."
},
{
  id:"PHY010", subject:"Physics", topic:"Units & Measurements", difficulty:"medium",
  question:"A physical quantity P = a³b²/√c. If percentage errors in a, b, c are 1%, 2%, 4% respectively, the percentage error in P is:",
  options:["7%","9%","12%","10%"],
  correct:1,
  explanation:"% error = 3×1 + 2×2 + (1/2)×4 = 3 + 4 + 2 = 9%"
},

// ═══════════════════════════════════════════════
// PHYSICS — Kinematics (15 questions)
// ═══════════════════════════════════════════════
{
  id:"PHY011", subject:"Physics", topic:"Kinematics", difficulty:"easy",
  question:"A ball is thrown vertically upward with speed 20 m/s. Time to reach maximum height (g = 10 m/s²):",
  options:["1 s","2 s","4 s","5 s"],
  correct:1,
  explanation:"At max height, v = 0. Using v = u - gt: 0 = 20 - 10t → t = 2 s"
},
{
  id:"PHY012", subject:"Physics", topic:"Kinematics", difficulty:"easy",
  question:"A car accelerates from rest at 2 m/s². Distance covered in 5 seconds:",
  options:["10 m","25 m","50 m","5 m"],
  correct:1,
  explanation:"s = ut + ½at² = 0 + ½×2×25 = 25 m"
},
{
  id:"PHY013", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"A stone is dropped from a height of 80 m. Time to reach the ground (g = 10 m/s²):",
  options:["2 s","4 s","8 s","16 s"],
  correct:1,
  explanation:"h = ½gt² → 80 = ½×10×t² → t² = 16 → t = 4 s"
},
{
  id:"PHY014", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"A projectile is fired at 60° to the horizontal with speed 20 m/s. Maximum height reached (g = 10 m/s²):",
  options:["10 m","15 m","20 m","5 m"],
  correct:1,
  explanation:"H = u²sin²θ/(2g) = (400 × sin²60°)/20 = (400 × 3/4)/20 = 15 m"
},
{
  id:"PHY015", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"A body starts from rest and attains velocity 30 m/s in 6 s. The acceleration is:",
  options:["3 m/s²","5 m/s²","6 m/s²","180 m/s²"],
  correct:1,
  explanation:"a = (v-u)/t = (30-0)/6 = 5 m/s²"
},
{
  id:"PHY016", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"A bullet fired horizontally with velocity 100 m/s from a height of 45 m hits the ground after (g = 10 m/s²):",
  options:["2 s","3 s","4.5 s","1 s"],
  correct:1,
  explanation:"Vertical: h = ½gt² → 45 = ½×10×t² → t = 3 s. Horizontal velocity doesn't affect time of fall."
},
{
  id:"PHY017", subject:"Physics", topic:"Kinematics", difficulty:"hard",
  question:"A particle moves along x-axis with velocity v = 3t² - 12t + 9 m/s. The particle is momentarily at rest at t =",
  options:["t = 1 s only","t = 3 s only","t = 1 s and t = 3 s","t = 2 s"],
  correct:2,
  explanation:"Set v = 0: 3t² - 12t + 9 = 0 → t² - 4t + 3 = 0 → (t-1)(t-3) = 0 → t = 1 s and t = 3 s"
},
{
  id:"PHY018", subject:"Physics", topic:"Kinematics", difficulty:"easy",
  question:"The area under a velocity-time graph represents:",
  options:["Acceleration","Displacement","Speed","Jerk"],
  correct:1,
  explanation:"Area under v-t graph = ∫v dt = displacement. This is a fundamental concept in kinematics graphs."
},
{
  id:"PHY019", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"Range of a projectile fired at angle θ is maximum when θ equals:",
  options:["30°","45°","60°","90°"],
  correct:1,
  explanation:"R = u²sin2θ/g is maximum when sin2θ = 1, i.e., 2θ = 90°, so θ = 45°."
},
{
  id:"PHY020", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"A train 100 m long passes a station 100 m long. If speed of train is 20 m/s, time to cross the station completely:",
  options:["5 s","10 s","15 s","20 s"],
  correct:1,
  explanation:"Total distance = length of train + length of station = 100 + 100 = 200 m. Time = 200/20 = 10 s"
},
{
  id:"PHY021", subject:"Physics", topic:"Kinematics", difficulty:"hard",
  question:"Two balls are thrown simultaneously from the same point — one upward at 20 m/s and one downward at 20 m/s. Relative velocity between them is:",
  options:["0 m/s","20 m/s","40 m/s","10 m/s"],
  correct:2,
  explanation:"Relative velocity = v₁ - v₂ = (+20) - (-20) = 40 m/s. Both accelerate due to gravity but in same direction, so relative acceleration is zero."
},
{
  id:"PHY022", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"A car decelerates from 72 km/h to rest uniformly in 10 s. Distance covered:",
  options:["100 m","200 m","72 m","50 m"],
  correct:0,
  explanation:"u = 72 km/h = 20 m/s, v = 0, t = 10 s. s = (u+v)/2 × t = (20+0)/2 × 10 = 100 m"
},
{
  id:"PHY023", subject:"Physics", topic:"Kinematics", difficulty:"easy",
  question:"The slope of displacement-time graph gives:",
  options:["Acceleration","Speed","Velocity","Distance"],
  correct:2,
  explanation:"Velocity = ds/dt = slope of s-t graph. Note: it gives velocity (with direction), not just speed."
},
{
  id:"PHY024", subject:"Physics", topic:"Kinematics", difficulty:"medium",
  question:"A projectile has the same range for two angles θ₁ and θ₂. If θ₁ + θ₂ = 90°, which is true?",
  options:["θ₁ = θ₂","Their times of flight are equal","θ₁ × θ₂ = 90°","Their maximum heights add to R/4"],
  correct:3,
  explanation:"For complementary angles: H₁ + H₂ = u²sin²θ₁/(2g) + u²cos²θ₁/(2g) = u²/(2g) = R/4 (since R = u²sin2θ/g = u²/g for θ=45°, H₁+H₂ = R/4)"
},
{
  id:"PHY025", subject:"Physics", topic:"Kinematics", difficulty:"hard",
  question:"A body is projected at 30° to horizontal. If T is time of flight and R is range, then tan30° equals:",
  options:["gT/R","gT²/2R","gT/2R","2gT/R"],
  correct:1,
  explanation:"T = 2u sinθ/g, R = u²sin2θ/g = 2u²sinθcosθ/g. T²/R = 4u²sin²θ/g² ÷ 2u²sinθcosθ/g = 2sinθ/(g cosθ). So gT²/2R = tanθ ✓"
},

// ═══════════════════════════════════════════════
// PHYSICS — Newton's Laws (12 questions)
// ═══════════════════════════════════════════════
{
  id:"PHY026", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"easy",
  question:"A 5 kg object accelerates at 3 m/s². The net force on it is:",
  options:["1.67 N","8 N","15 N","2 N"],
  correct:2,
  explanation:"F = ma = 5 × 3 = 15 N"
},
{
  id:"PHY027", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"easy",
  question:"Newton's first law is also called the law of:",
  options:["Action-Reaction","Momentum","Inertia","Acceleration"],
  correct:2,
  explanation:"Newton's First Law states that a body continues in its state unless acted upon by a net external force — this property is called inertia."
},
{
  id:"PHY028", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"medium",
  question:"A 10 kg block on a frictionless surface is pulled by a 50 N force at 30° to horizontal. Acceleration of the block:",
  options:["5 m/s²","4.33 m/s²","2.5 m/s²","5.77 m/s²"],
  correct:1,
  explanation:"Horizontal component = 50 cos30° = 50 × (√3/2) = 43.3 N. a = F/m = 43.3/10 = 4.33 m/s²"
},
{
  id:"PHY029", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"medium",
  question:"Two masses 3 kg and 5 kg are connected by a string over a frictionless pulley (Atwood machine). Acceleration of the system (g = 10 m/s²):",
  options:["1.25 m/s²","2.5 m/s²","5 m/s²","10 m/s²"],
  correct:1,
  explanation:"a = (m₂-m₁)g/(m₁+m₂) = (5-3)×10/(5+3) = 20/8 = 2.5 m/s²"
},
{
  id:"PHY030", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"medium",
  question:"A person standing in a lift feels 80% of their normal weight. The lift is:",
  options:["Moving up with acceleration","Moving down with acceleration","Moving up with constant velocity","Moving down with constant velocity"],
  correct:1,
  explanation:"Apparent weight < real weight → pseudo force acts upward → acceleration downward. N = m(g-a) = 0.8mg → a = 0.2g downward."
},
{
  id:"PHY031", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"hard",
  question:"A block of mass M is on a frictionless incline of angle θ. A horizontal force F is applied. For the block to remain stationary, F =",
  options:["Mg tanθ","Mg sinθ","Mg cosθ","Mg/tanθ"],
  correct:0,
  explanation:"Along incline: F cosθ = Mg sinθ (net force along incline = 0). Normal: N = Mg cosθ + F sinθ. Solving: F = Mg sinθ/cosθ = Mg tanθ"
},
{
  id:"PHY032", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"medium",
  question:"The coefficient of static friction between a 5 kg block and a surface is 0.4 (g = 10 m/s²). Maximum force of static friction:",
  options:["2 N","20 N","50 N","0.4 N"],
  correct:1,
  explanation:"f_max = μₛN = μₛmg = 0.4 × 5 × 10 = 20 N"
},
{
  id:"PHY033", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"medium",
  question:"When a bullet of mass 10 g fired from a gun of mass 2 kg, the bullet leaves at 400 m/s. Recoil velocity of gun:",
  options:["2 m/s","4 m/s","200 m/s","0.2 m/s"],
  correct:0,
  explanation:"Conservation of momentum: 0 = m_bullet × v_bullet + m_gun × v_gun. 0 = 0.01×400 + 2×v_gun. v_gun = -4/2 = -2 m/s (speed = 2 m/s)"
},
{
  id:"PHY034", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"easy",
  question:"Newton's Third Law states that action and reaction forces are:",
  options:["Equal in magnitude, same direction","Equal in magnitude, opposite direction, on different bodies","Unequal, opposite direction","Equal, opposite, on same body"],
  correct:1,
  explanation:"Action and reaction are equal in magnitude, opposite in direction, and act on DIFFERENT bodies. This is crucial — they don't cancel because they act on different objects."
},
{
  id:"PHY035", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"hard",
  question:"Three blocks of masses 2, 3, and 5 kg are connected in series on a frictionless surface and pulled by a 20 N force. Tension between 2 kg and 3 kg block:",
  options:["4 N","6 N","16 N","18 N"],
  correct:2,
  explanation:"Total mass = 10 kg, a = F/m = 20/10 = 2 m/s². Tension T₁ pulls (3+5)=8 kg. T₁ = 8×2 = 16 N"
},
{
  id:"PHY036", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"medium",
  question:"A car moving at 20 m/s brakes to a stop. Coefficient of kinetic friction = 0.5, g = 10 m/s². Stopping distance:",
  options:["20 m","40 m","80 m","10 m"],
  correct:1,
  explanation:"Deceleration a = μg = 0.5×10 = 5 m/s². Using v² = u² - 2as: 0 = 400 - 2×5×s → s = 40 m"
},
{
  id:"PHY037", subject:"Physics", topic:"Newton's Laws of Motion", difficulty:"medium",
  question:"What force is required to move a 10 kg box at constant velocity if μ_kinetic = 0.3 (g = 10 m/s²)?",
  options:["3 N","30 N","100 N","300 N"],
  correct:1,
  explanation:"Constant velocity → zero acceleration → applied force = friction force = μ_k × mg = 0.3 × 10 × 10 = 30 N"
},

// ═══════════════════════════════════════════════
// PHYSICS — Work, Energy & Power (10 questions)
// ═══════════════════════════════════════════════
{
  id:"PHY038", subject:"Physics", topic:"Work Energy Power", difficulty:"easy",
  question:"A force of 10 N moves a body through 5 m in the direction of force. Work done:",
  options:["2 J","50 J","15 J","0.5 J"],
  correct:1,
  explanation:"W = F·d·cosθ = 10 × 5 × cos0° = 50 J"
},
{
  id:"PHY039", subject:"Physics", topic:"Work Energy Power", difficulty:"easy",
  question:"A 2 kg object moving at 4 m/s has kinetic energy:",
  options:["8 J","16 J","32 J","4 J"],
  correct:1,
  explanation:"KE = ½mv² = ½ × 2 × 16 = 16 J"
},
{
  id:"PHY040", subject:"Physics", topic:"Work Energy Power", difficulty:"medium",
  question:"A body is raised to height h from the ground. Its potential energy at that height (mass m, g = 10 m/s², h = 5 m, m = 2 kg):",
  options:["50 J","100 J","25 J","10 J"],
  correct:1,
  explanation:"PE = mgh = 2 × 10 × 5 = 100 J"
},
{
  id:"PHY041", subject:"Physics", topic:"Work Energy Power", difficulty:"medium",
  question:"A machine does 1000 J of work in 5 seconds. Its power output:",
  options:["5000 W","200 W","100 W","5 W"],
  correct:1,
  explanation:"P = W/t = 1000/5 = 200 W"
},
{
  id:"PHY042", subject:"Physics", topic:"Work Energy Power", difficulty:"medium",
  question:"A body of mass 2 kg falls from height 10 m. Its speed just before hitting ground (g = 10 m/s²):",
  options:["10 m/s","14.14 m/s","20 m/s","100 m/s"],
  correct:1,
  explanation:"Using energy conservation: ½mv² = mgh → v² = 2gh = 2×10×10 = 200 → v = √200 = 10√2 ≈ 14.14 m/s"
},
{
  id:"PHY043", subject:"Physics", topic:"Work Energy Power", difficulty:"hard",
  question:"Work done against friction when a 5 kg block moves 4 m on a surface with μ = 0.2 (g = 10 m/s²):",
  options:["8 J","40 J","4 J","10 J"],
  correct:1,
  explanation:"Friction force = μmg = 0.2×5×10 = 10 N. W = F×d = 10×4 = 40 J"
},
{
  id:"PHY044", subject:"Physics", topic:"Work Energy Power", difficulty:"medium",
  question:"If speed of an object doubles, its kinetic energy becomes:",
  options:["Double","Four times","Half","Eight times"],
  correct:1,
  explanation:"KE = ½mv². If v → 2v, KE_new = ½m(2v)² = 4×½mv² = 4×KE_old. Kinetic energy quadruples."
},
{
  id:"PHY045", subject:"Physics", topic:"Work Energy Power", difficulty:"hard",
  question:"A spring of spring constant k = 100 N/m is compressed by 0.1 m. Energy stored:",
  options:["0.5 J","1 J","10 J","5 J"],
  correct:0,
  explanation:"Elastic PE = ½kx² = ½ × 100 × 0.01 = 0.5 J"
},
{
  id:"PHY046", subject:"Physics", topic:"Work Energy Power", difficulty:"medium",
  question:"Work done by a centripetal force on a body in circular motion:",
  options:["Positive","Negative","Zero","Depends on speed"],
  correct:2,
  explanation:"Centripetal force is always perpendicular to velocity (displacement). W = F·d·cos90° = 0. No work is done by centripetal force."
},
{
  id:"PHY047", subject:"Physics", topic:"Work Energy Power", difficulty:"medium",
  question:"A pump lifts 100 kg of water to a height of 10 m in 20 s. Power of pump (g = 10 m/s²):",
  options:["500 W","1000 W","50 W","200 W"],
  correct:0,
  explanation:"W = mgh = 100×10×10 = 10000 J. P = W/t = 10000/20 = 500 W"
},

// ═══════════════════════════════════════════════
// PHYSICS — Gravitation (10 questions)
// ═══════════════════════════════════════════════
{
  id:"PHY048", subject:"Physics", topic:"Gravitation", difficulty:"easy",
  question:"Escape velocity from Earth's surface (g = 9.8 m/s², R = 6400 km):",
  options:["7.9 km/s","11.2 km/s","9.8 km/s","5 km/s"],
  correct:1,
  explanation:"v_escape = √(2gR) = √(2 × 9.8 × 6.4×10⁶) = √(125.44×10⁶) ≈ 11.2 km/s"
},
{
  id:"PHY049", subject:"Physics", topic:"Gravitation", difficulty:"medium",
  question:"Gravitational force between two masses becomes 4 times if distance between them is:",
  options:["Doubled","Halved","Increased 4 times","Decreased 4 times"],
  correct:1,
  explanation:"F = Gm₁m₂/r². If r → r/2, F_new = Gm₁m₂/(r/2)² = 4F. Force becomes 4 times."
},
{
  id:"PHY050", subject:"Physics", topic:"Gravitation", difficulty:"medium",
  question:"The orbital velocity of a satellite at height h from Earth's surface is:",
  options:["√(gR²/(R+h))","√(gR)","√(g(R+h))","√(2gR)"],
  correct:0,
  explanation:"v = √(GM/(R+h)) = √(gR²/(R+h)) since GM = gR²"
},
{
  id:"PHY051", subject:"Physics", topic:"Gravitation", difficulty:"easy",
  question:"Kepler's second law (law of areas) states that a planet:",
  options:["Moves in an ellipse","Sweeps equal areas in equal times","Has T² ∝ r³","Moves with constant speed"],
  correct:1,
  explanation:"Kepler's Second Law: A line joining the planet to the Sun sweeps equal areas in equal intervals of time (conservation of angular momentum)."
},
{
  id:"PHY052", subject:"Physics", topic:"Gravitation", difficulty:"medium",
  question:"At what height above Earth's surface is g reduced to g/4? (R = radius of Earth)",
  options:["R","2R","R/2","R√2"],
  correct:0,
  explanation:"g_h = gR²/(R+h)². Setting g/4 = gR²/(R+h)² → (R+h)² = 4R² → R+h = 2R → h = R"
},
{
  id:"PHY053", subject:"Physics", topic:"Gravitation", difficulty:"hard",
  question:"Time period of a satellite in circular orbit near Earth's surface (R = 6400 km, g = 10 m/s²):",
  options:["42 min","84 min","24 hours","1 hour"],
  correct:1,
  explanation:"T = 2π√(R/g) = 2π√(6.4×10⁶/10) = 2π×800 s ≈ 5027 s ≈ 84 minutes"
},
{
  id:"PHY054", subject:"Physics", topic:"Gravitation", difficulty:"medium",
  question:"Weight of a body at the centre of Earth is:",
  options:["Maximum","Minimum (zero)","Same as on surface","Half of surface value"],
  correct:1,
  explanation:"At the centre, g = 0 (equal gravitational pull from all sides). Weight = mg = 0."
},
{
  id:"PHY055", subject:"Physics", topic:"Gravitation", difficulty:"medium",
  question:"If mass of Earth doubles but radius remains same, g becomes:",
  options:["g/2","2g","4g","g/4"],
  correct:1,
  explanation:"g = GM/R². If M doubles, g_new = G(2M)/R² = 2g. g doubles."
},
{
  id:"PHY056", subject:"Physics", topic:"Gravitation", difficulty:"easy",
  question:"The gravitational potential energy at infinity is taken as:",
  options:["Maximum positive","Zero","Minimum negative","Depends on mass"],
  correct:1,
  explanation:"By convention, gravitational PE = -GMm/r → 0 as r → ∞. All finite-distance PE values are negative."
},
{
  id:"PHY057", subject:"Physics", topic:"Gravitation", difficulty:"hard",
  question:"A satellite is moved from circular orbit of radius R to 2R. Its orbital speed:",
  options:["Increases by √2","Decreases by √2","Remains same","Doubles"],
  correct:1,
  explanation:"v = √(GM/r). When r doubles: v_new = √(GM/2R) = v/√2. Speed decreases by factor √2."
},

// ═══════════════════════════════════════════════
// PHYSICS — Thermodynamics (10 questions)
// ═══════════════════════════════════════════════
{
  id:"PHY058", subject:"Physics", topic:"Thermodynamics", difficulty:"easy",
  question:"First Law of Thermodynamics is a statement of conservation of:",
  options:["Momentum","Energy","Mass","Entropy"],
  correct:1,
  explanation:"First Law: ΔU = Q - W. Heat added = increase in internal energy + work done by system. It's conservation of energy."
},
{
  id:"PHY059", subject:"Physics", topic:"Thermodynamics", difficulty:"medium",
  question:"In an isothermal process, temperature remains constant. For an ideal gas, which is true?",
  options:["ΔU = 0","Q = 0","W = 0","P×V = constant"],
  correct:3,
  explanation:"In isothermal process: T = constant → PV = nRT = constant (Boyle's Law). Also ΔU = 0, so Q = W."
},
{
  id:"PHY060", subject:"Physics", topic:"Thermodynamics", difficulty:"medium",
  question:"In an adiabatic process:",
  options:["Temperature remains constant","Pressure remains constant","No heat exchange with surroundings","Volume remains constant"],
  correct:2,
  explanation:"Adiabatic: Q = 0 (no heat exchange). ΔU = -W. The gas does work at the expense of internal energy."
},
{
  id:"PHY061", subject:"Physics", topic:"Thermodynamics", difficulty:"hard",
  question:"Efficiency of a Carnot engine working between 500 K and 300 K:",
  options:["60%","40%","80%","20%"],
  correct:1,
  explanation:"η = 1 - T_cold/T_hot = 1 - 300/500 = 1 - 0.6 = 0.4 = 40%"
},
{
  id:"PHY062", subject:"Physics", topic:"Thermodynamics", difficulty:"medium",
  question:"If a gas is compressed isothermally to half its volume, its pressure becomes:",
  options:["Half","Same","Double","Four times"],
  correct:2,
  explanation:"Isothermal: PV = constant. If V → V/2, then P_new = 2P. Pressure doubles."
},
{
  id:"PHY063", subject:"Physics", topic:"Thermodynamics", difficulty:"easy",
  question:"The process in which pressure remains constant is called:",
  options:["Isothermal","Adiabatic","Isobaric","Isochoric"],
  correct:2,
  explanation:"Isobaric = constant pressure. Isothermal = constant T. Adiabatic = no heat. Isochoric = constant volume."
},
{
  id:"PHY064", subject:"Physics", topic:"Thermodynamics", difficulty:"medium",
  question:"According to the second law of thermodynamics, heat flows spontaneously:",
  options:["From cold to hot","From hot to cold","In both directions equally","Only in vacuum"],
  correct:1,
  explanation:"Second Law: Heat spontaneously flows from higher temperature to lower temperature, never the reverse without external work."
},
{
  id:"PHY065", subject:"Physics", topic:"Thermodynamics", difficulty:"hard",
  question:"For a diatomic gas, the ratio Cp/Cv (γ) is:",
  options:["5/3","7/5","4/3","3/2"],
  correct:1,
  explanation:"For diatomic gas: Cv = (5/2)R, Cp = (7/2)R. γ = Cp/Cv = 7/5 = 1.4. (Monatomic: γ = 5/3)"
},
{
  id:"PHY066", subject:"Physics", topic:"Thermodynamics", difficulty:"medium",
  question:"A gas does 200 J of work while absorbing 500 J of heat. Change in internal energy:",
  options:["700 J","300 J","-300 J","100 J"],
  correct:1,
  explanation:"ΔU = Q - W = 500 - 200 = 300 J (increase in internal energy)"
},
{
  id:"PHY067", subject:"Physics", topic:"Thermodynamics", difficulty:"medium",
  question:"Absolute zero temperature corresponds to:",
  options:["0°C","–100°C","–273.15°C","–373°C"],
  correct:2,
  explanation:"Absolute zero = 0 K = –273.15°C. At absolute zero, molecular motion theoretically ceases."
},

// ═══════════════════════════════════════════════
// CHEMISTRY — Mole Concept (10 questions)
// ═══════════════════════════════════════════════
{
  id:"CHE001", subject:"Chemistry", topic:"Mole Concept", difficulty:"easy",
  question:"Avogadro's number is approximately:",
  options:["6.022 × 10²³","6.022 × 10¹⁸","6.022 × 10²⁰","1.022 × 10²³"],
  correct:0,
  explanation:"Avogadro's number Nₐ = 6.022 × 10²³ mol⁻¹. It represents the number of atoms/molecules/entities in one mole."
},
{
  id:"CHE002", subject:"Chemistry", topic:"Mole Concept", difficulty:"easy",
  question:"Molar mass of water (H₂O) is:",
  options:["16 g/mol","18 g/mol","20 g/mol","10 g/mol"],
  correct:1,
  explanation:"M(H₂O) = 2×M(H) + M(O) = 2×1 + 16 = 18 g/mol"
},
{
  id:"CHE003", subject:"Chemistry", topic:"Mole Concept", difficulty:"medium",
  question:"Number of moles in 36 g of water:",
  options:["36","18","2","0.5"],
  correct:2,
  explanation:"n = mass/molar mass = 36/18 = 2 moles"
},
{
  id:"CHE004", subject:"Chemistry", topic:"Mole Concept", difficulty:"medium",
  question:"Number of molecules in 2 moles of CO₂:",
  options:["6.022×10²³","1.204×10²⁴","3.011×10²³","2×10²³"],
  correct:1,
  explanation:"N = n × Nₐ = 2 × 6.022×10²³ = 1.204×10²⁴ molecules"
},
{
  id:"CHE005", subject:"Chemistry", topic:"Mole Concept", difficulty:"medium",
  question:"Empirical formula of a compound with 40% C, 6.67% H, 53.33% O by mass:",
  options:["CH₂O","C₂H₄O₂","CHO","C₃H₆O₃"],
  correct:0,
  explanation:"Molar ratios: C=40/12=3.33, H=6.67/1=6.67, O=53.33/16=3.33. Dividing by 3.33: C:H:O = 1:2:1 → CH₂O"
},
{
  id:"CHE006", subject:"Chemistry", topic:"Mole Concept", difficulty:"hard",
  question:"In the reaction N₂ + 3H₂ → 2NH₃, if 14 g N₂ reacts completely, moles of NH₃ formed:",
  options:["1","2","0.5","1.5"],
  correct:0,
  explanation:"14 g N₂ = 14/28 = 0.5 mol N₂. From stoichiometry: 1 mol N₂ → 2 mol NH₃. So 0.5 mol N₂ → 1 mol NH₃"
},
{
  id:"CHE007", subject:"Chemistry", topic:"Mole Concept", difficulty:"medium",
  question:"Mass of 3.011 × 10²³ molecules of oxygen (O₂):",
  options:["32 g","16 g","8 g","48 g"],
  correct:1,
  explanation:"3.011×10²³ = 0.5 mol O₂. Mass = 0.5 × 32 = 16 g"
},
{
  id:"CHE008", subject:"Chemistry", topic:"Mole Concept", difficulty:"easy",
  question:"The number of atoms in 1 mole of He (helium):",
  options:["6.022 × 10²³","2 × 6.022 × 10²³","3.011 × 10²³","6.022 × 10²³/2"],
  correct:0,
  explanation:"He is monoatomic. 1 mole of He = 6.022 × 10²³ atoms (same as Avogadro's number)."
},
{
  id:"CHE009", subject:"Chemistry", topic:"Mole Concept", difficulty:"hard",
  question:"Which has more mass: 1 mole of CH₄ or 1 mole of CO₂?",
  options:["CH₄ (16 g)","CO₂ (44 g)","Both equal","Cannot compare"],
  correct:1,
  explanation:"M(CH₄) = 12+4 = 16 g/mol. M(CO₂) = 12+32 = 44 g/mol. CO₂ has more mass per mole."
},
{
  id:"CHE010", subject:"Chemistry", topic:"Mole Concept", difficulty:"medium",
  question:"If 0.5 mol of H₂SO₄ completely neutralises a NaOH solution, moles of NaOH used:",
  options:["0.5","1","2","0.25"],
  correct:1,
  explanation:"H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Ratio = 1:2. So 0.5 mol H₂SO₄ requires 1 mol NaOH."
},

// ═══════════════════════════════════════════════
// CHEMISTRY — Atomic Structure (10 questions)
// ═══════════════════════════════════════════════
{
  id:"CHE011", subject:"Chemistry", topic:"Atomic Structure", difficulty:"easy",
  question:"Maximum number of electrons in the L shell (n=2):",
  options:["2","8","18","32"],
  correct:1,
  explanation:"Max electrons in shell n = 2n². For n=2: 2×4 = 8 electrons."
},
{
  id:"CHE012", subject:"Chemistry", topic:"Atomic Structure", difficulty:"easy",
  question:"The Bohr model is applicable to:",
  options:["All atoms","Hydrogen-like ions only","Only hydrogen","All s-block elements"],
  correct:1,
  explanation:"Bohr model works for hydrogen and hydrogen-like (one electron) species: H, He⁺, Li²⁺, Be³⁺ etc."
},
{
  id:"CHE013", subject:"Chemistry", topic:"Atomic Structure", difficulty:"medium",
  question:"Energy of electron in H atom at n=2 (E₁ = –13.6 eV):",
  options:["–13.6 eV","–3.4 eV","–6.8 eV","–27.2 eV"],
  correct:1,
  explanation:"Eₙ = E₁/n² = –13.6/4 = –3.4 eV"
},
{
  id:"CHE014", subject:"Chemistry", topic:"Atomic Structure", difficulty:"medium",
  question:"Which quantum number determines the shape of an orbital?",
  options:["Principal (n)","Azimuthal (l)","Magnetic (m)","Spin (s)"],
  correct:1,
  explanation:"Azimuthal quantum number l determines shape: l=0 → s (spherical), l=1 → p (dumbbell), l=2 → d."
},
{
  id:"CHE015", subject:"Chemistry", topic:"Atomic Structure", difficulty:"medium",
  question:"Electronic configuration of Fe (Z=26) is:",
  options:["[Ar] 4s² 3d⁶","[Ar] 3d⁸","[Ar] 4s¹ 3d⁷","[Ar] 4p²"],
  correct:0,
  explanation:"Fe (Z=26): [Ar] (Z=18) + 8 more electrons: 3d⁶ 4s² → [Ar] 4s² 3d⁶. Note: 4s fills before 3d."
},
{
  id:"CHE016", subject:"Chemistry", topic:"Atomic Structure", difficulty:"hard",
  question:"Wavelength of emitted photon when electron falls from n=4 to n=2 in H atom. Using Rydberg constant R=1.097×10⁷ m⁻¹:",
  options:["486 nm","656 nm","410 nm","122 nm"],
  correct:0,
  explanation:"1/λ = R(1/n₁² - 1/n₂²) = 1.097×10⁷(1/4 - 1/16) = 1.097×10⁷ × 3/16 = 2.06×10⁶. λ = 486 nm (Balmer series, visible blue line)"
},
{
  id:"CHE017", subject:"Chemistry", topic:"Atomic Structure", difficulty:"easy",
  question:"The mass of proton is approximately:",
  options:["1 amu","1/1836 amu","4 amu","0 amu"],
  correct:0,
  explanation:"Proton mass ≈ 1.67 × 10⁻²⁷ kg ≈ 1 amu. Electron mass ≈ 1/1836 amu (much lighter)."
},
{
  id:"CHE018", subject:"Chemistry", topic:"Atomic Structure", difficulty:"medium",
  question:"Heisenberg's Uncertainty Principle states it is impossible to know simultaneously the exact:",
  options:["Position and mass","Velocity and mass","Position and momentum","Charge and mass"],
  correct:2,
  explanation:"Δx × Δp ≥ h/4π. You cannot simultaneously determine exact position and exact momentum (or velocity) of a particle."
},
{
  id:"CHE019", subject:"Chemistry", topic:"Atomic Structure", difficulty:"medium",
  question:"Which series of hydrogen spectrum lies in visible region?",
  options:["Lyman series","Balmer series","Paschen series","Brackett series"],
  correct:1,
  explanation:"Balmer series: transitions to n=2. Wavelengths in visible range (380-700 nm). Lyman = UV, Paschen/Brackett = IR."
},
{
  id:"CHE020", subject:"Chemistry", topic:"Atomic Structure", difficulty:"hard",
  question:"Number of radial nodes in 3p orbital:",
  options:["0","1","2","3"],
  correct:1,
  explanation:"Radial nodes = n - l - 1 = 3 - 1 - 1 = 1. (n=3 for 3p, l=1 for p orbital)"
},

// ═══════════════════════════════════════════════
// CHEMISTRY — Chemical Bonding (10 questions)
// ═══════════════════════════════════════════════
{
  id:"CHE021", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"easy",
  question:"Which of the following has ionic bond?",
  options:["HCl","NaCl","H₂O","CO₂"],
  correct:1,
  explanation:"NaCl is formed by complete electron transfer from Na to Cl → ionic bond. Others have covalent bonds."
},
{
  id:"CHE022", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"medium",
  question:"Hybridization of carbon in methane (CH₄):",
  options:["sp","sp²","sp³","sp³d"],
  correct:2,
  explanation:"CH₄: carbon forms 4 single bonds. Hybridization = sp³. Tetrahedral geometry, bond angle = 109.5°."
},
{
  id:"CHE023", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"medium",
  question:"Shape of water molecule (H₂O) according to VSEPR theory:",
  options:["Linear","Tetrahedral","Bent/Angular","Trigonal planar"],
  correct:2,
  explanation:"O has 2 bond pairs and 2 lone pairs. Electron geometry = tetrahedral, molecular shape = bent. Bond angle ≈ 104.5°."
},
{
  id:"CHE024", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"medium",
  question:"Bond order of O₂ according to MOT:",
  options:["1","2","3","1.5"],
  correct:1,
  explanation:"O₂ MOT: (σ2s)²(σ*2s)²(σ2p)²(π2p)⁴(π*2p)². Bond order = (8-4)/2 = 2. O₂ has double bond and is paramagnetic."
},
{
  id:"CHE025", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"hard",
  question:"Which molecule has the highest bond energy?",
  options:["N₂","O₂","F₂","Cl₂"],
  correct:0,
  explanation:"N₂ has a triple bond (N≡N), bond energy ≈ 946 kJ/mol — highest among common diatomic molecules. O₂ has double bond."
},
{
  id:"CHE026", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"medium",
  question:"Hybridization in BF₃:",
  options:["sp³","sp²","sp","sp³d"],
  correct:1,
  explanation:"BF₃: B has 3 bond pairs, 0 lone pairs. sp² hybridization → trigonal planar, 120° bond angles."
},
{
  id:"CHE027", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"easy",
  question:"Which has the smallest bond angle?",
  options:["CH₄ (109.5°)","NH₃ (107°)","H₂O (104.5°)","BF₃ (120°)"],
  correct:2,
  explanation:"H₂O has 2 lone pairs on O, which repel more strongly than bond pairs → smallest bond angle 104.5°."
},
{
  id:"CHE028", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"medium",
  question:"London dispersion forces are caused by:",
  options:["Permanent dipoles","Instantaneous dipoles","Hydrogen bonds","Ionic charges"],
  correct:1,
  explanation:"London forces arise from instantaneous (temporary) dipoles due to electron fluctuations. Present in all molecules."
},
{
  id:"CHE029", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"easy",
  question:"Hydrogen bonding is strongest in:",
  options:["HF","HCl","HBr","HI"],
  correct:0,
  explanation:"HF has the strongest H-bond because F is the most electronegative element, making F-H bond highly polar."
},
{
  id:"CHE030", subject:"Chemistry", topic:"Chemical Bonding", difficulty:"hard",
  question:"Which of these is non-polar despite having polar bonds?",
  options:["H₂O","NH₃","CO₂","HCl"],
  correct:2,
  explanation:"CO₂ is linear (sp hybridized). The two C=O dipoles are equal and opposite, cancel out → net dipole = 0 → non-polar."
},

// ═══════════════════════════════════════════════
// CHEMISTRY — States of Matter / Gas Laws (10 questions)
// ═══════════════════════════════════════════════
{
  id:"CHE031", subject:"Chemistry", topic:"States of Matter", difficulty:"easy",
  question:"Boyle's law states that at constant temperature, pressure of a gas is:",
  options:["Directly proportional to volume","Inversely proportional to volume","Equal to volume","Independent of volume"],
  correct:1,
  explanation:"Boyle's Law: P ∝ 1/V at constant T. PV = constant. Double the pressure → half the volume."
},
{
  id:"CHE032", subject:"Chemistry", topic:"States of Matter", difficulty:"medium",
  question:"A gas occupies 10 L at 2 atm. At 4 atm (same temperature), volume becomes:",
  options:["5 L","20 L","8 L","2.5 L"],
  correct:0,
  explanation:"P₁V₁ = P₂V₂ → 2×10 = 4×V₂ → V₂ = 5 L"
},
{
  id:"CHE033", subject:"Chemistry", topic:"States of Matter", difficulty:"medium",
  question:"Charles' Law states that at constant pressure, volume of gas is proportional to:",
  options:["Pressure","Square of temperature","Absolute temperature","1/temperature"],
  correct:2,
  explanation:"Charles' Law: V ∝ T (in Kelvin) at constant P. Note: must use absolute temperature (Kelvin), not Celsius."
},
{
  id:"CHE034", subject:"Chemistry", topic:"States of Matter", difficulty:"easy",
  question:"Ideal gas equation is:",
  options:["PV = nRT","PV = RT","PV = nR/T","P/V = nRT"],
  correct:0,
  explanation:"PV = nRT where n = moles, R = 8.314 J/mol·K, T in Kelvin. For 1 mole: PV = RT."
},
{
  id:"CHE035", subject:"Chemistry", topic:"States of Matter", difficulty:"medium",
  question:"At STP (0°C, 1 atm), volume of 1 mole of ideal gas is approximately:",
  options:["11.2 L","22.4 L","44.8 L","5.6 L"],
  correct:1,
  explanation:"Molar volume at STP = 22.4 L/mol. This is one of the most important numbers in chemistry!"
},
{
  id:"CHE036", subject:"Chemistry", topic:"States of Matter", difficulty:"hard",
  question:"Kinetic energy of gas molecules is proportional to:",
  options:["T²","√T","T","1/T"],
  correct:2,
  explanation:"KE = (3/2)nRT → KE ∝ T (absolute temperature). Higher temperature = higher kinetic energy."
},
{
  id:"CHE037", subject:"Chemistry", topic:"States of Matter", difficulty:"medium",
  question:"The van der Waals equation for real gases is: (P + a/V²)(V - b) = RT. What does 'b' account for?",
  options:["Intermolecular attractions","Volume of gas molecules","Pressure corrections","Temperature"],
  correct:1,
  explanation:"'b' is the volume correction — it accounts for the actual finite volume occupied by gas molecules themselves (excluded volume)."
},
{
  id:"CHE038", subject:"Chemistry", topic:"States of Matter", difficulty:"medium",
  question:"Graham's law of diffusion states that rate of diffusion ∝:",
  options:["√M","M","1/M","1/√M"],
  correct:3,
  explanation:"Graham's Law: r ∝ 1/√M. Lighter gases diffuse faster. r₁/r₂ = √(M₂/M₁)"
},
{
  id:"CHE039", subject:"Chemistry", topic:"States of Matter", difficulty:"easy",
  question:"Dalton's law of partial pressures states that total pressure =",
  options:["Product of partial pressures","Sum of partial pressures","Average of partial pressures","Difference of partial pressures"],
  correct:1,
  explanation:"Dalton's Law: P_total = P₁ + P₂ + P₃ + ... Each gas exerts pressure independently."
},
{
  id:"CHE040", subject:"Chemistry", topic:"States of Matter", difficulty:"hard",
  question:"At what temperature will rms speed of H₂ molecules equal rms speed of O₂ at 300 K?",
  options:["75 K","18.75 K","1200 K","4800 K"],
  correct:1,
  explanation:"v_rms = √(3RT/M). For equal speeds: T_H₂/M_H₂ = T_O₂/M_O₂ → T_H₂/2 = 300/32 → T_H₂ = 18.75 K"
},

// ═══════════════════════════════════════════════
// CHEMISTRY — Chemical Equilibrium (10 questions)
// ═══════════════════════════════════════════════
{
  id:"CHE041", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"easy",
  question:"At equilibrium, the rate of forward reaction equals:",
  options:["Zero","Rate of reverse reaction","Rate of forward reaction × 2","Concentration of reactants"],
  correct:1,
  explanation:"At equilibrium, forward rate = reverse rate. Concentrations remain constant (not necessarily equal)."
},
{
  id:"CHE042", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"medium",
  question:"For N₂ + 3H₂ ⇌ 2NH₃, Kc expression is:",
  options:["[NH₃]²/([N₂][H₂]³)","[N₂][H₂]³/[NH₃]²","[NH₃]/([N₂][H₂])","[NH₃]²"],
  correct:0,
  explanation:"Kc = [products]/[reactants] with coefficients as powers = [NH₃]²/([N₂][H₂]³)"
},
{
  id:"CHE043", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"medium",
  question:"Increasing temperature for an exothermic reaction will:",
  options:["Increase Kc","Decrease Kc","Not change Kc","Make Kc = 1"],
  correct:1,
  explanation:"Le Chatelier's: For exothermic rxn, heat is a product. Adding heat (increasing T) shifts equilibrium LEFT → Kc decreases."
},
{
  id:"CHE044", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"easy",
  question:"pH of a neutral solution at 25°C is:",
  options:["7","0","14","1"],
  correct:0,
  explanation:"At 25°C, neutral solution: [H⁺] = [OH⁻] = 10⁻⁷ M. pH = -log[H⁺] = -log(10⁻⁷) = 7"
},
{
  id:"CHE045", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"medium",
  question:"A solution has [H⁺] = 10⁻⁴ M. Its pH is:",
  options:["4","10","-4","0.0001"],
  correct:0,
  explanation:"pH = -log[H⁺] = -log(10⁻⁴) = 4. This is an acidic solution (pH < 7)."
},
{
  id:"CHE046", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"hard",
  question:"Degree of dissociation of a weak acid HA in 0.1 M solution is 10%. Kₐ equals:",
  options:["10⁻³","10⁻⁴","10⁻²","10⁻¹"],
  correct:0,
  explanation:"α = 0.1, C = 0.1 M. [H⁺] = [A⁻] = Cα = 0.01 M, [HA] = C(1-α) = 0.09 M. Kₐ = (0.01)²/0.09 ≈ 10⁻³"
},
{
  id:"CHE047", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"medium",
  question:"Adding a catalyst to a reaction at equilibrium:",
  options:["Shifts equilibrium to right","Shifts equilibrium to left","Increases Kc","Doesn't change Kc but reaches equilibrium faster"],
  correct:3,
  explanation:"A catalyst increases rate of BOTH forward and reverse reactions equally. Kc doesn't change. Equilibrium is reached faster."
},
{
  id:"CHE048", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"medium",
  question:"Kp and Kc are related by: Kp = Kc(RT)^Δn. For N₂ + 3H₂ ⇌ 2NH₃, Δn equals:",
  options:["2","-2","1","-1"],
  correct:1,
  explanation:"Δn = moles of gaseous products - moles of gaseous reactants = 2 - (1+3) = 2 - 4 = -2"
},
{
  id:"CHE049", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"easy",
  question:"Buffer solution resists change in:",
  options:["Temperature","Volume","pH","Concentration"],
  correct:2,
  explanation:"A buffer solution resists significant changes in pH when small amounts of acid or base are added to it."
},
{
  id:"CHE050", subject:"Chemistry", topic:"Chemical Equilibrium", difficulty:"hard",
  question:"Solubility product of BaSO₄ is 1.1×10⁻¹⁰. Solubility in mol/L:",
  options:["1.05×10⁻⁵","1.1×10⁻¹⁰","5.5×10⁻⁶","1.1×10⁻⁵"],
  correct:0,
  explanation:"BaSO₄ ⇌ Ba²⁺ + SO₄²⁻. Ksp = s² = 1.1×10⁻¹⁰. s = √(1.1×10⁻¹⁰) ≈ 1.05×10⁻⁵ mol/L"
},

// ═══════════════════════════════════════════════
// CHEMISTRY — Organic Chemistry (10 questions)
// ═══════════════════════════════════════════════
{
  id:"CHE051", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"easy",
  question:"IUPAC name of CH₃-CH₂-OH is:",
  options:["Methanol","Ethanol","Propanol","Butanol"],
  correct:1,
  explanation:"CH₃-CH₂-OH has 2 carbons + OH group. Parent chain: ethane → ethanol."
},
{
  id:"CHE052", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"medium",
  question:"Which is not an example of structural isomerism?",
  options:["Chain isomers","Position isomers","Geometric isomers","Functional group isomers"],
  correct:2,
  explanation:"Geometric (cis-trans) isomerism is a type of stereoisomerism, not structural isomerism. The other three are types of structural isomers."
},
{
  id:"CHE053", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"medium",
  question:"Markovnikov's rule states that in addition of HX to alkene, H goes to carbon with:",
  options:["More H atoms","More substituents","Equal H atoms","The halogen"],
  correct:0,
  explanation:"Markovnikov's Rule: H⁺ adds to carbon already having more hydrogens (more substituted carbon gets the halide). This gives the major product."
},
{
  id:"CHE054", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"easy",
  question:"General formula for alkanes is:",
  options:["CₙH₂ₙ","CₙH₂ₙ₊₂","CₙH₂ₙ₋₂","CₙHₙ"],
  correct:1,
  explanation:"Alkanes (saturated hydrocarbons): CₙH₂ₙ₊₂. Alkenes: CₙH₂ₙ. Alkynes: CₙH₂ₙ₋₂."
},
{
  id:"CHE055", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"medium",
  question:"The reaction of alkene with Br₂/CCl₄ is:",
  options:["Substitution","Elimination","Addition","Oxidation"],
  correct:2,
  explanation:"Alkenes undergo addition reactions. Br₂ adds across the C=C double bond: R-CH=CH-R + Br₂ → R-CHBr-CHBr-R"
},
{
  id:"CHE056", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"hard",
  question:"Benzene undergoes predominantly:",
  options:["Addition reactions","Substitution reactions","Elimination","Oxidation at ring"],
  correct:1,
  explanation:"Benzene has aromatic stability (delocalized π electrons). It prefers electrophilic SUBSTITUTION (not addition) to preserve aromaticity."
},
{
  id:"CHE057", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"medium",
  question:"Functional group present in carboxylic acids:",
  options:["–OH","–CHO","–COOH","–CO–"],
  correct:2,
  explanation:"–COOH (carboxyl group) is characteristic of carboxylic acids. –OH = alcohol, –CHO = aldehyde, –CO– = ketone."
},
{
  id:"CHE058", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"easy",
  question:"Number of isomers of C₄H₁₀ (butane) is:",
  options:["1","2","3","4"],
  correct:1,
  explanation:"C₄H₁₀ has 2 isomers: n-butane (straight chain) and isobutane (2-methylpropane, branched)."
},
{
  id:"CHE059", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"medium",
  question:"Ethanol undergoes dehydration in presence of H₂SO₄ at 170°C to give:",
  options:["Diethyl ether","Ethylene (ethene)","Acetaldehyde","Acetic acid"],
  correct:1,
  explanation:"At 170°C: CH₃CH₂OH → CH₂=CH₂ + H₂O (elimination, dehydration → alkene). At 140°C: 2C₂H₅OH → C₂H₅-O-C₂H₅ (ether)."
},
{
  id:"CHE060", subject:"Chemistry", topic:"Organic Chemistry", difficulty:"hard",
  question:"In the reaction CH₄ + Cl₂ → CH₃Cl + HCl (in presence of light), the mechanism is:",
  options:["Electrophilic addition","Nucleophilic substitution","Free radical substitution","Ionic addition"],
  correct:2,
  explanation:"Chlorination of methane occurs via free radical mechanism (initiated by UV light). Steps: initiation, propagation, termination."
},

// ═══════════════════════════════════════════════
// MATHEMATICS — Sets & Relations (8 questions)
// ═══════════════════════════════════════════════
{
  id:"MAT001", subject:"Math", topic:"Sets", difficulty:"easy",
  question:"If n(A) = 5, n(B) = 3, n(A∩B) = 2, then n(A∪B) =",
  options:["6","8","10","5"],
  correct:0,
  explanation:"n(A∪B) = n(A) + n(B) - n(A∩B) = 5 + 3 - 2 = 6"
},
{
  id:"MAT002", subject:"Math", topic:"Sets", difficulty:"medium",
  question:"In a class of 40 students, 25 like Math, 20 like Science, and 15 like both. How many like neither?",
  options:["10","20","30","5"],
  correct:0,
  explanation:"n(M∪S) = 25 + 20 - 15 = 30. Neither = 40 - 30 = 10"
},
{
  id:"MAT003", subject:"Math", topic:"Sets", difficulty:"easy",
  question:"Power set of A = {1, 2} has how many elements?",
  options:["2","4","8","3"],
  correct:1,
  explanation:"Power set P(A) contains all subsets including ∅ and A itself. If |A| = n, |P(A)| = 2ⁿ = 2² = 4. P(A) = {∅, {1}, {2}, {1,2}}"
},
{
  id:"MAT004", subject:"Math", topic:"Sets", difficulty:"medium",
  question:"(A ∪ B)' = A' ∩ B' is:",
  options:["Always false","De Morgan's first law","Only sometimes true","Distributive law"],
  correct:1,
  explanation:"De Morgan's First Law: (A∪B)' = A'∩B'. Second: (A∩B)' = A'∪B'. These are fundamental set theory laws."
},
{
  id:"MAT005", subject:"Math", topic:"Sets", difficulty:"easy",
  question:"A ∩ A' equals:",
  options:["A","Universal set U","Empty set ∅","A'"],
  correct:2,
  explanation:"A and A' are disjoint (have no common elements). A ∩ A' = ∅ (empty set)"
},
{
  id:"MAT006", subject:"Math", topic:"Relations", difficulty:"medium",
  question:"A relation R on set A = {1,2,3} defined by R = {(a,b): a < b}. R is:",
  options:["Reflexive","Symmetric","Transitive","Equivalence"],
  correct:2,
  explanation:"R is NOT reflexive (a≮a). NOT symmetric (if a<b then b≮a). IS transitive (if a<b and b<c then a<c)."
},
{
  id:"MAT007", subject:"Math", topic:"Relations", difficulty:"medium",
  question:"An equivalence relation must be:",
  options:["Reflexive only","Symmetric only","Reflexive, symmetric and transitive","Transitive only"],
  correct:2,
  explanation:"Equivalence relation = Reflexive + Symmetric + Transitive (all three together)."
},
{
  id:"MAT008", subject:"Math", topic:"Relations", difficulty:"hard",
  question:"Number of relations from set A with m elements to set B with n elements is:",
  options:["mn","m+n","2^(mn)","m^n"],
  correct:2,
  explanation:"A×B has mn elements. Any subset of A×B is a relation. Number of subsets = 2^(mn)."
},

// ═══════════════════════════════════════════════
// MATHEMATICS — Trigonometry (15 questions)
// ═══════════════════════════════════════════════
{
  id:"MAT009", subject:"Math", topic:"Trigonometry", difficulty:"easy",
  question:"sin²θ + cos²θ =",
  options:["0","1","2 sinθcosθ","tan²θ + 1"],
  correct:1,
  explanation:"sin²θ + cos²θ = 1 is the fundamental Pythagorean identity. Always true for any angle θ."
},
{
  id:"MAT010", subject:"Math", topic:"Trigonometry", difficulty:"easy",
  question:"Value of sin 30° is:",
  options:["√3/2","1/√2","1/2","1"],
  correct:2,
  explanation:"sin 30° = 1/2. Remember: sin30=1/2, sin45=1/√2, sin60=√3/2, sin90=1"
},
{
  id:"MAT011", subject:"Math", topic:"Trigonometry", difficulty:"easy",
  question:"tan 45° equals:",
  options:["0","1/√3","√3","1"],
  correct:3,
  explanation:"tan 45° = sin45°/cos45° = (1/√2)/(1/√2) = 1"
},
{
  id:"MAT012", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"sin(A + B) = ?",
  options:["sinA cosB + cosA sinB","sinA cosB - cosA sinB","cosA cosB + sinA sinB","sinA + sinB"],
  correct:0,
  explanation:"sin(A+B) = sinA cosB + cosA sinB. Important formula — must be memorized for JEE."
},
{
  id:"MAT013", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"cos 2θ in terms of sin θ:",
  options:["1 - 2sin²θ","2sin²θ - 1","sin²θ - cos²θ","2sinθcosθ"],
  correct:0,
  explanation:"cos2θ = cos²θ - sin²θ = (1-sin²θ) - sin²θ = 1 - 2sin²θ (one of three forms)"
},
{
  id:"MAT014", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"sin 2θ = ?",
  options:["sin²θ - cos²θ","2sinθcosθ","cos²θ - sin²θ","1 - 2sin²θ"],
  correct:1,
  explanation:"sin2θ = 2sinθcosθ. This is the double angle formula for sine."
},
{
  id:"MAT015", subject:"Math", topic:"Trigonometry", difficulty:"hard",
  question:"General solution of sin θ = 0 is:",
  options:["θ = 0","θ = nπ, n ∈ Z","θ = nπ/2, n ∈ Z","θ = 2nπ, n ∈ Z"],
  correct:1,
  explanation:"sin θ = 0 when θ = 0, ±π, ±2π, ... = nπ where n is any integer."
},
{
  id:"MAT016", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"The value of sin(90° + θ) is:",
  options:["sinθ","cosθ","-sinθ","-cosθ"],
  correct:1,
  explanation:"sin(90° + θ) = cosθ. Allied angles: when 90° is added, sin ↔ cos with appropriate sign."
},
{
  id:"MAT017", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"In a triangle ABC, by sine rule: a/sinA = ?",
  options:["b/sinB","a/sinC","2R","b/sinC"],
  correct:0,
  explanation:"Sine rule: a/sinA = b/sinB = c/sinC = 2R where R is circumradius. All three ratios are equal."
},
{
  id:"MAT018", subject:"Math", topic:"Trigonometry", difficulty:"hard",
  question:"cos²θ - sin²θ equals:",
  options:["1","0","cos2θ","sin2θ"],
  correct:2,
  explanation:"cos²θ - sin²θ = cos2θ. One of the standard forms of the double angle formula for cosine."
},
{
  id:"MAT019", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"tan(A - B) = ?",
  options:["(tanA + tanB)/(1 - tanA tanB)","(tanA - tanB)/(1 + tanA tanB)","tanA - tanB","(tanA - tanB)/(1 - tanA tanB)"],
  correct:1,
  explanation:"tan(A-B) = (tanA - tanB)/(1 + tanA·tanB). Note: tan(A+B) = (tanA + tanB)/(1 - tanA·tanB)"
},
{
  id:"MAT020", subject:"Math", topic:"Trigonometry", difficulty:"easy",
  question:"sec²θ - tan²θ =",
  options:["0","2","1","sin²θ"],
  correct:2,
  explanation:"sec²θ - tan²θ = 1. Derived from sin²θ + cos²θ = 1 by dividing by cos²θ."
},
{
  id:"MAT021", subject:"Math", topic:"Trigonometry", difficulty:"hard",
  question:"Height of a tower if angle of elevation from a point 20 m away is 60°:",
  options:["20/√3 m","20√3 m","10√3 m","40√3 m"],
  correct:1,
  explanation:"tan60° = height/base → √3 = h/20 → h = 20√3 m ≈ 34.64 m"
},
{
  id:"MAT022", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"sin(-θ) = ?",
  options:["sinθ","-sinθ","cosθ","-cosθ"],
  correct:1,
  explanation:"sin is an odd function: sin(-θ) = -sinθ. cos is even: cos(-θ) = cosθ."
},
{
  id:"MAT023", subject:"Math", topic:"Trigonometry", difficulty:"medium",
  question:"Range of sin θ is:",
  options:["[0, 1]","[-1, 0]","[-1, 1]","(−∞, ∞)"],
  correct:2,
  explanation:"sin θ oscillates between -1 and 1 for all real θ. Range = [-1, 1]."
},

// ═══════════════════════════════════════════════
// MATHEMATICS — Quadratic Equations (12 questions)
// ═══════════════════════════════════════════════
{
  id:"MAT024", subject:"Math", topic:"Quadratic Equations", difficulty:"easy",
  question:"For ax² + bx + c = 0, sum of roots α + β =",
  options:["b/a","-b/a","c/a","-c/a"],
  correct:1,
  explanation:"Sum of roots = -b/a. Product of roots = c/a. (Vieta's formulas)"
},
{
  id:"MAT025", subject:"Math", topic:"Quadratic Equations", difficulty:"easy",
  question:"Product of roots of 2x² - 7x + 3 = 0 is:",
  options:["7/2","3/2","7","-7/2"],
  correct:1,
  explanation:"Product = c/a = 3/2"
},
{
  id:"MAT026", subject:"Math", topic:"Quadratic Equations", difficulty:"medium",
  question:"Discriminant of x² - 5x + 6 = 0:",
  options:["1","25","−1","49"],
  correct:0,
  explanation:"D = b² - 4ac = 25 - 24 = 1. Since D > 0, roots are real and distinct."
},
{
  id:"MAT027", subject:"Math", topic:"Quadratic Equations", difficulty:"medium",
  question:"Roots of x² - 5x + 6 = 0 are:",
  options:["2, 3","1, 6","−2, −3","5, 6"],
  correct:0,
  explanation:"x² - 5x + 6 = (x-2)(x-3) = 0. Roots: x = 2 and x = 3. Check: sum=5=5/1 ✓, product=6=6/1 ✓"
},
{
  id:"MAT028", subject:"Math", topic:"Quadratic Equations", difficulty:"medium",
  question:"If roots of x² - px + q = 0 are α and β, then α² + β² =",
  options:["p² - 2q","p² + 2q","p² - q","(p-q)²"],
  correct:0,
  explanation:"α² + β² = (α+β)² - 2αβ = p² - 2q"
},
{
  id:"MAT029", subject:"Math", topic:"Quadratic Equations", difficulty:"hard",
  question:"For the quadratic x² - 3x + k = 0 to have equal roots, k =",
  options:["9","9/4","3/2","4/9"],
  correct:1,
  explanation:"Equal roots → D = 0: b² - 4ac = 0 → 9 - 4k = 0 → k = 9/4"
},
{
  id:"MAT030", subject:"Math", topic:"Quadratic Equations", difficulty:"medium",
  question:"The equation x² + 1 = 0 has:",
  options:["Real roots","No real roots (complex)","Only one root","Infinite roots"],
  correct:1,
  explanation:"D = 0 - 4(1)(1) = -4 < 0. Negative discriminant → no real roots (complex roots: x = ±i)"
},
{
  id:"MAT031", subject:"Math", topic:"Quadratic Equations", difficulty:"easy",
  question:"The vertex of parabola y = x² - 4x + 5 is at:",
  options:["(4, 5)","(2, 1)","(-2, 1)","(0, 5)"],
  correct:1,
  explanation:"Vertex x = -b/(2a) = 4/2 = 2. y = 4 - 8 + 5 = 1. Vertex = (2, 1)."
},
{
  id:"MAT032", subject:"Math", topic:"Quadratic Equations", difficulty:"hard",
  question:"If one root of x² - 5x + k = 0 is twice the other, k =",
  options:["50/9","25/9","25/3","50/3"],
  correct:0,
  explanation:"Let roots be α, 2α. Sum: 3α = 5 → α = 5/3. Product: 2α² = k = 2×25/9 = 50/9"
},
{
  id:"MAT033", subject:"Math", topic:"Quadratic Equations", difficulty:"medium",
  question:"The quadratic equation with roots 3 and -2 is:",
  options:["x² - x - 6 = 0","x² + x - 6 = 0","x² - x + 6 = 0","x² + 5x + 6 = 0"],
  correct:0,
  explanation:"Sum = 3+(-2) = 1, Product = 3×(-2) = -6. Equation: x² - (sum)x + product = 0 → x² - x - 6 = 0"
},
{
  id:"MAT034", subject:"Math", topic:"Quadratic Equations", difficulty:"medium",
  question:"The maximum value of -x² + 4x - 3 is:",
  options:["1","3","4","-3"],
  correct:0,
  explanation:"f(x) = -(x² - 4x + 3) = -(x-2)² + 1. Maximum at x=2, max value = 1."
},
{
  id:"MAT035", subject:"Math", topic:"Quadratic Equations", difficulty:"hard",
  question:"If α, β are roots of x² - 3x + 1 = 0, then α³ + β³ =",
  options:["18","27","9","36"],
  correct:0,
  explanation:"α+β=3, αβ=1. α³+β³ = (α+β)³ - 3αβ(α+β) = 27 - 3×1×3 = 27 - 9 = 18"
},

// ═══════════════════════════════════════════════
// MATHEMATICS — Sequences & Series (10 questions)
// ═══════════════════════════════════════════════
{
  id:"MAT036", subject:"Math", topic:"Sequences & Series", difficulty:"easy",
  question:"nth term of AP: 2, 5, 8, 11, ... is:",
  options:["3n - 1","3n + 1","2n + 1","n + 2"],
  correct:0,
  explanation:"First term a=2, common difference d=3. aₙ = a + (n-1)d = 2 + 3(n-1) = 3n - 1"
},
{
  id:"MAT037", subject:"Math", topic:"Sequences & Series", difficulty:"medium",
  question:"Sum of first 10 natural numbers:",
  options:["50","55","100","45"],
  correct:1,
  explanation:"S = n(n+1)/2 = 10×11/2 = 55. Formula: Sₙ = n(a₁+aₙ)/2 = 10(1+10)/2 = 55"
},
{
  id:"MAT038", subject:"Math", topic:"Sequences & Series", difficulty:"medium",
  question:"If a, b, c are in GP, then b² =",
  options:["a + c","ac","a + c/2","a² + c²"],
  correct:1,
  explanation:"In GP, b/a = c/b → b² = ac. The middle term squared equals product of outer terms."
},
{
  id:"MAT039", subject:"Math", topic:"Sequences & Series", difficulty:"medium",
  question:"Sum of GP: 1 + 2 + 4 + 8 + ... (10 terms):",
  options:["1023","1024","512","2046"],
  correct:0,
  explanation:"S = a(rⁿ - 1)/(r-1) = 1×(2¹⁰ - 1)/(2-1) = 1024 - 1 = 1023"
},
{
  id:"MAT040", subject:"Math", topic:"Sequences & Series", difficulty:"easy",
  question:"Arithmetic mean of 3 and 7 is:",
  options:["10","5","21","4"],
  correct:1,
  explanation:"AM = (a+b)/2 = (3+7)/2 = 5. For GM: √(3×7) = √21 ≈ 4.58."
},
{
  id:"MAT041", subject:"Math", topic:"Sequences & Series", difficulty:"hard",
  question:"Sum of infinite GP: 1 - 1/2 + 1/4 - 1/8 + ...",
  options:["2/3","1/2","3/4","4/3"],
  correct:0,
  explanation:"a = 1, r = -1/2. S∞ = a/(1-r) = 1/(1-(-1/2)) = 1/(3/2) = 2/3"
},
{
  id:"MAT042", subject:"Math", topic:"Sequences & Series", difficulty:"medium",
  question:"If sum of AP is Sₙ = 3n² + 2n, then the common difference d is:",
  options:["3","5","6","2"],
  correct:2,
  explanation:"aₙ = Sₙ - Sₙ₋₁ = [3n²+2n] - [3(n-1)²+2(n-1)] = 6n - 1. d = a₂ - a₁ = 11 - 5 = 6"
},
{
  id:"MAT043", subject:"Math", topic:"Sequences & Series", difficulty:"medium",
  question:"Three numbers in AP have sum 15 and product 105. The numbers are:",
  options:["3, 5, 7","1, 5, 9","2, 5, 8","3, 4, 8"],
  correct:0,
  explanation:"Let a-d, a, a+d. Sum: 3a = 15 → a = 5. Product: (5-d)(5)(5+d) = 105 → 25-d²=21 → d=2. Numbers: 3,5,7"
},
{
  id:"MAT044", subject:"Math", topic:"Sequences & Series", difficulty:"medium",
  question:"Geometric mean of 4 and 16 is:",
  options:["10","8","6","12"],
  correct:1,
  explanation:"GM = √(4×16) = √64 = 8. Note: AM = (4+16)/2 = 10. AM ≥ GM → 10 ≥ 8 ✓"
},
{
  id:"MAT045", subject:"Math", topic:"Sequences & Series", difficulty:"hard",
  question:"Sum of 1² + 2² + 3² + ... + n² =",
  options:["n(n+1)/2","n(n+1)(n+2)/3","n(n+1)(2n+1)/6","n²(n+1)²/4"],
  correct:2,
  explanation:"Sum of squares = n(n+1)(2n+1)/6. For n=3: 3×4×7/6 = 14 = 1+4+9 ✓"
},

// ═══════════════════════════════════════════════
// MATHEMATICS — Coordinate Geometry (12 questions)
// ═══════════════════════════════════════════════
{
  id:"MAT046", subject:"Math", topic:"Coordinate Geometry", difficulty:"easy",
  question:"Distance between points (3, 4) and (0, 0):",
  options:["3","4","5","7"],
  correct:2,
  explanation:"d = √((3-0)² + (4-0)²) = √(9+16) = √25 = 5"
},
{
  id:"MAT047", subject:"Math", topic:"Coordinate Geometry", difficulty:"easy",
  question:"Slope of line passing through (2, 3) and (4, 7):",
  options:["1","2","3","1/2"],
  correct:1,
  explanation:"m = (y₂-y₁)/(x₂-x₁) = (7-3)/(4-2) = 4/2 = 2"
},
{
  id:"MAT048", subject:"Math", topic:"Coordinate Geometry", difficulty:"medium",
  question:"Equation of line with slope 2 and y-intercept 3:",
  options:["y = 2x + 3","y = 3x + 2","2x - y + 3 = 0","y = 2x - 3"],
  correct:0,
  explanation:"Slope-intercept form: y = mx + c = 2x + 3"
},
{
  id:"MAT049", subject:"Math", topic:"Coordinate Geometry", difficulty:"medium",
  question:"Midpoint of segment joining (2, 4) and (6, 8):",
  options:["(4, 6)","(3, 5)","(8, 12)","(2, 2)"],
  correct:0,
  explanation:"Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = (8/2, 12/2) = (4, 6)"
},
{
  id:"MAT050", subject:"Math", topic:"Coordinate Geometry", difficulty:"medium",
  question:"Two lines are perpendicular if their slopes m₁ and m₂ satisfy:",
  options:["m₁ = m₂","m₁ + m₂ = 0","m₁ × m₂ = -1","m₁ × m₂ = 1"],
  correct:2,
  explanation:"Perpendicular lines: m₁ × m₂ = -1. Parallel lines: m₁ = m₂."
},
{
  id:"MAT051", subject:"Math", topic:"Coordinate Geometry", difficulty:"medium",
  question:"The equation x² + y² = 25 represents a circle with radius:",
  options:["5","25","√5","10"],
  correct:0,
  explanation:"Standard circle: x² + y² = r². Here r² = 25, so r = 5. Centre at origin (0,0)."
},
{
  id:"MAT052", subject:"Math", topic:"Coordinate Geometry", difficulty:"hard",
  question:"Distance from point (2, 3) to line 3x - 4y + 1 = 0:",
  options:["1","2","3","5"],
  correct:0,
  explanation:"d = |3(2) - 4(3) + 1|/√(9+16) = |6-12+1|/5 = |-5|/5 = 5/5 = 1"
},
{
  id:"MAT053", subject:"Math", topic:"Coordinate Geometry", difficulty:"medium",
  question:"Slope of x-axis is:",
  options:["0","1","Undefined","∞"],
  correct:0,
  explanation:"x-axis is horizontal → slope = 0. y-axis is vertical → slope is undefined (infinity)."
},
{
  id:"MAT054", subject:"Math", topic:"Coordinate Geometry", difficulty:"hard",
  question:"Area of triangle with vertices (0,0), (3,0), (0,4):",
  options:["6","12","7","3.5"],
  correct:0,
  explanation:"Area = ½|x₁(y₂-y₃)+x₂(y₃-y₁)+x₃(y₁-y₂)| = ½|0+3(4)+0| = ½×12 = 6"
},
{
  id:"MAT055", subject:"Math", topic:"Coordinate Geometry", difficulty:"medium",
  question:"The focus of parabola y² = 4ax is at:",
  options:["(a, 0)","(0, a)","(-a, 0)","(2a, 0)"],
  correct:0,
  explanation:"Standard parabola y² = 4ax: vertex at origin, axis along x-axis, focus at (a, 0), directrix x = -a."
},
{
  id:"MAT056", subject:"Math", topic:"Coordinate Geometry", difficulty:"medium",
  question:"Section formula: Point dividing (x₁,y₁) and (x₂,y₂) in ratio m:n internally gives x-coordinate:",
  options:["(mx₂ + nx₁)/(m+n)","(mx₁ + nx₂)/(m+n)","(mx₂ - nx₁)/(m-n)","(x₁+x₂)/2"],
  correct:0,
  explanation:"Section formula (internal): x = (mx₂ + nx₁)/(m+n), y = (my₂ + ny₁)/(m+n)"
},
{
  id:"MAT057", subject:"Math", topic:"Coordinate Geometry", difficulty:"hard",
  question:"Length of tangent from external point (5, 12) to circle x² + y² = 25:",
  options:["12","13","144","√144 = 12"],
  correct:3,
  explanation:"Length = √(x₁² + y₁² - r²) = √(25 + 144 - 25) = √144 = 12"
},

// ═══════════════════════════════════════════════
// MATHEMATICS — Limits & Derivatives (10 questions)
// ═══════════════════════════════════════════════
{
  id:"MAT058", subject:"Math", topic:"Limits", difficulty:"easy",
  question:"lim(x→0) sinx/x =",
  options:["0","1","∞","undefined"],
  correct:1,
  explanation:"Standard limit: lim(x→0) sinx/x = 1. One of the most important limits in calculus."
},
{
  id:"MAT059", subject:"Math", topic:"Limits", difficulty:"medium",
  question:"lim(x→2) (x² - 4)/(x - 2) =",
  options:["0","2","4","undefined at 2"],
  correct:2,
  explanation:"Factor: (x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2. lim(x→2) = 2+2 = 4"
},
{
  id:"MAT060", subject:"Math", topic:"Limits", difficulty:"medium",
  question:"lim(x→0) (1 - cosx)/x² =",
  options:["0","1","1/2","∞"],
  correct:2,
  explanation:"Using L'Hôpital or expansion: 1-cosx ≈ x²/2 near x=0. So limit = (x²/2)/x² = 1/2"
},
{
  id:"MAT061", subject:"Math", topic:"Derivatives", difficulty:"easy",
  question:"d/dx(xⁿ) =",
  options:["xⁿ⁻¹","nxⁿ⁻¹","xⁿ/n","nxⁿ"],
  correct:1,
  explanation:"Power rule: d/dx(xⁿ) = nxⁿ⁻¹. E.g., d/dx(x³) = 3x²"
},
{
  id:"MAT062", subject:"Math", topic:"Derivatives", difficulty:"easy",
  question:"d/dx(sinx) =",
  options:["cosx","-cosx","sinx","-sinx"],
  correct:0,
  explanation:"d/dx(sinx) = cosx. d/dx(cosx) = -sinx. These must be memorized."
},
{
  id:"MAT063", subject:"Math", topic:"Derivatives", difficulty:"medium",
  question:"d/dx(x² + 3x + 5) =",
  options:["2x + 3","x² + 3","2x² + 3","x + 3"],
  correct:0,
  explanation:"d/dx(x²) = 2x, d/dx(3x) = 3, d/dx(5) = 0. Sum = 2x + 3"
},
{
  id:"MAT064", subject:"Math", topic:"Derivatives", difficulty:"medium",
  question:"Using chain rule, d/dx(sin(x²)) =",
  options:["cos(x²)","2x cos(x²)","-cos(x²)","x cos(x²)"],
  correct:1,
  explanation:"Chain rule: d/dx[f(g(x))] = f'(g(x))×g'(x). d/dx[sin(x²)] = cos(x²) × 2x = 2x cos(x²)"
},
{
  id:"MAT065", subject:"Math", topic:"Derivatives", difficulty:"medium",
  question:"For f(x) = x³ - 3x, f'(x) = 0 gives:",
  options:["x = 0 only","x = ±1","x = ±√3","x = ±3"],
  correct:1,
  explanation:"f'(x) = 3x² - 3 = 0 → x² = 1 → x = ±1. These are critical points (local max/min)."
},
{
  id:"MAT066", subject:"Math", topic:"Derivatives", difficulty:"hard",
  question:"Product rule: d/dx(uv) =",
  options:["u'v'","u'v + uv'","u'v - uv'","uv' - u'v"],
  correct:1,
  explanation:"Product rule: d/dx(uv) = u'v + uv'. Remember: differentiate first × keep second + keep first × differentiate second."
},
{
  id:"MAT067", subject:"Math", topic:"Derivatives", difficulty:"hard",
  question:"d/dx(eˣ) =",
  options:["eˣ/x","xeˣ⁻¹","eˣ","e"],
  correct:2,
  explanation:"The exponential function eˣ is its own derivative: d/dx(eˣ) = eˣ. This is the unique property of e."
}

];

// Verify count
console.log(`AKJEE Quiz Bank loaded: ${quizBank.length} questions`);

// Export
if (typeof module !== 'undefined') module.exports = quizBank;
