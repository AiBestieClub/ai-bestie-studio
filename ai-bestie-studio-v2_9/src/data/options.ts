import type { FieldOption } from "@/types";

export const GENDERS: FieldOption[] = [
  { value: "Woman", label: "Woman", emoji: "👩🏾" },
  { value: "Man", label: "Man", emoji: "👨🏾" },
  { value: "Non-Binary", label: "Non-Binary", emoji: "🧑🏾" },
  { value: "Other", label: "Other", emoji: "✨" },
];

export const AGE_RANGES: FieldOption[] = [
  { value: "18–24", label: "18–24" }, { value: "25–30", label: "25–30" },
  { value: "31–35", label: "31–35" }, { value: "36–40", label: "36–40" },
  { value: "41–45", label: "41–45" }, { value: "45+", label: "45+" },
];

export const ETHNICITIES: FieldOption[] = [
  { value: "Black / African American", label: "Black / African American" },
  { value: "Afro-Latina", label: "Afro-Latina" },
  { value: "Black British", label: "Black British" },
  { value: "West African", label: "West African" },
  { value: "East African", label: "East African" },
  { value: "Caribbean", label: "Caribbean" },
  { value: "Latina / Hispanic", label: "Latina / Hispanic" },
  { value: "South Asian", label: "South Asian" },
  { value: "East Asian", label: "East Asian" },
  { value: "Southeast Asian", label: "Southeast Asian" },
  { value: "Middle Eastern", label: "Middle Eastern" },
  { value: "White / European", label: "White / European" },
  { value: "Mixed Race", label: "Mixed Race" },
  { value: "Multiracial", label: "Multiracial" },
];

export const SKIN_TONES: FieldOption[] = [
  { value: "Porcelain", label: "Porcelain", description: "Very fair, cool" },
  { value: "Ivory", label: "Ivory", description: "Fair, neutral" },
  { value: "Beige", label: "Beige", description: "Light warm" },
  { value: "Sandy", label: "Sandy", description: "Light medium" },
  { value: "Honey", label: "Honey", description: "Medium golden" },
  { value: "Caramel", label: "Caramel", description: "Medium brown" },
  { value: "Bronze", label: "Bronze", description: "Medium-dark" },
  { value: "Cocoa", label: "Cocoa", description: "Dark brown" },
  { value: "Espresso", label: "Espresso", description: "Deep dark" },
  { value: "Ebony", label: "Ebony", description: "Very deep" },
];

export const SKIN_TONE_COLORS: Record<string, string> = {
  Porcelain: "#fde8d8", Ivory: "#f5d5b8", Beige: "#e8c49a", Sandy: "#d4a878",
  Honey: "#c4935a", Caramel: "#b07844", Bronze: "#8b5e32", Cocoa: "#6b4226",
  Espresso: "#4a2c17", Ebony: "#2d1810",
};

export const EYE_COLORS: FieldOption[] = [
  { value: "Brown", label: "Brown" }, { value: "Dark Brown", label: "Dark Brown" },
  { value: "Hazel", label: "Hazel" }, { value: "Green", label: "Green" },
  { value: "Blue", label: "Blue" }, { value: "Gray", label: "Gray" },
  { value: "Amber", label: "Amber" }, { value: "Black", label: "Black" },
];

export const HAIR_STYLES: FieldOption[] = [
  { value: "Sleek Straight", label: "Sleek Straight" },
  { value: "Bouncy Blowout", label: "Bouncy Blowout" },
  { value: "Natural Curls", label: "Natural Curls" },
  { value: "Coily 4C Natural", label: "Coily 4C" },
  { value: "Wavy Beach Waves", label: "Beach Waves" },
  { value: "Silk Press", label: "Silk Press" },
  { value: "High Bun", label: "High Bun" },
  { value: "Low Bun", label: "Low Bun" },
  { value: "Ponytail", label: "Ponytail" },
  { value: "Box Braids", label: "Box Braids" },
  { value: "Locs", label: "Locs" },
  { value: "Pixie Cut", label: "Pixie Cut" },
  { value: "Bob Cut", label: "Bob" },
  { value: "Long Layers", label: "Long Layers" },
  { value: "Space Buns", label: "Space Buns" },
  { value: "Updo", label: "Updo" },
];

export const HAIR_COLORS: FieldOption[] = [
  { value: "Jet Black", label: "Jet Black" }, { value: "Dark Brown", label: "Dark Brown" },
  { value: "Chestnut Brown", label: "Chestnut" }, { value: "Honey Blonde", label: "Honey Blonde" },
  { value: "Platinum Blonde", label: "Platinum" }, { value: "Auburn Red", label: "Auburn" },
  { value: "Burgundy", label: "Burgundy" }, { value: "Rose Gold", label: "Rose Gold" },
  { value: "Caramel Highlights", label: "Caramel" }, { value: "Ombre", label: "Ombre" },
  { value: "Silver", label: "Silver" },
];

export const BODY_TYPES: FieldOption[] = [
  { value: "Slim", label: "Slim" }, { value: "Athletic", label: "Athletic" },
  { value: "Toned", label: "Toned" }, { value: "Curvy", label: "Curvy" },
  { value: "Petite", label: "Petite" }, { value: "Plus Size", label: "Plus Size" },
  { value: "Tall & Slender", label: "Tall & Slender" }, { value: "Hourglass", label: "Hourglass" },
];

export const FACIAL_FEATURES: string[] = [
  "High cheekbones", "Full lips", "Strong jawline", "Button nose", "Wide eyes",
  "Almond eyes", "Upturned nose", "Defined brows", "Long eyelashes", "Dimples",
  "Sharp features", "Fox eyes", "Cat eyes", "Heart-shaped face", "Prominent collarbone",
];

export const PERSONALITY_TRAITS: string[] = [
  "Confident", "Mysterious", "Playful", "Sophisticated", "Elegant", "Bold",
  "Gentle", "Fierce", "Radiant", "Magnetic", "Intellectual", "Creative",
  "Adventurous", "Glamorous", "Authentic", "Empowered", "Ambitious", "Artistic",
];

export const STYLES: FieldOption[] = [
  { value: "High Fashion / Editorial", label: "High Fashion" },
  { value: "Luxury Minimalist", label: "Luxury Minimal" },
  { value: "Power Dressing", label: "Power Dressing" },
  { value: "Soft Feminine", label: "Soft Feminine" },
  { value: "Street Style", label: "Street Style" },
  { value: "Athleisure / Athletic", label: "Athleisure" },
  { value: "Bohemian Luxury", label: "Bohemian" },
  { value: "Y2K / Retro", label: "Y2K / Retro" },
  { value: "Dark Feminine", label: "Dark Feminine" },
  { value: "Clean Girl Aesthetic", label: "Clean Girl" },
  { value: "Maximalist Glam", label: "Maximalist Glam" },
];

export const ENERGY_TYPES: FieldOption[] = [
  { value: "Confident & Commanding", label: "Confident & Commanding" },
  { value: "Soft & Approachable", label: "Soft & Approachable" },
  { value: "Mysterious & Alluring", label: "Mysterious & Alluring" },
  { value: "High Energy & Fun", label: "High Energy & Fun" },
  { value: "Cool & Unbothered", label: "Cool & Unbothered" },
  { value: "Elegant & Refined", label: "Elegant & Refined" },
  { value: "Fierce & Unstoppable", label: "Fierce & Unstoppable" },
  { value: "Radiant & Warm", label: "Radiant & Warm" },
  { value: "Edgy & Avant-Garde", label: "Edgy & Avant-Garde" },
  { value: "Romantic & Dreamy", label: "Romantic & Dreamy" },
];

export const CONTENT_NICHES: FieldOption[] = [
  { value: "Fashion", label: "Fashion", emoji: "👗" },
  { value: "Beauty", label: "Beauty", emoji: "💄" },
  { value: "Lifestyle", label: "Lifestyle", emoji: "✨" },
  { value: "Luxury", label: "Luxury", emoji: "💎" },
  { value: "Travel", label: "Travel", emoji: "🌍" },
  { value: "Fitness", label: "Fitness", emoji: "🏋🏾‍♀️" },
  { value: "Food & Cooking", label: "Food", emoji: "🍽️" },
  { value: "Business", label: "Business", emoji: "💼" },
  { value: "Finance", label: "Finance", emoji: "💰" },
  { value: "AI Creator", label: "AI Creator", emoji: "🤖" },
  { value: "Podcast", label: "Podcast", emoji: "🎙️" },
  { value: "Real Estate", label: "Real Estate", emoji: "🏡" },
  { value: "Motivation", label: "Motivation", emoji: "🔥" },
  { value: "UGC Creator", label: "UGC", emoji: "📱" },
  { value: "Mom Life", label: "Mom Life", emoji: "💕" },
];

export const OUTFIT_TYPES: FieldOption[] = [
  { value: "Tailored Power Suit", label: "Power Suit" },
  { value: "Couture Evening Gown", label: "Evening Gown" },
  { value: "Luxury Casual Set", label: "Luxury Casual" },
  { value: "Mini Dress", label: "Mini Dress" },
  { value: "Maxi Dress", label: "Maxi Dress" },
  { value: "Bodycon Dress", label: "Bodycon" },
  { value: "Blazer & Trousers", label: "Blazer Set" },
  { value: "Crop Top & Jeans", label: "Crop & Jeans" },
  { value: "Matching Loungewear Set", label: "Loungewear" },
  { value: "Activewear Set", label: "Activewear" },
  { value: "Trench Coat", label: "Trench Coat" },
  { value: "Monochromatic Look", label: "Monochromatic" },
  { value: "Leather Outfit", label: "Leather" },
  { value: "Swimsuit / Coverup", label: "Swimwear" },
  { value: "Coordinated Set", label: "Coord Set" },
];

export const DESIGNER_BRANDS: FieldOption[] = [
  { value: "Chanel", label: "Chanel" }, { value: "Louis Vuitton", label: "Louis Vuitton" },
  { value: "Gucci", label: "Gucci" }, { value: "Versace", label: "Versace" },
  { value: "Prada", label: "Prada" }, { value: "Bottega Veneta", label: "Bottega Veneta" },
  { value: "Saint Laurent", label: "Saint Laurent" }, { value: "Balenciaga", label: "Balenciaga" },
  { value: "Valentino", label: "Valentino" }, { value: "Dior", label: "Dior" },
  { value: "The Row", label: "The Row" }, { value: "Jacquemus", label: "Jacquemus" },
  { value: "Zimmermann", label: "Zimmermann" }, { value: "Hermes", label: "Hermes" },
  { value: "Fendi", label: "Fendi" }, { value: "Balmain", label: "Balmain" },
  { value: "Skims", label: "Skims" }, { value: "Lululemon", label: "Lululemon" },
];

export const LOCATIONS: FieldOption[] = [
  { value: "Luxury Penthouse", label: "Penthouse", emoji: "🏙️" },
  { value: "Corner Office", label: "Corner Office", emoji: "🏢" },
  { value: "Marble Bathroom", label: "Marble Bath", emoji: "🛁" },
  { value: "Walk-In Closet", label: "Closet", emoji: "👗" },
  { value: "Private Jet", label: "Private Jet", emoji: "✈️" },
  { value: "Yacht", label: "Yacht", emoji: "⛵" },
  { value: "Luxury Beach", label: "Luxury Beach", emoji: "🏖️" },
  { value: "5-Star Hotel", label: "5-Star Hotel", emoji: "🏨" },
  { value: "Paris", label: "Paris", emoji: "🗼" },
  { value: "Dubai", label: "Dubai", emoji: "🌆" },
  { value: "Tokyo", label: "Tokyo", emoji: "🏯" },
  { value: "New York City", label: "NYC", emoji: "🗽" },
  { value: "Miami Beach", label: "Miami", emoji: "🌴" },
  { value: "Aesthetic Café", label: "Café", emoji: "☕" },
  { value: "Private Gym", label: "Private Gym", emoji: "💪" },
  { value: "Creator Studio", label: "Studio", emoji: "📸" },
  { value: "Fine Dining Restaurant", label: "Fine Dining", emoji: "🍽️" },
  { value: "Fashion Week Venue", label: "Fashion Week", emoji: "👠" },
  { value: "Rooftop Bar", label: "Rooftop", emoji: "🌃" },
  { value: "Tropical Vacation", label: "Tropical", emoji: "🌺" },
];

export const TIME_OF_DAY: FieldOption[] = [
  { value: "Golden hour sunrise", label: "Sunrise" },
  { value: "Morning light", label: "Morning" },
  { value: "Midday sun", label: "Midday" },
  { value: "Golden hour sunset", label: "Golden Hour" },
  { value: "Blue hour twilight", label: "Blue Hour" },
  { value: "Night", label: "Night" },
  { value: "Late night city lights", label: "Late Night" },
];

export const SEASONS: FieldOption[] = [
  { value: "Spring", label: "Spring" }, { value: "Summer", label: "Summer" },
  { value: "Fall / Autumn", label: "Fall" }, { value: "Winter", label: "Winter" },
];

export const POSES: FieldOption[] = [
  { value: "Walking confidently", label: "Walking" },
  { value: "Standing with power", label: "Power Stand" },
  { value: "Sitting elegantly", label: "Sitting" },
  { value: "Looking over shoulder", label: "Over Shoulder" },
  { value: "Laughing naturally", label: "Laughing" },
  { value: "Taking a selfie", label: "Selfie" },
  { value: "Holding coffee", label: "Holding Coffee" },
  { value: "Applying makeup", label: "Doing Makeup" },
  { value: "Mid-workout", label: "Mid-Workout" },
  { value: "Typing on laptop", label: "On Laptop" },
  { value: "Shopping and browsing", label: "Shopping" },
  { value: "Dancing", label: "Dancing" },
  { value: "Holding product naturally", label: "Holding Product" },
  { value: "Arms crossed, powerful", label: "Arms Crossed" },
  { value: "Looking directly at camera", label: "Camera Gaze" },
  { value: "Leaning against wall", label: "Leaning" },
  { value: "Driving luxury car", label: "Driving" },
];

export const EXPRESSIONS: FieldOption[] = [
  { value: "Smiling naturally", label: "Natural Smile" },
  { value: "Laughing genuinely", label: "Laughing" },
  { value: "Serious and intense", label: "Intense" },
  { value: "Soft and relaxed", label: "Soft" },
  { value: "Confident smirk", label: "Smirk" },
  { value: "Direct eye contact", label: "Direct Gaze" },
  { value: "Pouty", label: "Pouty" },
];

export const CAMERAS: FieldOption[] = [
  { value: "Sony A7R V", label: "Sony A7R V" },
  { value: "Canon EOS R5", label: "Canon EOS R5" },
  { value: "ARRI Alexa Mini", label: "ARRI Alexa" },
  { value: "RED Komodo", label: "RED Komodo" },
  { value: "iPhone 15 Pro Max", label: "iPhone 15 Pro" },
  { value: "Nikon Z9", label: "Nikon Z9" },
  { value: "Leica M11", label: "Leica M11" },
  { value: "Hasselblad X2D", label: "Hasselblad" },
  { value: "Fujifilm X-T5", label: "Fujifilm X-T5" },
];

export const LENSES: FieldOption[] = [
  { value: "24mm wide", label: "24mm — Wide" }, { value: "35mm", label: "35mm — Candid" },
  { value: "50mm", label: "50mm — Natural" }, { value: "85mm portrait", label: "85mm — Portrait" },
  { value: "135mm beauty", label: "135mm — Beauty" }, { value: "200mm telephoto", label: "200mm — Telephoto" },
];

export const SHOT_TYPES: FieldOption[] = [
  { value: "Close-up portrait", label: "Close-Up" },
  { value: "Medium portrait", label: "Medium" },
  { value: "Full body", label: "Full Body" },
  { value: "Wide environmental", label: "Wide" },
  { value: "Editorial", label: "Editorial" },
  { value: "Candid street", label: "Candid" },
  { value: "Macro beauty", label: "Macro" },
  { value: "Mirror reflection", label: "Mirror" },
  { value: "POV", label: "POV" },
];

export const LIGHTING: FieldOption[] = [
  { value: "Golden Hour", label: "Golden Hour", description: "Warm, soft sunlight" },
  { value: "Blue Hour", label: "Blue Hour", description: "Twilight, cool tones" },
  { value: "Studio Softbox", label: "Studio Softbox", description: "Even, controlled" },
  { value: "Ring Light", label: "Ring Light", description: "Beauty fill" },
  { value: "Natural Window Light", label: "Window Light", description: "Soft directional" },
  { value: "Luxury Interior Light", label: "Luxury Interior", description: "Warm ambient" },
  { value: "Night City Lights", label: "City Lights", description: "Neon, bokeh" },
  { value: "Dramatic Rembrandt", label: "Rembrandt", description: "Moody shadows" },
  { value: "High Key", label: "High Key", description: "Bright, airy" },
  { value: "Low Key", label: "Low Key", description: "Dark, dramatic" },
];

export const CAMERA_ANGLES: FieldOption[] = [
  { value: "Eye level", label: "Eye Level" }, { value: "Slight low angle", label: "Low Angle" },
  { value: "High angle", label: "High Angle" }, { value: "Bird's eye", label: "Bird's Eye" },
  { value: "Dutch angle", label: "Dutch Tilt" }, { value: "Overhead flat lay", label: "Flat Lay" },
];

export const COLOR_GRADINGS: FieldOption[] = [
  { value: "Warm golden tones", label: "Warm Golden" },
  { value: "Cool cinematic blue", label: "Cool Cinematic" },
  { value: "Neutral editorial", label: "Neutral Editorial" },
  { value: "High contrast black & white", label: "B&W Contrast" },
  { value: "Muted film grain", label: "Muted Film" },
  { value: "Vibrant saturated", label: "Vibrant" },
  { value: "Pastel dreamy", label: "Pastel Dreamy" },
  { value: "Moody dark shadows", label: "Moody Dark" },
];

export const MOODS: FieldOption[] = [
  { value: "Empowered & Bold", label: "Empowered & Bold" },
  { value: "Soft & Romantic", label: "Soft & Romantic" },
  { value: "Mysterious & Dark", label: "Mysterious & Dark" },
  { value: "Joyful & Playful", label: "Joyful & Playful" },
  { value: "Serene & Peaceful", label: "Serene & Peaceful" },
  { value: "Luxurious & Editorial", label: "Luxurious & Editorial" },
  { value: "Cinematic & Dramatic", label: "Cinematic & Dramatic" },
  { value: "Clean & Minimal", label: "Clean & Minimal" },
];

export const VISUAL_STYLES: FieldOption[] = [
  { value: "Vogue editorial", label: "Vogue Editorial" },
  { value: "Street photography", label: "Street Photography" },
  { value: "Luxury commercial", label: "Luxury Commercial" },
  { value: "Social media aesthetic", label: "Social Aesthetic" },
  { value: "Film photography", label: "Film / Analog" },
  { value: "Fine art portrait", label: "Fine Art" },
  { value: "Fashion campaign", label: "Fashion Campaign" },
];
