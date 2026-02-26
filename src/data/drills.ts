import type { Drill, Exercise } from "@/types";

// ============================================
// GOLF DRILLS - Organized by the "Big Three"
// ============================================

export const golfDrills: Drill[] = [
  // FACE CONTACT (Strike Quality)
  {
    id: "g1",
    category: "Face Contact",
    name: "Differential Practice (Toe/Heel)",
    description:
      "Spend 5 mins trying to hit the toe, 5 mins trying to hit the heel, 5 mins center. Develops awareness.",
    source: "Sweet Spot Podcast",
    url: "https://www.youtube.com/watch?v=H8-HTgBAlsE",
  },
  {
    id: "g2",
    category: "Face Contact",
    name: "Foot Spray Feedback",
    description:
      "Spray the clubface with foot powder or dry shampoo. Hit shots and check impact location. Aim for consistent center strikes.",
    source: "Dr. Golfsmith",
    url: "https://www.youtube.com/watch?v=bQvBlumKHno",
  },
  {
    id: "g3",
    category: "Face Contact",
    name: "Tee Height Ladder",
    description:
      "Hit 5 balls each at low, medium, and high tee heights. Focus on maintaining center contact regardless of tee height.",
    source: "Monte Scheinblum",
    url: "https://www.youtube.com/watch?v=T8yRFqqTxFQ",
  },
  {
    id: "g4",
    category: "Face Contact",
    name: "One-Handed Swings",
    description:
      "Hit shots with lead hand only, then trail hand only. Builds awareness of how each hand controls the clubface.",
    source: "Golf Science Lab",
    url: "https://www.youtube.com/watch?v=ScAQrEe1mOI",
  },
  {
    id: "g5",
    category: "Face Contact",
    name: "Half-Swing Focus",
    description:
      "Take 50% swings with a 7-iron, focusing purely on sweet spot contact. Quality over speed.",
    source: "John Sherman",
    url: "https://www.youtube.com/watch?v=YrllusNNmQw",
  },
  {
    id: "g6",
    category: "Face Contact",
    name: "Eyes Closed Drill",
    description:
      "Hit balls with eyes closed after setup. Develops feel for the clubhead and improves kinesthetic awareness.",
    source: "Butch Harmon",
    url: "https://www.youtube.com/watch?v=dokN1BMgcko",
  },

  // GROUND CONTACT (Low Point Control)
  {
    id: "g7",
    category: "Ground Contact",
    name: "The Towel Drill",
    description:
      "Place a towel 2-4 inches behind the ball. Hit the ball without disturbing the towel to ensure ball-first contact.",
    source: "John Sherman",
    url: "https://www.youtube.com/watch?v=ASH06DwHaRw",
  },
  {
    id: "g8",
    category: "Ground Contact",
    name: "Line in the Sand",
    description:
      "Draw a line in a bunker or use a chalk line. Place ball on the line and ensure divot starts at or after the line.",
    source: "Dave Pelz",
    url: "https://www.youtube.com/watch?v=wvRC8bpc3k8",
  },
  {
    id: "g9",
    category: "Ground Contact",
    name: "Coin Behind Ball",
    description:
      "Place a coin 2 inches behind the ball. Goal is to strike the ball without hitting the coin.",
    source: "Sweet Spot Podcast",
    url: "https://www.youtube.com/watch?v=SeyNF6Ttmp4",
  },
  {
    id: "g10",
    category: "Ground Contact",
    name: "Board Drill",
    description:
      "Place a thin board 3 inches behind the ball. Forces you to hit down and forward, not behind the ball.",
    source: "Mike Malaska",
    url: "https://www.youtube.com/watch?v=inQ96eTZ5LA",
  },
  {
    id: "g11",
    category: "Ground Contact",
    name: "Uphill Lie Practice",
    description:
      "Find an uphill lie and hit 20 shots. Exaggerates the feel of hitting down on the ball.",
    source: "Stan Utley",
    url: "https://www.youtube.com/watch?v=Si-h4AkydgA",
  },
  {
    id: "g12",
    category: "Ground Contact",
    name: "Tee in Front Drill",
    description:
      "Place a tee 4 inches in front of the ball. Try to clip the tee after striking the ball. Promotes forward shaft lean.",
    source: "Adam Young Golf",
    url: "https://www.youtube.com/watch?v=wgrcvDL1GSM",
  },

  // FACE DIRECTION (Start Line Control)
  {
    id: "g13",
    category: "Face Direction",
    name: "Start Line Gates",
    description:
      "Place two alignment sticks 6 feet in front of you, just wider than the ball. Hit shots through the gate.",
    source: "Sweet Spot Podcast",
    url: "https://www.youtube.com/watch?v=XsjZ4oHos6U",
  },
  {
    id: "g14",
    category: "Face Direction",
    name: "9-Shot Grid",
    description:
      "Hit 3 fades, 3 draws, 3 straight shots. Develops face awareness and shot shaping ability.",
    source: "Trackman",
    url: "https://www.youtube.com/watch?v=d_2frKoPMZI",
  },
  {
    id: "g15",
    category: "Face Direction",
    name: "Alignment Stick Path",
    description:
      "Stick in ground 10 yards out on target line. Hit 10 shots starting directly at the stick.",
    source: "George Gankas",
    url: "https://www.youtube.com/watch?v=tjWBhZh98nU",
  },
  {
    id: "g16",
    category: "Face Direction",
    name: "Face Tape Drill",
    description:
      "Put tape on clubface. Check tape angle at impact using slow-motion video. Train square face at impact.",
    source: "Golf Digest",
    url: "https://www.youtube.com/watch?v=2-5QIP0X6kQ",
  },
  {
    id: "g17",
    category: "Face Direction",
    name: "Pool Noodle Gate",
    description:
      "Create a gate with pool noodles 3 feet in front. Wider at first, gradually narrow as you improve.",
    source: "Golf Sidekick",
    url: "https://www.youtube.com/watch?v=FhxvTfp1a1g",
  },
  {
    id: "g18",
    category: "Face Direction",
    name: "Clock Face Targets",
    description:
      "Imagine a clock face around target. Hit to 11, 12, and 1 o'clock positions to train face control.",
    source: "Pia Nilsson",
    url: "https://www.youtube.com/watch?v=B52ebzG2MgQ",
  },

  // PUTTING
  {
    id: "g19",
    category: "Putting",
    name: "The Gate Drill",
    description:
      "Create a gate with tees for the putter head to pass through (face contact) and a gate for the ball to roll through (start line).",
    source: "Tiger Woods / Sherman",
    url: "https://www.youtube.com/watch?v=FhMBAvQCE3g",
  },
  {
    id: "g20",
    category: "Putting",
    name: "Ruler Drill",
    description:
      "Putt balls down a metal ruler from 3 feet. Ball must stay on ruler to go in. Pure start line training.",
    source: "Phil Mickelson",
    url: "https://www.youtube.com/watch?v=FRE0ZzMQQzw",
  },
  {
    id: "g21",
    category: "Putting",
    name: "3-6-9 Ladder",
    description:
      "Make 3 in a row from 3 feet, then 6 feet, then 9 feet. Start over if you miss. Builds pressure.",
    source: "Dave Stockton",
    url: "https://www.youtube.com/watch?v=kPbWbkUXoA4",
  },
  {
    id: "g22",
    category: "Putting",
    name: "Around the World",
    description:
      "Place 8 balls in a circle 4 feet from the hole. Make all 8 consecutively. Start over on miss.",
    source: "Jordan Spieth",
    url: "https://www.youtube.com/watch?v=b-P-m0_Fkak",
  },
  {
    id: "g23",
    category: "Putting",
    name: "Lag Putting Zones",
    description:
      "From 30+ feet, putt to zones (inside 3 feet = great, inside 6 feet = good). Track percentages.",
    source: "Brad Faxon",
    url: "https://www.youtube.com/watch?v=CL_6OOtZ8fM",
  },
  {
    id: "g24",
    category: "Putting",
    name: "Eyes Closed Putting",
    description:
      "Hit 10 putts from 6 feet with eyes closed. Develops feel and removes visual interference.",
    source: "Dr. Bob Rotella",
    url: "https://www.youtube.com/watch?v=ixWYoLof3fg",
  },

  // SHORT GAME
  {
    id: "g25",
    category: "Short Game",
    name: "Landing Zone Practice",
    description:
      "Place a towel as your landing zone. Chip 20 balls trying to land on the towel, varying clubs.",
    source: "Phil Mickelson",
    url: "https://www.youtube.com/watch?v=FrEMrsJlkBw",
  },
  {
    id: "g26",
    category: "Short Game",
    name: "One Club Challenge",
    description:
      "Use only your 56° wedge for 15 minutes. Hit flops, bumps, and standard chips to same target.",
    source: "Seve Ballesteros",
    url: "https://www.youtube.com/watch?v=QaNU1b0Wb5E",
  },
  {
    id: "g27",
    category: "Short Game",
    name: "Bunker Line Drill",
    description:
      "Draw a line in bunker sand. Practice entering sand at consistent spot behind the line.",
    source: "Gary Player",
    url: "https://www.youtube.com/watch?v=3cxejnYXJro",
  },
  {
    id: "g28",
    category: "Short Game",
    name: "Par 18 Game",
    description:
      "Play 9 chip shots around the green. Par is getting up and down. Try to beat par.",
    source: "James Sieckmann",
    url: "https://www.youtube.com/watch?v=LHdNOABsjag",
  },

  // CASTING (Lag & Release)
  {
    id: "g29",
    category: "Casting",
    name: "Swimming Pool Drill",
    description:
      "Imagine swinging in waist-deep water. Focus on getting the butt end of the club into the water before the clubhead. Trains lag retention and prevents early release (casting) in the downswing.",
    source: "TPI",
    url: "https://www.mytpi.com/exercises/swimming_pool_drill",
  },
];

// ============================================
// FITNESS EXERCISES - TPI Based
// ============================================

export const warmupExercises: Exercise[] = [
  {
    id: "w1",
    category: "Warmup",
    name: "Dynamic Hip Circles",
    description:
      "Stand on one leg, make large circles with the other leg. 10 forward, 10 backward each side.",
    duration: "2 min",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=x-5h_QUOem8",
  },
  {
    id: "w2",
    category: "Warmup",
    name: "World's Greatest Stretch",
    description:
      "Lunge forward, place both hands inside lead foot, rotate torso and reach to sky. Alternate sides.",
    duration: "3 min",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=-CiWQ2IvY34",
  },
  {
    id: "w3",
    category: "Warmup",
    name: "Cat-Cow with Rotation",
    description:
      "On all fours, flow through cat-cow, adding thoracic rotation at the top of each movement.",
    duration: "2 min",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=kqXwgUEm2dY",
  },
  {
    id: "w4",
    category: "Warmup",
    name: "Walking Knee Hugs",
    description:
      "Walk forward, pulling each knee to chest and holding briefly. Activates glutes and hips.",
    duration: "2 min",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=DntuzvyLS3o",
  },
  {
    id: "w5",
    category: "Warmup",
    name: "Arm Circles to Trunk Rotation",
    description:
      "Start with arm circles, progress to full trunk rotations mimicking the golf swing.",
    duration: "3 min",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=ERB2E5EXc24",
  },
  {
    id: "w6",
    category: "Warmup",
    name: "Lateral Shuffles with Arm Swings",
    description:
      "Shuffle side to side while swinging arms across body. Warms up hips and shoulders together.",
    duration: "2 min",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=1e4-EIvB3Ek",
  },
];

export const mainExercises: Exercise[] = [
  // HIP MOBILITY & STABILITY
  {
    id: "m1",
    category: "Hip Mobility",
    name: "90/90 Hip Switches",
    description:
      "Sit on floor, legs at 90 degrees. Rotate hips to switch sides without using hands if possible.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=m51AZSXMvEA",
  },
  {
    id: "m2",
    category: "Hip Mobility",
    name: "Deep Squat Hold with Rotation",
    description:
      "Hold deep squat position, rotate torso side to side, reaching one arm to the sky.",
    sets: "3",
    reps: "30 sec hold + 5 rotations each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=hKpehetjeA4",
  },
  {
    id: "m3",
    category: "Hip Mobility",
    name: "Pigeon Pose Progressions",
    description:
      "Start in pigeon pose, add trunk rotation and forward fold variations.",
    sets: "2",
    reps: "60 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=AI5A1PRYX7E",
  },
  {
    id: "m4",
    category: "Hip Mobility",
    name: "Frog Stretch with Rocks",
    description:
      "Wide-knee position on all fours, rock back and forth to open up inner thighs and hips.",
    sets: "3",
    reps: "15 rocks",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=-SJ1pnldEGU",
  },
  {
    id: "m4a",
    category: "Hip Mobility",
    name: "Hip Windshield Wipers",
    description:
      "Lying on back with knees bent, feet wide, drop both knees side to side like windshield wipers. Develops overall hip ROM, especially internal rotation.",
    sets: "3",
    reps: "15 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=Rrw9yEhWUj8",
  },
  {
    id: "m4b",
    category: "Hip Mobility",
    name: "Hip Flexor Stretch with Side Bend",
    description:
      "Half-kneeling position, squeeze back glute, reach same-side arm overhead and bend away. Lengthens hip flexors and improves pelvic posture.",
    sets: "2",
    reps: "45 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=L-GldySh3qE",
  },
  {
    id: "m4c",
    category: "Hip Mobility",
    name: "Internal Hip Rotation Sit Back",
    description:
      "From neutral pelvis, rock back toward heels with one foot angled out. Hold at end range for 5 seconds. Improves trail hip internal rotation.",
    sets: "2",
    reps: "5 each side with 5 sec hold",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=qMcdwEMaznU",
  },
  {
    id: "m4d",
    category: "Hip Mobility",
    name: "Pelvic Rotation with Support",
    description:
      "Hold stick across shoulders for stability, rotate pelvis independently while keeping upper body still. Builds pelvis-torso separation.",
    sets: "3",
    reps: "10 each direction",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=iE7glWxnoGM",
  },
  {
    id: "m4e",
    category: "Hip Mobility",
    name: "Lateral Lunge with Hip Shift",
    description:
      "Stand in wide stance, shift weight into one hip and lunge laterally. Promotes hip mobility and ability to shift center of mass hip to hip.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=6JhXjacD1dI",
  },

  // GLUTE ACTIVATION
  {
    id: "m5",
    category: "Glute Activation",
    name: "Single Leg Glute Bridges",
    description:
      "Lying on back, one leg in air, drive hips up using only the planted glute. Squeeze at top.",
    sets: "3",
    reps: "12 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=CP8FnbRod6Q",
  },
  {
    id: "m6",
    category: "Glute Activation",
    name: "Clamshells with Band",
    description:
      "Side lying with band around knees, open top knee while keeping feet together. Control the return.",
    sets: "3",
    reps: "15 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=6rWe6tLc_KM",
  },
  {
    id: "m7",
    category: "Glute Activation",
    name: "Banded Monster Walks",
    description:
      "Band around ankles, quarter squat position, walk forward and backward maintaining tension.",
    sets: "3",
    reps: "20 steps each direction",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=TeyfkdXAgUg",
  },
  {
    id: "m8",
    category: "Glute Activation",
    name: "Hip Thrusts",
    description:
      "Shoulders on bench, feet flat, drive hips to ceiling. Squeeze glutes hard at top.",
    sets: "3",
    reps: "12",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=W86oVlnLqY4",
  },

  // ANTI-SWAY (Lateral Stability)
  {
    id: "m9",
    category: "Anti-Sway",
    name: "Lateral Lunges with Hold",
    description:
      "Step out laterally, hold for 3 seconds at bottom, push back explosively. Prevents sliding in backswing.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=XOezFklpcIw",
  },
  {
    id: "m10",
    category: "Anti-Sway",
    name: "Single Leg RDL",
    description:
      "Balance on one leg, hinge at hip while extending other leg behind. Builds lateral stability.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=iRKxRm0zLgA",
  },
  {
    id: "m11",
    category: "Anti-Sway",
    name: "Lateral Band Walks",
    description:
      "Band around ankles, athletic stance, step sideways maintaining tension. Don't let knees cave.",
    sets: "3",
    reps: "15 each direction",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=6eoK_yxY8Ak",
  },
  {
    id: "m12",
    category: "Anti-Sway",
    name: "Single Leg Balance with Rotation",
    description:
      "Stand on one leg, rotate torso as if making a backswing. Hold 3 seconds. Builds swing stability.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=Ns8YJkbzUMg",
  },

  // ANTI-EARLY EXTENSION
  {
    id: "m13",
    category: "Anti-Early Extension",
    name: "Deep Squat with T-Spine Rotation",
    description:
      "Hold deep squat, rotate one arm to the sky while keeping pelvis stable. Prevents early extension.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=hKpehetjeA4",
  },
  {
    id: "m14",
    category: "Anti-Early Extension",
    name: "Wall Hip Hinge",
    description:
      "Stand 6 inches from wall, hinge at hips until glutes touch wall. Teaches proper hip hinge pattern.",
    sets: "3",
    reps: "15",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=acZUjvr8MCw",
  },
  {
    id: "m15",
    category: "Anti-Early Extension",
    name: "Goblet Squat Hold",
    description:
      "Hold weight at chest, deep squat position, maintain upright torso. Builds hip mobility under load.",
    sets: "3",
    reps: "30 sec hold",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=lRYBbchqxtI",
  },
  {
    id: "m16",
    category: "Anti-Early Extension",
    name: "Deadbug Variations",
    description:
      "On back, arms up, legs in tabletop. Extend opposite arm/leg while keeping low back pressed down.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=ecVUxfanQ8k",
  },
  {
    id: "m16a",
    category: "Anti-Early Extension",
    name: "Ankle Dorsiflexion Wall Stretch",
    description:
      "Face wall with one foot forward, knee bent toward wall while keeping heel down. Develops ankle mobility required for deep squat to prevent early extension.",
    sets: "3",
    reps: "30 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=mtVqe4CR_60",
  },
  {
    id: "m16b",
    category: "Anti-Early Extension",
    name: "Rotary Stool Hip Rotation",
    description:
      "Sit on rotating stool, practice hip rotation while keeping upper body stable. Teaches proper hip movement in transition to prevent early extension.",
    sets: "3",
    reps: "10 rotations each direction",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=mG_FXR63Jjk",
  },
  {
    id: "m16c",
    category: "Anti-Early Extension",
    name: "Deep Squat Progression",
    description:
      "Hold onto support, lower into deep squat position with heels down. Builds the mobility needed to maintain posture through the swing.",
    sets: "3",
    reps: "45 sec hold",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=Ia3EYoDaxdQ",
  },
  {
    id: "m16d",
    category: "Anti-Early Extension",
    name: "Belt Buckle Back",
    description:
      "Place alignment stick on ground at 45° between feet (trail toe to behind lead heel). At top of backswing, shift pressure into lead toe, then push belt buckle back along the stick line. Keeps trail hip back, drops arms into the slot, and prevents early extension.",
    sets: "3",
    reps: "10",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=92eE3E3ccaQ",
  },

  // T-SPINE MOBILITY
  {
    id: "m17",
    category: "T-Spine Mobility",
    name: "Open Books",
    description:
      "Side lying, knees stacked, rotate top arm across body and open to the other side. Follow with eyes.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=cncdlzYmbxg",
  },
  {
    id: "m18",
    category: "T-Spine Mobility",
    name: "Thread the Needle",
    description:
      "On all fours, thread one arm under body, rotating thoracic spine. Return and reach to sky.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=gyew25Vaqj8",
  },
  {
    id: "m19",
    category: "T-Spine Mobility",
    name: "Foam Roller Extensions",
    description:
      "Foam roller under upper back, hands behind head, extend over the roller segment by segment.",
    sets: "3",
    reps: "10 extensions",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=81kPLsMt6wY",
  },
  {
    id: "m20",
    category: "T-Spine Mobility",
    name: "Seated Rotation with Club",
    description:
      "Sit cross-legged, club across shoulders. Rotate as far as possible each direction. Hold end ranges.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=I1-M867ocQI",
  },

  // CORE STABILITY
  {
    id: "m21",
    category: "Core Stability",
    name: "Pallof Press",
    description:
      "Band at chest height, press straight out and hold. Resist rotation. Golf-specific anti-rotation.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=8vflPTMBQ_g",
  },
  {
    id: "m22",
    category: "Core Stability",
    name: "Bird Dog with Rotation",
    description:
      "Standard bird dog position, add thoracic rotation at the top. Builds core stability with mobility.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=_1j_HWknGLg",
  },
  {
    id: "m23",
    category: "Core Stability",
    name: "Side Plank with Hip Dips",
    description:
      "Side plank position, lower and raise hips. Builds lateral core strength for swing stability.",
    sets: "3",
    reps: "12 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=Pnd6UMYjwWE",
  },
  {
    id: "m24",
    category: "Core Stability",
    name: "Plank with Shoulder Taps",
    description:
      "High plank, alternate tapping opposite shoulder. Keep hips stable, don't rotate.",
    sets: "3",
    reps: "20 total taps",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=gKA5LBy7WAI",
  },

  // POWER & SPEED
  {
    id: "m25",
    category: "Power",
    name: "Medicine Ball Rotational Throws",
    description:
      "Stand sideways to wall, rotate and throw med ball into wall. Mimics golf swing power pattern.",
    sets: "3",
    reps: "10 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=WNwNrEjB_8s",
  },
  {
    id: "m26",
    category: "Power",
    name: "Cable Woodchops",
    description:
      "High to low or low to high cable rotation. Control the eccentric, explode on the concentric.",
    sets: "3",
    reps: "12 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=OcmCcvmOlQ0",
  },
  {
    id: "m27",
    category: "Power",
    name: "Jump Squats",
    description:
      "Bodyweight squat, explode up into jump. Land softly and immediately descend into next rep.",
    sets: "3",
    reps: "10",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=36vnWAkL7ZQ",
  },
  {
    id: "m28",
    category: "Power",
    name: "Rotational Box Jumps",
    description:
      "Start sideways to box, rotate and jump onto box. Step down and repeat other direction.",
    sets: "3",
    reps: "6 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=rGZF0gj-vjY",
  },

  // EXPLOSIVE ROTATION
  {
    id: "m29",
    category: "Explosive Rotation",
    name: "Single-Leg Rotational Med Ball Taps",
    description:
      "Balance on one leg, rotate upper body to tap med ball on ground each side. Establishes motor control for rotation around stable lower body.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=fCR3gVqsTBI",
  },
  {
    id: "m30",
    category: "Explosive Rotation",
    name: "Split Stance Anti-Rotation Scoop Toss",
    description:
      "Split stance facing wall, rotate and scoop toss med ball into wall. Introduces hip and trunk separation with a firm front side.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=3_x1lB9jOQ4",
  },
  {
    id: "m31",
    category: "Explosive Rotation",
    name: "Rotational Med Ball Scoop Toss",
    description:
      "Stand sideways to wall, load into trail hip, explosively rotate and scoop toss ball into wall. Lower impact on elbow/shoulder than shot put.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=HLwSkCBM_xY",
  },
  {
    id: "m32",
    category: "Explosive Rotation",
    name: "Rotational Med Ball Shot Put",
    description:
      "Stand sideways, load into trail hip, explosively rotate and shot put ball into wall. Use light ball to maximize speed over weight.",
    sets: "3",
    reps: "6 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=5eQaPG4arVo",
  },
  {
    id: "m33",
    category: "Explosive Rotation",
    name: "Half-Kneeling Step Outs with Rotation",
    description:
      "Start in half-kneeling, step out laterally while rotating torso. Combines hip mobility with rotational power.",
    sets: "3",
    reps: "8 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=ayaL-xZRAFY",
  },
  {
    id: "m34",
    category: "Explosive Rotation",
    name: "Lateral Bounding with Stick",
    description:
      "Hold stick across shoulders, bound laterally landing on single leg. Develops explosive lateral power with rotational control.",
    sets: "3",
    reps: "6 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=-ITYZTuHYlw",
  },

  // ANTI-ROTATION (builds rotation power through stability)
  {
    id: "m35",
    category: "Anti-Rotation",
    name: "Kneeling Pallof Press",
    description:
      "Kneel perpendicular to cable/band, press hands straight out and hold. Keep trunk and pelvis square. Resist rotation throughout.",
    sets: "2",
    reps: "12 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=y30uEJhBTwQ",
  },
  {
    id: "m36",
    category: "Anti-Rotation",
    name: "Split Stance Pallof Press",
    description:
      "Split stance perpendicular to cable, press out while maintaining square body position. Progression from kneeling version.",
    sets: "2",
    reps: "12 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=T5MEEtY78YE",
  },
  {
    id: "m37",
    category: "Anti-Rotation",
    name: "Plank Plate Slide",
    description:
      "High plank position, slide weight plate side to side with one hand while bracing core. Keep pelvis and spine neutral.",
    sets: "4",
    reps: "5 slides each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=IuaVDDYciNc",
  },
  {
    id: "m38",
    category: "Anti-Rotation",
    name: "Renegade Rows",
    description:
      "High plank with dumbbells, row one weight up while resisting rotation. Select weight that allows good form throughout.",
    sets: "4",
    reps: "5 each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=te1rv8hxg-k",
  },
  {
    id: "m39",
    category: "Anti-Rotation",
    name: "Stir the Pot",
    description:
      "Forearms on stability ball in plank position, make large circles with arms while keeping lower body stable. Build to 10 circles each direction.",
    sets: "3",
    reps: "10 circles each direction",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=PZAYbjkBXWM",
  },
  {
    id: "m40",
    category: "Anti-Rotation",
    name: "Roll Out Progressions",
    description:
      "Kneeling with ab wheel or stability ball, roll out while maintaining neutral spine. Resist arching low back or rounding upper back.",
    sets: "3",
    reps: "10",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=PEVQ-GWQjyc",
  },

  // STAMINA & ENDURANCE
  {
    id: "m41",
    category: "Stamina",
    name: "Farmers Walk",
    description:
      "Carry heavy weights in each hand, walk with upright posture and small steps. Builds grip strength, core stability, and round endurance.",
    sets: "4",
    reps: "20m walks",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=1uOs1hP3u4A",
  },
  {
    id: "m42",
    category: "Stamina",
    name: "Waiter's Carry",
    description:
      "Hold kettlebell or dumbbell overhead with straight arm, shoulder packed. Walk while maintaining position. Builds shoulder endurance.",
    sets: "4",
    reps: "15m each hand",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=_f17ljGZWq0",
  },
  {
    id: "m43",
    category: "Stamina",
    name: "Copenhagen Adductor Hold",
    description:
      "Side plank with top foot on bench, bottom leg hanging. Lift bottom leg to meet top. Builds adductor strength for hip stability through 18 holes.",
    sets: "3",
    reps: "20 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=AiYzzRoXOEY",
  },
  {
    id: "m44",
    category: "Stamina",
    name: "Alternating Split Squat Jumps",
    description:
      "Lunge position, explosively jump and switch legs mid-air. Develops single-leg power endurance for walking the course.",
    sets: "3",
    reps: "10 total jumps",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=APueXKUp1Fk",
  },
  {
    id: "m45",
    category: "Stamina",
    name: "Squat to Overhead Press Complex",
    description:
      "Goblet squat into overhead press as one fluid movement. Builds total body endurance and maintains strength through back nine.",
    sets: "3",
    reps: "12",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=x0lCCVMSLCg",
  },
];

export const cooldownExercises: Exercise[] = [
  {
    id: "c1",
    category: "Cooldown",
    name: "Supine Spinal Twist",
    description:
      "On back, knees to one side, arms spread, head opposite direction. Hold and breathe deeply.",
    duration: "60 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=ElKoMMaTPCM",
  },
  {
    id: "c2",
    category: "Cooldown",
    name: "Child's Pose with Reach",
    description:
      "Standard child's pose, walk hands to one side for lateral stretch. Alternate sides.",
    duration: "60 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=smg0YxUcTiE",
  },
  {
    id: "c3",
    category: "Cooldown",
    name: "Figure Four Stretch",
    description:
      "On back, ankle crossed over opposite knee. Pull bottom leg toward chest. Deep glute stretch.",
    duration: "60 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=ckHZyA99Das",
  },
  {
    id: "c4",
    category: "Cooldown",
    name: "Standing Forward Fold",
    description:
      "Feet hip width, fold forward, let head hang heavy. Grab opposite elbows and sway gently.",
    duration: "60 sec",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=XAmZYIYIOWo",
  },
  {
    id: "c5",
    category: "Cooldown",
    name: "Hip Flexor Stretch with Reach",
    description:
      "Half-kneeling, squeeze back glute, reach same-side arm up and over. Deep hip flexor release.",
    duration: "60 sec each side",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=iAPA5ej6eSM",
  },
  {
    id: "c6",
    category: "Cooldown",
    name: "Foam Roll Full Body",
    description:
      "Roll out calves, quads, IT band, lats, and upper back. Spend extra time on tight spots.",
    duration: "5 min",
    source: "TPI",
    url: "https://www.youtube.com/watch?v=Oz4xHEgMaLY",
  },
];
