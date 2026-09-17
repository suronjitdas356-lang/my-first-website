import { TourPackage, TeamMember, CustomerReview, Coupon, Booking, SupportTicket } from '../types';

export const OFFICIAL_CONTACT = {
  nameBn: 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস',
  nameEn: 'Tirthobondhu Tour & Travels',
  sloganBn: 'আপনার তীর্থযাত্রা হোক নিরাপদ, সুন্দর ও স্মরণীয়।',
  sloganEn: 'May your pilgrimage be safe, beautiful, and memorable.',
  foundedBn: 'সেপ্টেম্বর ২০২৬',
  foundedEn: 'September 2026',
  addressBn: '৩৯ নং কাজিরবাগ, মানিকনগর বিশ্বরোড, ঢাকা–১২০৩, বাংলাদেশ',
  addressEn: '39 No. Kazirbagh, Maniknagar Bishwaroad, Dhaka–1203, Bangladesh',
  supportHoursBn: 'সপ্তাহে ৭ দিন | সকাল ৭:০০টা – রাত ১:০০টা',
  supportHoursEn: '7 Days/Week | 7:00 AM – 1:00 AM',
  phones: ['+8801960407018', '+8801792666308', '+8801732843174'],
  rawPhones: ['01960407018', '01792666308', '01732843174'],
  email: 'info.tirthobondhutourtravels@gmail.com',
  social: {
    facebookPage: 'https://www.facebook.com/share/1D9Lt7TFp2/',
    facebookGroup: 'https://www.facebook.com/groups/1482565900369158/',
    tiktok: 'https://www.tiktok.com/@tirthobondhu.tour',
    // Placeholders reserved as required
    instagram: null,
    youtube: null,
    whatsappBusiness: null,
    telegram: null
  }
};

export const INITIAL_TOURS: TourPackage[] = [
  {
    id: 'tb-tour-001',
    code: 'SITA-2026',
    titleBn: 'সীতাকুণ্ড মহাতীর্থ চন্দ্রনাথ ধাম ও বারো আউলিয়া দর্শন',
    titleEn: 'Sitakunda Chandranath Temple Maha Tirtha & Heritage Tour',
    slug: 'sitakunda-chandranath-pilgrimage',
    category: 'pilgrimage',
    destinationBn: 'সীতাকুণ্ড, চট্টগ্রাম',
    destinationEn: 'Sitakunda, Chattogram',
    durationBn: '২ দিন ১ রাত',
    durationEn: '2 Days 1 Night',
    durationDays: 2,
    durationNights: 1,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8418365?auto=format&fit=crop&w=800&q=80'
    ],
    priceAdult: 3850,
    priceChild: 2800,
    priceInfant: 0,
    travelDates: ['2026-10-09', '2026-10-23', '2026-11-06'],
    pickupPointsBn: [
      'মানিকনগর বিশ্বরোড (প্রধান কার্যালয়)',
      'সায়েদাবাদ বাস টার্মিনাল',
      'যাত্রাবাড়ী মোড়'
    ],
    pickupPointsEn: [
      'Maniknagar Bishwaroad (Head Office)',
      'Sayedabad Bus Terminal',
      'Jatrabari Square'
    ],
    vehicleTypeBn: 'হিনো ১জে এসি লাক্সারি কোচ (৩৬ আসন)',
    vehicleTypeEn: 'Hino 1J AC Luxury Coach (36 Seats)',
    totalSeats: 36,
    bookedSeats: 18,
    status: 'Booking Open',
    hotelTypeBn: 'স্ট্যান্ডার্ড এসি হোটেল ও আশ্রম বিশ্রাম ব্যবস্থা',
    hotelTypeEn: 'Standard AC Hotel & Ashram Rest Arrangement',
    mealPlanBn: 'বিশুদ্ধ নিরামিষ ও সাত্ত্বিক প্রসাদ (সকালের নাস্তা, দুপুরের প্রসাদ, রাতের আহার)',
    mealPlanEn: 'Pure Vegetarian & Temple Prasadam (Breakfast, Lunch & Dinner)',
    descriptionBn: 'পবিত্র সীতাকুণ্ড চন্দ্রনাথ পাহাড়ের শীর্ষে অবস্থিত ঐতিহ্যবাহী শিব মন্দির ও শক্তিপীঠ দর্শন। প্রবীণ ও নবীন সকল ভক্তবৃন্দের জন্য নিরাপদ, সুশৃঙ্খল ও মর্যাদাপূর্ণ তীর্থযাত্রার বিশেষ প্যাকেজ।',
    descriptionEn: 'Sacred pilgrimage to the holy Chandranath Temple and Shaktipeeth atop Sitakunda hill, Chattogram. Complete with experienced guides, AC transport, comfortable stay, and hygienic vegetarian meals.',
    itinerary: [
      {
        day: 1,
        titleBn: 'ঢাকা থেকে সীতাকুণ্ড যাত্রা ও ব্যাসকুণ্ড দর্শন',
        titleEn: 'Departure from Dhaka & Vyas Kunda Darshan',
        descBn: 'রাত ১১:০০টায় মানিকনগর বিশ্বরোড অফিস থেকে আরামদায়ক বাসে যাত্রা শুরু। সকালে সীতাকুণ্ড পৌঁছে ফ্রেশ হওয়া, সকালের স্বাস্থ্যকর নাস্তা এবং ব্যাসকুণ্ড ও শম্ভুনাথ মন্দির দর্শন।',
        descEn: 'Depart from Maniknagar Bishwaroad office at 11:00 PM via AC coach. Arrive in Sitakunda early morning, check-in, breakfast, and visit Vyas Kunda and Shambhunath Temple.'
      },
      {
        day: 2,
        titleBn: 'চন্দ্রনাথ ধাম আরোহণ, মহাদেবের পুজো ও ঢাকা প্রত্যাবর্তন',
        titleEn: 'Ascent to Chandranath Hill, Puja & Return to Dhaka',
        descBn: 'ভোর ৫:০০টায় নির্দেশিকাসহ চন্দ্রনাথ পাহাড় আরোহণ, পুজো ও প্রার্থনা সমাপন। দুপুরে সাত্ত্বিক প্রসাদ গ্রহণ এবং বিকেলে ঢাকার উদ্দেশ্যে রওনা। রাত ১১:০০টায় ঢাকায় পৌঁছানো।',
        descEn: 'Early morning guided trek to Chandranath Temple, sacred puja offering, noon prasadam feast, and comfortable return journey to Dhaka by 11:00 PM.'
      }
    ],
    includedBn: [
      'ঢাকা-সীতাকুণ্ড-ঢাকা বিলাসবহুল এসি বাসের আসন',
      '১ রাত হোটেলে আবাসন (টুইন/ট্রিপল শেয়ারিং)',
      'পবিত্র নিরামিষ আহার ও মহাপ্রসাদ (২ দিনের সব খাবার)',
      'অভিজ্ঞ তীর্থ গাইড ও সমন্বয়কারী সার্বক্ষণিক সহযোগিতা',
      'জরুরি প্রাথমিক চিকিৎসা ও সহায়তা'
    ],
    includedEn: [
      'Dhaka-Sitakunda-Dhaka Roundtrip AC Coach Seat',
      '1 Night Hotel Stay (Twin/Triple Sharing)',
      'All Pure Vegetarian Meals & Holy Prasadam',
      'Dedicated Pilgrim Guide & Coordinator Assistance',
      'Emergency First Aid Support'
    ],
    excludedBn: [
      'ব্যক্তিগত পুজোর সামগ্রী বা বিশেষ পুজো ফি',
      'ব্যক্তিগত কেনাকাটা ও প্যাকেজ বহির্ভূত খাবার',
      'পাহাড়ে ঘোড়া বা পালকির ব্যক্তিগত খরচ (যদি গ্রহণ করেন)'
    ],
    excludedEn: [
      'Personal puja items or special priest offerings',
      'Personal shopping and laundry',
      'Palanquin or porter charges on hill trek (if hired)'
    ],
    specialInstructionsBn: [
      'পাহাড়ে ওঠার জন্য আরামদায়ক গ্রিপযুক্ত জুতা পরিধান করুন।',
      'জাতীয় পরিচয়পত্র বা জন্মনিবন্ধন সনদের ফটোকপি সঙ্গে রাখুন।',
      'বয়োবৃদ্ধদের জন্য বিশেষ সহায়ক ব্যবস্থা উপলব্ধ রয়েছে।'
    ],
    specialInstructionsEn: [
      'Wear comfortable walking shoes with firm grip for hill trek.',
      'Carry NID or Birth Certificate photocopy.',
      'Special elderly companion assistance available on advance notice.'
    ],
    discountPercent: 5,
    originalPriceAdult: 4050,
    bookingDeadline: '2026-10-06',
    featured: true
  },
  {
    id: 'tb-tour-002',
    code: 'SYLH-2026',
    titleBn: 'সিলেট শ্রী চৈতন্য মহাপ্রভু ধাম, জয়ন্তিয়া শক্তিপীঠ ও শ্রীমঙ্গল তীর্থযাত্রা',
    titleEn: 'Sylhet Sri Chaitanya Mahaprabhu Dham, Jayantiya & Sreemangal',
    slug: 'sylhet-chaitanya-dham-pilgrimage',
    category: 'pilgrimage',
    destinationBn: 'সিলেট ও শ্রীমঙ্গল',
    destinationEn: 'Sylhet & Sreemangal',
    durationBn: '৩ দিন ২ রাত',
    durationEn: '3 Days 2 Nights',
    durationDays: 3,
    durationNights: 2,
    coverImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    priceAdult: 6200,
    priceChild: 4500,
    priceInfant: 0,
    travelDates: ['2026-10-15', '2026-11-12'],
    pickupPointsBn: [
      'মানিকনগর বিশ্বরোড (প্রধান কার্যালয়)',
      'বিমানবন্দর রেলওয়ে স্টেশন কাউন্টার'
    ],
    pickupPointsEn: [
      'Maniknagar Bishwaroad (Head Office)',
      'Airport Railway Station Counter'
    ],
    vehicleTypeBn: 'লাক্সারি ট্যুরিস্ট বাস / মাইক্রোবাস',
    vehicleTypeEn: 'Luxury Tourist Bus / Microbus',
    totalSeats: 32,
    bookedSeats: 26,
    status: 'Almost Full',
    hotelTypeBn: 'সিলেট শহরের ৩-স্টার স্ট্যান্ডার্ড এসি হোটেল',
    hotelTypeEn: '3-Star Standard AC Hotel in Sylhet City',
    mealPlanBn: 'শতভাগ বিশুদ্ধ সাত্ত্বিক বৈষ্ণব নিরামিষ ভোজন ও প্রসাদ',
    mealPlanEn: '100% Pure Vaishnava Vegetarian Cuisine & Holy Prasadam',
    descriptionBn: 'গোলাপগঞ্জ ঢাকাদক্ষিণে মহাপ্রভু শ্রীচৈতন্যের পৈতৃক ভিটা, জৈন্তাপুর জয়ন্তী শক্তিপীঠ এবং শ্রীমঙ্গলের নির্মল চা বাগান পরিবেষ্টিত রাধাকৃষ্ণ ও শিব মন্দির দর্শন।',
    descriptionEn: 'Sacred journey to Sri Chaitanya Mahaprabhu ancestral home at Dhakadakshin, Jayanti Shaktipeeth at Jaintiapur, and serene temples in Sreemangal tea paradise.',
    itinerary: [
      {
        day: 1,
        titleBn: 'ঢাকা থেকে সিলেট যাত্রা ও হযরত শাহজালাল মাজার সংলগ্ন ইতিহাস ও কালীঘাট মন্দির দর্শন',
        titleEn: 'Dhaka to Sylhet & City Temples Visit',
        descBn: 'ভোরে মানিকনগর থেকে যাত্রা। বিকেলে সিলেট পৌঁছে হোটেলে চেক-ইন এবং সন্ধ্যায় কালীঘাট জয়কালী মন্দির দর্শন ও সন্ধ্যারতি শ্রবণ।',
        descEn: 'Early morning departure from Dhaka. Arrive in Sylhet afternoon, check-in, visit Kalighat Joykali Temple for evening aarti.'
      },
      {
        day: 2,
        titleBn: 'ঢাকাদক্ষিণ শ্রীচৈতন্য ধাম ও জয়ন্তিয়া শক্তিপীঠ দর্শন',
        titleEn: 'Dhakadakshin Chaitanya Dham & Jayantiya Shaktipeeth',
        descBn: 'সকালে ঢাকাদক্ষিণ ধামে কীর্তন ও দর্শন, দুপুরে বিশেষ ভোগ প্রসাদ। বিকেলে জৈন্তাপুরে ৫১ সতীপীঠের অন্যতম জয়ন্তী দেবীর পীঠস্থান দর্শন।',
        descEn: 'Morning prayers at Dhakadakshin sacred ancestral Dham, afternoon maha-prasadam, and visit sacred Jayanti Devi Shaktipeeth.'
      },
      {
        day: 3,
        titleBn: 'শ্রীমঙ্গল চা বাগান, রামকৃষ্ণ মিশন ও ঢাকায় ফেরা',
        titleEn: 'Sreemangal Tea Gardens, Ramakrishna Mission & Return',
        descBn: 'সকালে শ্রীমঙ্গলে শ্রী নির্মল আশ্রমে প্রার্থনা, চা বাগান ভ্রমণ এবং রাতের মধ্যে ঢাকায় নিরাপদ প্রত্যাবর্তন।',
        descEn: 'Visit Sreemangal spiritual ashram and green tea gardens; return comfortably to Dhaka by night.'
      }
    ],
    includedBn: [
      'যাওয়া-আসার আরামদায়ক এসি পরিবহন',
      '২ রাত মানসম্মত এসি হোটেলে থাকার ব্যবস্থা',
      'প্রতিদিনের পুষ্টিকর নিরামিষ আহার ও প্রসাদ',
      'সকল দর্শনীয় স্থান পরিদর্শন ও অভিজ্ঞ গাইডের দিকনির্দেশনা'
    ],
    includedEn: [
      'Roundtrip AC coach travel',
      '2 Nights Quality AC Hotel Lodging',
      'All daily vegetarian meals and prasadam',
      'Temple tour guidance and ground management'
    ],
    excludedBn: [
      'ব্যক্তিগত খরচ ও দান-দক্ষিণা'
    ],
    excludedEn: [
      'Personal tips, offerings, and personal expenses'
    ],
    specialInstructionsBn: [
      'মন্দির প্রাঙ্গণে মার্জিত ও শালীন পোশাক পরিধান আবশ্যক।'
    ],
    specialInstructionsEn: [
      'Modest attire required inside sacred temple premises.'
    ],
    bookingDeadline: '2026-10-10',
    featured: true
  },
  {
    id: 'tb-tour-003',
    code: 'KANT-2026',
    titleBn: 'দিনাজপুর কান্তজিউ মন্দির, রামসাগর ও উত্তরবঙ্গ ঐতিহাসিক তীর্থযাত্রা',
    titleEn: 'Dinajpur Kantajew Temple, Ramsagar & North Bengal Heritage',
    slug: 'dinajpur-kantajew-pilgrimage',
    category: 'pilgrimage',
    destinationBn: 'দিনাজপুর ও রংপুর',
    destinationEn: 'Dinajpur & Rangpur',
    durationBn: '৩ দিন ২ রাত',
    durationEn: '3 Days 2 Nights',
    durationDays: 3,
    durationNights: 2,
    coverImage: 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?auto=format&fit=crop&w=800&q=80'
    ],
    priceAdult: 5500,
    priceChild: 4000,
    priceInfant: 0,
    travelDates: ['2026-10-28', '2026-11-20'],
    pickupPointsBn: [
      'মানিকনগর বিশ্বরোড',
      'গাবতলী বাস টার্মিনাল'
    ],
    pickupPointsEn: [
      'Maniknagar Bishwaroad',
      'Gabtoli Bus Terminal'
    ],
    vehicleTypeBn: 'প্রথম শ্রেণির এসি পর্যটক বাস',
    vehicleTypeEn: 'First-Class AC Tourist Bus',
    totalSeats: 36,
    bookedSeats: 12,
    status: 'Booking Open',
    hotelTypeBn: 'দিনাজপুর শহরের প্রিমিয়াম হোটেল',
    hotelTypeEn: 'Premium Hotel in Dinajpur City',
    mealPlanBn: 'সাত্ত্বিক আহার ও আঞ্চলিক সুস্বাদু খাবার',
    mealPlanEn: 'Sattvic food & authentic regional cuisine',
    descriptionBn: 'পোড়ামাটির অপরূপ কারুকার্যে নির্মিত অষ্টাদশ শতকের বিশ্ববিখ্যাত শ্রী শ্রী কান্তজিউ নবরত্ন মন্দির দর্শন, নয়াবাদ মসজিদ ও রামসাগর ঐতিহাসিক দীঘি পরিদর্শন।',
    descriptionEn: 'Visit the world-renowned 18th-century terracotta masterpiece Kantajew Navaratna Temple, Nayabad historical site, and scenic Ramsagar in Dinajpur.',
    itinerary: [
      {
        day: 1,
        titleBn: 'ঢাকা থেকে দিনাজপুর যাত্রা',
        titleEn: 'Journey to Dinajpur',
        descBn: 'সকালে ঢাকা ত্যাগ, যমুনা সেতু অতিক্রম করে বিকেলে দিনাজপুর আগমন এবং হোটেলে বিশ্রাম।',
        descEn: 'Morning departure from Dhaka, crossing Bangabandhu Bridge, arriving Dinajpur by evening.'
      },
      {
        day: 2,
        titleBn: 'শ্রী শ্রী কান্তজিউ মন্দির দর্শন ও পূজার্চনা',
        titleEn: 'Kantajew Temple Darshan & Special Puja',
        descBn: 'দিনব্যাপী ঐতিহাসিক কান্তজিউ প্রাঙ্গণে অবস্থান, পূজার্চনা, টেরাকোটা শিল্পের বিবরণ উপভোগ ও প্রসাদ গ্রহণ।',
        descEn: 'Full day exploring Kantajew Temple, terracotta epics, prayer ceremony, and temple prasadam.'
      },
      {
        day: 3,
        titleBn: 'রামসাগর দীঘি ও ঢাকায় ফেরা',
        titleEn: 'Ramsagar Lake & Return Journey',
        descBn: 'সকালে রামসাগরের মনোরম পরিবেশ দর্শন এবং দুপুরের পর ঢাকার পথে যাত্রা।',
        descEn: 'Morning serene walk around Ramsagar Lake, heading back to Dhaka in comfort.'
      }
    ],
    includedBn: ['এসি বাস', 'হোটেল রুম', 'সকল খাবার', 'গাইড সেবা'],
    includedEn: ['AC Bus', 'Hotel Room', 'All Meals', 'Guide Service'],
    excludedBn: ['ব্যক্তিগত খরচ'],
    excludedEn: ['Personal items'],
    specialInstructionsBn: ['ক্যামেরা ব্যবহারে মন্দিরের অভ্যন্তরীণ নিয়ম মেনে চলুন।'],
    specialInstructionsEn: ['Follow temple interior photography guidelines.'],
    bookingDeadline: '2026-10-24',
    featured: false
  },
  {
    id: 'tb-tour-004',
    code: 'SUG-2026',
    titleBn: 'সুগন্ধা শক্তিপীঠ উকারকাঠি ও স্বরূপকাঠি পেয়ারা বাগান জলভ্রমণ',
    titleEn: 'Sugandha Shaktipeeth Shikarpur & Barishal Backwater Tour',
    slug: 'sugandha-shaktipeeth-barishal',
    category: 'pilgrimage',
    destinationBn: 'শিকারপুর, বরিশাল ও ঝালকাঠি',
    destinationEn: 'Shikarpur, Barishal & Jhalokathi',
    durationBn: '২ দিন ১ রাত',
    durationEn: '2 Days 1 Night',
    durationDays: 2,
    durationNights: 1,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    priceAdult: 4200,
    priceChild: 3200,
    priceInfant: 0,
    travelDates: ['2026-11-05', '2026-11-19'],
    pickupPointsBn: ['সদরঘাট লঞ্চ টার্মিনাল', 'মানিকনগর বিশ্বরোড'],
    pickupPointsEn: ['Sadarghat Launch Terminal', 'Maniknagar Bishwaroad'],
    vehicleTypeBn: 'বিলাসবহুল ডাবল ডেকার লঞ্চ কেবিন / এসি বাস',
    vehicleTypeEn: 'Luxury AC Launch Cabin / AC Bus',
    totalSeats: 30,
    bookedSeats: 10,
    status: 'Booking Open',
    hotelTypeBn: 'লঞ্চ ভিআইপি কেবিন ও বরিশালের মানসম্মত হোটেল',
    hotelTypeEn: 'VIP Launch Cabin & Quality Barishal Hotel',
    mealPlanBn: 'খাঁটি নিরামিষ ও বরিশালের ঐতিহ্যবাহী সাত্ত্বিক রান্না',
    mealPlanEn: 'Pure Vegetarian & Authentic Regional Cuisine',
    descriptionBn: 'পবিত্র ৫১ সতীপীঠের অন্যতম সুগন্ধা নদী তীরে অবস্থিত মা উগ্রতারা / তারা সুন্দরীর শক্তিপীঠ দর্শন এবং দক্ষিণাঞ্চলের শান্ত নদীমাতৃক প্রকৃতি উপভোগ।',
    descriptionEn: 'Sacred pilgrimage to Sugandha Shaktipeeth on the banks of Sugandha River, combined with the tranquil backwaters of southern Bangladesh.',
    itinerary: [
      {
        day: 1,
        titleBn: 'ঢাকা থেকে বরিশাল লঞ্চযাত্রা ও সুগন্ধা তীর্থে পৌঁছানো',
        titleEn: 'Launch Voyage to Barishal & Sugandha Dham',
        descBn: 'রাতে সদরঘাট থেকে বিলাসবহুল এসি কেবিনে যাত্রা। ভোরে বরিশাল পৌঁছে শিকারপুর সুগন্ধা শক্তিপীঠে মায়ের বিশেষ পুজো ও ভোগ দর্শন।',
        descEn: 'Overnight journey by luxury AC cabin launch. Morning arrival and special puja at Sugandha Shaktipeeth in Shikarpur.'
      },
      {
        day: 2,
        titleBn: 'স্বরূপকাঠি ফ্লোটিং মার্কেট ও ঢাকায় ফেরা',
        titleEn: 'Backwater Canals & Return to Dhaka',
        descBn: 'শান্ত খালে নৌভ্রমণ শেষে পদ্মাসেতু হয়ে এসি বাসে সন্ধ্যার মধ্যে ঢাকা প্রত্যাবর্তন।',
        descEn: 'Boat cruise along scenic canals and comfortable return to Dhaka via Padma Bridge.'
      }
    ],
    includedBn: ['লঞ্চ এসি কেবিন ও বাস পরিবহন', 'সকল আহার ও প্রসাদ', 'স্থানীয় সমন্বয়ক'],
    includedEn: ['Launch AC Cabin & Bus', 'All Meals & Prasadam', 'Local Coordinator'],
    excludedBn: ['ব্যক্তিগত ব্যয়'],
    excludedEn: ['Personal expenditures'],
    specialInstructionsBn: ['নৌভ্রমণের সময় সুরক্ষা বিধি ও লাইফ জ্যাকেট ব্যবহার করুন।'],
    specialInstructionsEn: ['Follow safety guidelines during boat cruise.'],
    bookingDeadline: '2026-11-01',
    featured: false
  },
  {
    id: 'tb-tour-005',
    code: 'SAJEK-2026',
    titleBn: 'মেঘের রাজ্য সাজেক ভ্যালি ও খাগড়াছড়ি অপরূপ পাহাড় ভ্রমণ',
    titleEn: 'Sajek Valley Kingdom of Clouds & Khagrachari Hills',
    slug: 'sajek-valley-domestic-tour',
    category: 'domestic',
    destinationBn: 'সাজেক ও খাগড়াছড়ি',
    destinationEn: 'Sajek & Khagrachari',
    durationBn: '৩ দিন ২ রাত',
    durationEn: '3 Days 2 Nights',
    durationDays: 3,
    durationNights: 2,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    priceAdult: 6800,
    priceChild: 4800,
    priceInfant: 0,
    travelDates: ['2026-10-18', '2026-11-08'],
    pickupPointsBn: ['মানিকnagar বিশ্বরোড', 'সায়েদাবাদ'],
    pickupPointsEn: ['Maniknagar Bishwaroad', 'Sayedabad'],
    vehicleTypeBn: 'হিনো এসি বাস এবং সাজেক স্পেশাল মহিন্দ্র চান্দের গাড়ি',
    vehicleTypeEn: 'Hino AC Bus + Sajek 4x4 Chander Gari',
    totalSeats: 28,
    bookedSeats: 15,
    status: 'Booking Open',
    hotelTypeBn: 'সাজেক ভ্যালি প্রিমিয়াম কাঠের কটেজ',
    hotelTypeEn: 'Sajek Valley Premium Hilltop Cottage',
    mealPlanBn: 'উভয় নিরামিষ ও পছন্দমাফিক স্বাস্থ্যকর আহার',
    mealPlanEn: 'Both Pure Veg & Choice-based Healthy Meals',
    descriptionBn: 'মেঘের দেশে সূর্যোদয় ও সূর্যাস্ত দেখার এক জাদুকরি ভ্রমণ। পরিবারের জন্য অত্যন্ত নিরাপদ, পাহাড়ের মনোরম রিসোর্টে থাকার ব্যবস্থা ও অভিজ্ঞ ট্যুর ম্যানেজার।',
    descriptionEn: 'Breathtaking journey to cloud-covered Sajek Valley. Safe mountain convoy, premium resort stays, and dedicated tour management.',
    itinerary: [
      {
        day: 1,
        titleBn: 'ঢাকা থেকে খাগড়াছড়ি হয়ে সাজেক প্রবেশ',
        titleEn: 'Dhaka to Khagrachari and Convoy into Sajek',
        descBn: 'রাতে রওনা দিয়ে ভোরে খাগড়াছড়ি পৌঁছানো। সকালের নাস্তা সেরে চান্দের গাড়িতে সাজেকের উদ্দেশে যাত্রা। বিকেলে কংলাক পাহাড় থেকে সূর্যাস্ত দর্শন।',
        descEn: 'Morning arrival in Khagrachari, army convoy ascent to Sajek, sunset views from Konglak peak.'
      },
      {
        day: 2,
        titleBn: 'মেঘের ভেলায় সূর্যোদয় ও হেলিপ্যাড আড্ডা',
        titleEn: 'Sunrise Above Clouds & Helipad Moments',
        descBn: 'ভোরবেলায় কটেজের বারান্দা থেকে মেঘের ঢেউ দেখা। বিকেলে স্থানীয় সংস্কৃতি ও রুইলুই পাড়া পরিদর্শন।',
        descEn: 'Mesmerizing morning view over cloud valleys, exploring Ruilui tribal village.'
      },
      {
        day: 3,
        titleBn: 'আলুটিলা গুহা, তারাতারে ঝর্ণা ও ঢাকা ফেরা',
        titleEn: 'Alutila Cave & Return to Dhaka',
        descBn: 'খাগড়াছড়ির ঐতিহাসিক আলুটিলা গুহা ও তারাতারে ঝর্ণা দর্শন শেষে রাতের বাসে ঢাকায় রওনা।',
        descEn: 'Visit Alutila mystery cave and waterfall, return to Dhaka safely.'
      }
    ],
    includedBn: ['এসি বাস', 'চান্দের গাড়ি রিজার্ভ', 'রিসোর্ট বুকিং', '৬ বেলা পুষ্টিকর খাবার'],
    includedEn: ['AC Bus', 'Reserved 4x4 Jeep', 'Cottage Booking', 'All Meals'],
    excludedBn: ['ব্যক্তিগত কেনাকাটা'],
    excludedEn: ['Personal shopping'],
    specialInstructionsBn: ['পাহাড়ে তাপমাত্রা রাতে কিছুটা কমে, হালকা শীতবস্ত্র সঙ্গে রাখবেন।'],
    specialInstructionsEn: ['Carry a light sweater for cooler night temperatures.'],
    bookingDeadline: '2026-10-14',
    featured: true
  },
  {
    id: 'tb-tour-006',
    code: 'KASHI-2026',
    titleBn: 'ভারত কাশী-বারাণসী শ্রী বিশ্বনাথ জ্যোতির্লিঙ্গ ও অযোধ্যা রাম মন্দির মহাতীর্থ',
    titleEn: 'India Kashi Vishwanath Jyotirlinga, Varanasi & Ayodhya Dham',
    slug: 'india-kashi-varanasi-ayodhya-pilgrimage',
    category: 'international',
    destinationBn: 'বারাণসী, অযোধ্যা ও প্রয়াগরাজ (ভারত)',
    destinationEn: 'Varanasi, Ayodhya & Prayagraj (India)',
    durationBn: '৭ দিন ৬ রাত',
    durationEn: '7 Days 6 Nights',
    durationDays: 7,
    durationNights: 6,
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    priceAdult: 38500,
    priceChild: 29000,
    priceInfant: 0,
    travelDates: ['2026-11-15', '2026-12-10'],
    pickupPointsBn: ['হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর / বেনাপোল সীমান্ত'],
    pickupPointsEn: ['Hazrat Shahjalal Int Airport / Benapole Border'],
    vehicleTypeBn: 'আন্তর্জাতিক ফ্লাইট / স্লিপার ট্রেন ও স্থানীয় এসি কোচ',
    vehicleTypeEn: 'International Flight / Train & Local AC Coach',
    totalSeats: 25,
    bookedSeats: 18,
    status: 'Almost Full',
    hotelTypeBn: 'বারাণসী ও অযোধ্যায় ৩-স্টার মানের পরিচ্ছন্ন হোটেল',
    hotelTypeEn: '3-Star Quality Clean Hotel in Varanasi & Ayodhya',
    mealPlanBn: 'শতভাগ বিশুদ্ধ নিরামিষ ভারতীয় ঐতিহ্যবাহী প্রসাদ ও আহার',
    mealPlanEn: '100% Pure Vegetarian Indian Temple Style Meals',
    descriptionBn: 'দ্বাদশ জ্যোতির্লিঙ্গের অন্যতম কাশী বিশ্বনাথ মন্দির, মা অন্নপূর্ণা, গঙ্গা আরতি, প্রয়াগরাজ ত্রিবেণী সঙ্গম স্নান এবং অযোধ্যার নবনির্মিত শ্রী রাম জন্মভূমি মন্দির দর্শন। ভিসা ও ভ্রমণ সংক্রান্ত পূর্ণাঙ্গ দিকনির্দেশনাসহ।',
    descriptionEn: 'Sacred journey to holy Kashi Vishwanath, mother Annapurna, magnificent Ganga Aarti, Triveni Sangam holy bath at Prayagraj, and the grand Sri Ram Temple in Ayodhya.',
    itinerary: [
      {
        day: 1,
        titleBn: 'ঢাকা থেকে বারাণসী গমন ও সন্ধ্যায় মহাগঙ্গা আরতি দর্শন',
        titleEn: 'Arrival in Varanasi & Evening Ganga Aarti',
        descBn: 'বারাণসী পৌঁছে হোটেল চেক-ইন। সন্ধ্যায় দশাশ্বমেধ ঘাটে নৌকায় বসে অপরূপ গঙ্গা আরতি দর্শন।',
        descEn: 'Arrive Varanasi, check into hotel, witness grand evening Ganga Aarti at Dashashwamedh Ghat.'
      },
      {
        day: 2,
        titleBn: 'শ্রী কাশী বিশ্বনাথ জ্যোতির্লিঙ্গ ও অন্নপূর্ণা পুজো',
        titleEn: 'Sri Kashi Vishwanath & Annapurna Darshan',
        descBn: 'ভোরে গঙ্গা স্নান, কাশী বিশ্বনাথ করিডোরে বিশেষ দর্শন ও সংকটের মোচন হনুমান মন্দির পরিদর্শন।',
        descEn: 'Holy morning Ganga bath, VIP Darshan at Kashi Vishwanath corridor and Sankat Mochan Temple.'
      },
      {
        day: 3,
        titleBn: 'প্রয়াগরাজ গমন ও ত্রিবেণী সঙ্গমে পবিত্র স্নান',
        titleEn: 'Trip to Prayagraj & Holy Sangam Bath',
        descBn: 'গঙ্গা, যমুনা ও সরস্বতী মিলনস্থল ত্রিবেণী সঙ্গমে স্নান ও পুজো সমাপন করে পুনরায় বারাণসী ফেরা।',
        descEn: 'Visit holy Triveni Sangam for purification bath and rituals, return to Varanasi.'
      },
      {
        day: 4,
        titleBn: 'অযোধ্যা যাত্রা ও সরযূ নদী আরতি',
        titleEn: 'Journey to Holy Ayodhya & Sarayu River Aarti',
        descBn: 'এসি কোচে অযোধ্যা আগমন। সরযূ নদীর তীরে আরতি দর্শন ও হনুমান গড়ি মন্দির পরিদর্শন।',
        descEn: 'Travel to Ayodhya by coach, participate in evening Sarayu Aarti and visit Hanuman Garhi.'
      },
      {
        day: 5,
        titleBn: 'শ্রী রাম জন্মভূমি মন্দির দর্শন ও পুজো',
        titleEn: 'Sri Ram Janmabhoomi Grand Temple Darshan',
        descBn: 'ঐতিহাসিক রাম মন্দির দর্শন, রামলালার পুজো এবং অযোধ্যার প্রাচীন মন্দিরসমূহ পরিদর্শন।',
        descEn: 'Comprehensive Darshan at Sri Ram Temple, Kanak Bhawan, and ancient sites of Ayodhya.'
      },
      {
        day: 6,
        titleBn: 'সারনাথ বুদ্ধ মহাবিহার ও বারাণসী প্রস্তুতি',
        titleEn: 'Sarnath Heritage & Shopping in Varanasi',
        descBn: 'ভগবান বুদ্ধের প্রথম ধর্মপ্রচারস্থল সারনাথ পরিদর্শন ও বিখ্যাত বেনারসি শাড়ির ঐতিহ্য দর্শন।',
        descEn: 'Visit historical Sarnath Buddhist site and explore authentic Varanasi weavers.'
      },
      {
        day: 7,
        titleBn: 'ঢাকা প্রত্যাবর্তন',
        titleEn: 'Return Journey to Dhaka',
        descBn: 'পরম তৃপ্তি ও স্মৃতি নিয়ে ঢাকার উদ্দেশ্যে যাত্রা এবং ভ্রমণ সমাপ্তি।',
        descEn: 'Farewell prayers and safe return journey back to Dhaka.'
      }
    ],
    includedBn: [
      'বিমান/রেল ও ভারতের অভ্যন্তরে সকল এসি যাতায়াত',
      '৬ রাত হোটেল থাকার ব্যবস্থা',
      'প্রতিদিনের ৩ বেলা খাঁটি নিরামিষ ভোজন',
      'অভিজ্ঞ তীর্থ গাইড ও সমন্বয়ক',
      'ভিসা আবেদনের সঠিক দিকনির্দেশনা ও ইনভাইটেশন সহায়তা'
    ],
    includedEn: [
      'Travel tickets & AC transport inside India',
      '6 Nights hotel accommodation',
      'All 3 daily pure vegetarian meals',
      'Experienced bilingual pilgrimage guide',
      'Visa guidance and itinerary documentation'
    ],
    excludedBn: [
      'ভারতীয় ভিসা ফি ও ট্রাভেল ট্যাক্স',
      'ব্যক্তিগত পুজো ফি ও কেনাকাটা'
    ],
    excludedEn: [
      'Indian visa fee and govt travel tax',
      'Personal puja rituals and shopping'
    ],
    specialInstructionsBn: [
      'ন্যূনতম ৬ মাস মেয়াদের বৈধ পাসপোর্ট প্রয়োজন।',
      'ভিসা অনুমোদনের বিষয়টি সম্পূর্ণ ভারতীয় হাইকমিশনের এখতিয়ারাধীন।'
    ],
    specialInstructionsEn: [
      'Passport must have at least 6 months remaining validity.',
      'Visa issuance is strictly subject to Indian High Commission approval.'
    ],
    bookingDeadline: '2026-10-30',
    featured: true
  }
];

export const FOUNDING_TEAM: TeamMember[] = [
  {
    id: 'team-001',
    nameBn: 'শ্রী দীপঙ্কর চন্দ্র দাস',
    nameEn: 'Sri Diponkor Chandra Das',
    designationBn: 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক',
    designationEn: 'Founder & Managing Director',
    roleCategory: 'founding',
    bioBn: 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলসের প্রধান প্রতিষ্ঠাতা। ভক্ত ও পর্যটকদের নিরাপদ, সাশ্রয়ী ও মর্যাদাপূর্ণ তীর্থযাত্রার অঙ্গীকার নিয়ে সংস্থাটি গড়ে তুলেছেন।',
    bioEn: 'Main Founder of Tirthobondhu Tour & Travels. Committed to providing safe, comfortable, and spiritually fulfilling pilgrimage journeys.',
    responsibilitiesBn: 'সার্বিক দিকনির্দেশনা, সংস্থা পরিচালনা ও গ্রাহক সেবা মান উন্নয়ন।',
    responsibilitiesEn: 'Strategic leadership, company management, and quality control.',
    avatarUrl: '',
    order: 1
  },
  {
    id: 'team-002',
    nameBn: 'শ্রী জয় কুমার দাস',
    nameEn: 'Sri Joy Kumer Das',
    designationBn: 'সহ-প্রতিষ্ঠাতা ও পরিচালক',
    designationEn: 'Co-Founder & Director',
    roleCategory: 'founding',
    bioBn: 'সংস্থার অন্যতম সহ-প্রতিষ্ঠাতা। তীর্থযাত্রীদের সুবিধা ও সমন্বয়ে নিবেদিতপ্রাণ।',
    bioEn: 'Co-founder dedicated to pilgrim welfare and operational excellence.',
    responsibilitiesBn: 'নীতি নির্ধারণ ও সাংগঠনিক সমন্বয়।',
    responsibilitiesEn: 'Policy making and organizational coordination.',
    avatarUrl: '',
    order: 2
  },
  {
    id: 'team-003',
    nameBn: 'শ্রী প্রান্ত দাস',
    nameEn: 'Sri Pranto Das',
    designationBn: 'সহ-প্রতিষ্ঠাতা ও পরিচালক',
    designationEn: 'Co-Founder & Director',
    roleCategory: 'founding',
    bioBn: 'সংস্থার সহ-প্রতিষ্ঠাতা। আধুনিক ভ্রমণ প্রযুক্তি ও গ্রাহক সন্তুষ্টিতে দক্ষ।',
    bioEn: 'Co-founder with expertise in modern travel management.',
    responsibilitiesBn: 'গ্রাহক অভিজ্ঞতা ও ভ্রমণ সমন্বয়।',
    responsibilitiesEn: 'Customer experience and travel coordination.',
    avatarUrl: '',
    order: 3
  },
  {
    id: 'team-004',
    nameBn: 'শ্রী অনিক চন্দ্র দাস',
    nameEn: 'Sri Anik Chandra Das',
    designationBn: 'সহ-প্রতিষ্ঠাতা ও পরিচালক',
    designationEn: 'Co-Founder & Director',
    roleCategory: 'founding',
    bioBn: 'সংস্থার সহ-প্রতিষ্ঠাতা। তীর্থ পরিকল্পনা ও লজিস্টিকস বিশেষজ্ঞ।',
    bioEn: 'Co-founder specializing in pilgrimage logistics and itinerary planning.',
    responsibilitiesBn: 'রুট পরিকল্পনা ও ফিল্ড লজিস্টিকস।',
    responsibilitiesEn: 'Route planning and field logistics.',
    avatarUrl: '',
    order: 4
  },
  {
    id: 'team-005',
    nameBn: 'শ্রী বিনোদ চন্দ্র দাস',
    nameEn: 'Sri Binod Chandra Das',
    designationBn: 'পরিচালক – অপারেশনস',
    designationEn: 'Director – Operations',
    roleCategory: 'director',
    bioBn: 'যাতায়াত, হোটেল ও ফিল্ড অপারেশনের প্রধান দায়িত্বে নিয়োজিত।',
    bioEn: 'Heading transport, hotel coordination, and on-ground operations.',
    responsibilitiesBn: 'যানবাহন ও আবাসন ব্যবস্থাপনা, অন-গ্রাউন্ড ট্রিপ পরিচালনা।',
    responsibilitiesEn: 'Fleet, hotel management, and on-ground tour operations.',
    avatarUrl: '',
    order: 5
  },
  {
    id: 'team-006',
    nameBn: 'শ্রী জয়ন্ত দাস',
    nameEn: 'Sri Joyanto Das',
    designationBn: 'পরিচালক – ফাইন্যান্স',
    designationEn: 'Director – Finance',
    roleCategory: 'director',
    bioBn: 'আর্থিক স্বচ্ছতা, পেমেন্ট যাচাই ও হিসাব ব্যবস্থাপনার দায়িত্বে।',
    bioEn: 'Responsible for financial management, payment verification, and transparency.',
    responsibilitiesBn: 'পেমেন্ট ভেরিফিকেশন, বাজেট অডিট ও আর্থিক প্রতিবেদন।',
    responsibilitiesEn: 'Payment verification, budget audit, and accounts.',
    avatarUrl: '',
    order: 6
  },
  {
    id: 'team-007',
    nameBn: 'শ্রী সজীব দাস',
    nameEn: 'Sri Sojib Das',
    designationBn: 'পরিচালক – মার্কেটিং',
    designationEn: 'Director – Marketing',
    roleCategory: 'director',
    bioBn: 'ব্র্যান্ড প্রচার, সোশ্যাল মিডিয়া ও জনসংযোগের দায়িত্বে।',
    bioEn: 'Managing brand promotions, public relations, and communications.',
    responsibilitiesBn: 'প্রচারণা, গ্রাহক যোগাযোগ ও অফার পরিকল্পনা।',
    responsibilitiesEn: 'Promotions, customer outreach, and campaign management.',
    avatarUrl: '',
    order: 7
  },
  {
    id: 'team-008',
    nameBn: 'শ্রীমতী লিলি রানী দাস',
    nameEn: 'Srimoti Lily Rani Das',
    designationBn: 'ব্র্যান্ড অ্যাম্বাসেডর',
    designationEn: 'Brand Ambassador',
    roleCategory: 'operational',
    bioBn: 'তীর্থে নারী ও প্রবীণ পুণ্যার্থীদের আস্থা ও সেবার প্রতীক।',
    bioEn: 'Embodying trust, care, and guidance for elderly and family pilgrims.',
    responsibilitiesBn: 'ব্র্যান্ড প্রতিনিধিত্ব, নারী ও পারিবারিক পুণ্যার্থীদের সহায়তা।',
    responsibilitiesEn: 'Brand representation, family and women pilgrim advocacy.',
    avatarUrl: '',
    order: 8
  },
  {
    id: 'team-009',
    nameBn: 'শ্রী সুরঞ্জিত চন্দ্র দাস',
    nameEn: 'Sri Suronjit Chandra Das',
    designationBn: 'ট্যুর কো-অর্ডিনেটর',
    designationEn: 'Tour Coordinator',
    roleCategory: 'operational',
    bioBn: 'সরাসরি প্রতিটি ট্রিপে যাত্রীদের সেবা, সময়সূচি ও নিরাপত্তা তত্ত্বাবধায়ক।',
    bioEn: 'Direct on-trip traveler coordinator ensuring punctual schedules and comfort.',
    responsibilitiesBn: 'ট্যুর সময়সূচি রক্ষা, সিট ও হোটেল সমন্বয়, ইমার্জেন্সি সাপোর্ট।',
    responsibilitiesEn: 'Tour scheduling, seat allocation, hotel coordination, and emergency care.',
    avatarUrl: '',
    order: 9
  },
  {
    id: 'team-010',
    nameBn: 'শ্রী দীপ্রাজ চন্দ্র দাস',
    nameEn: 'Sri Dipraj Chandra Das',
    designationBn: 'সোশ্যাল মিডিয়া ম্যানেজার',
    designationEn: 'Social Media Manager',
    roleCategory: 'operational',
    bioBn: 'ডিজিটাল উপস্থিতি, ভিডিও ও অনলাইন সাপোর্ট সমন্বয়ক।',
    bioEn: 'Handling social networks, community queries, and digital updates.',
    responsibilitiesBn: 'অফিসিয়াল ফেসবুক, টিকটক পেজ পরিচালনা ও লাইভ তথ্য আপডেট।',
    responsibilitiesEn: 'Official Facebook, TikTok management, and visual content.',
    avatarUrl: '',
    order: 10
  }
];

export const INITIAL_TEAM: TeamMember[] = FOUNDING_TEAM;

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'TIRTHA2026',
    discountType: 'percentage',
    discountValue: 5,
    minBookingAmount: 3000,
    expiryDate: '2026-12-31',
    active: true,
    descriptionBn: 'প্রথম বুকিংয়ে ৫% বিশেষ ছাড় (সর্বনিম্ন ৳৩,০০০ বুকিংয়ে)',
    descriptionEn: '5% Special Discount on bookings above BDT 3,000'
  },
  {
    code: 'PILGRIM500',
    discountType: 'fixed',
    discountValue: 500,
    minBookingAmount: 5000,
    expiryDate: '2026-11-30',
    active: true,
    descriptionBn: 'তীর্থযাত্রা প্যাকেজে সরাসরি ৳৫০০ ছাড় (সর্বনিম্ন ৳৫,০০০ বুকিংয়ে)',
    descriptionEn: 'Flat BDT 500 off on Pilgrimage packages above BDT 5,000'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-001',
    customerName: 'দেবাশীষ মুখার্জী',
    tourTitleBn: 'সীতাকুণ্ড মহাতীর্থ চন্দ্রনাথ ধাম ও বারো আউলিয়া দর্শন',
    tourTitleEn: 'Sitakunda Chandranath Temple Maha Tirtha Tour',
    travelDate: '2026-09-10',
    rating: 5,
    commentBn: 'আমার মা ও পরিবারকে নিয়ে সীতাকুণ্ড গিয়েছিলাম। বাসের সিট ব্যবস্থাপনা, বিশুদ্ধ নিরামিষ খাবার এবং গাইড সুরঞ্জিত দাদার আন্তরিকতা অত্যন্ত প্রশংসনীয়।',
    commentEn: 'Travelled with my elderly mother to Sitakunda. Seat management, pure vegetarian food, and the coordinator care were outstanding.',
    approved: true,
    createdAt: '2026-09-12'
  },
  {
    id: 'rev-002',
    customerName: 'অলোক কুমার রায়',
    tourTitleBn: 'সিলেট শ্রী চৈতন্য মহাপ্রভু ধাম ও জয়ন্তিয়া শক্তিপীঠ',
    tourTitleEn: 'Sylhet Sri Chaitanya Mahaprabhu Dham Tour',
    travelDate: '2026-09-05',
    rating: 5,
    commentBn: 'সময়নিষ্ঠতা ও স্বচ্ছতা দেখে সত্যিই মুগ্ধ হয়েছি। বিন্দুমাত্র অতিরিক্ত খরচ দাবি করেনি। তীর্থযাত্রীদের জন্য তীর্থবন্ধু ট্যুরস সেরা ভরসা।',
    commentEn: 'Impressive punctuality and zero hidden charges. Truly a reliable pilgrimage partner.',
    approved: true,
    createdAt: '2026-09-08'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-001',
    bookingId: 'TBTT-2026-00001',
    tourId: 'tb-tour-001',
    tourTitleBn: 'সীতাকুণ্ড মহাতীর্থ চন্দ্রনাথ ধাম ও বারো আউলিয়া দর্শন',
    tourTitleEn: 'Sitakunda Chandranath Temple Maha Tirtha Tour',
    destinationBn: 'সীতাকুণ্ড, চট্টগ্রাম',
    destinationEn: 'Sitakunda, Chattogram',
    travelDate: '2026-10-09',
    pickupPoint: 'মানিকনগর বিশ্বরোড (প্রধান কার্যালয়)',
    leadTravelerName: 'দেবাশীষ মুখার্জী',
    leadMobile: '01711223344',
    leadEmail: 'debashis.mukherjee@example.com',
    address: 'ওয়ারী, ঢাকা',
    emergencyContact: '01819223344',
    dietaryPreference: 'sattvic',
    specialRequirements: 'প্রবীণ যাত্রীর জন্য বাসের সামনের সারির আসন বরাদ্দ রাখা হয়েছে।',
    adultsCount: 2,
    childrenCount: 0,
    infantsCount: 0,
    selectedSeats: ['A1', 'A2'],
    travelers: [
      { id: 'tr-1', name: 'দেবাশীষ মুখার্জী', ageType: 'adult', seatNumber: 'A1', gender: 'male', checkedIn: true, checkInTime: '2026-10-09 22:45' },
      { id: 'tr-2', name: 'সুজাতা মুখার্জী', ageType: 'adult', seatNumber: 'A2', gender: 'female', checkedIn: true, checkInTime: '2026-10-09 22:45' }
    ],
    totalAmount: 7700,
    discountAmount: 385,
    finalAmount: 7315,
    couponCode: 'TIRTHA2026',
    paymentMethod: 'bKash',
    paymentNumber: '+8801960407018',
    senderMobile: '01711223344',
    transactionId: 'BK9X77A102',
    paymentStatus: 'Verified',
    bookingStatus: 'Confirmed',
    createdAt: '2026-09-12 14:30',
    verifiedAt: '2026-09-12 16:00',
    verifiedBy: 'Sri Joyanto Das (Finance)'
  },
  {
    id: 'book-002',
    bookingId: 'TBTT-2026-00002',
    tourId: 'tb-tour-002',
    tourTitleBn: 'সিলেট শ্রী চৈতন্য মহাপ্রভু ধাম ও জয়ন্তিয়া শক্তিপীঠ',
    tourTitleEn: 'Sylhet Sri Chaitanya Mahaprabhu Dham Tour',
    destinationBn: 'সিলেট ও শ্রীমঙ্গল',
    destinationEn: 'Sylhet & Sreemangal',
    travelDate: '2026-10-15',
    pickupPoint: 'মানিকনগর বিশ্বরোড (প্রধান কার্যালয়)',
    leadTravelerName: 'শান্তনু ভৌমিক',
    leadMobile: '01844556677',
    leadEmail: 'shantanu.bhowmik@example.com',
    address: 'যাত্রাবাড়ী, ঢাকা',
    emergencyContact: '01911445566',
    dietaryPreference: 'sattvic',
    specialRequirements: '',
    adultsCount: 2,
    childrenCount: 1,
    infantsCount: 0,
    selectedSeats: ['B1', 'B2', 'B3'],
    travelers: [
      { id: 'tr-3', name: 'শান্তনু ভৌমিক', ageType: 'adult', seatNumber: 'B1', gender: 'male', checkedIn: false },
      { id: 'tr-4', name: 'অরুন্ধতী ভৌমিক', ageType: 'adult', seatNumber: 'B2', gender: 'female', checkedIn: false },
      { id: 'tr-5', name: 'রৌনক ভৌমিক', ageType: 'child', seatNumber: 'B3', gender: 'male', checkedIn: false }
    ],
    totalAmount: 16900,
    discountAmount: 500,
    finalAmount: 16400,
    couponCode: 'PILGRIM500',
    paymentMethod: 'Nagad',
    paymentNumber: '+8801792666308',
    senderMobile: '01844556677',
    transactionId: 'NG77L88P43',
    paymentStatus: 'Payment Verification Pending',
    bookingStatus: 'Pending',
    createdAt: '2026-09-15 11:20'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-001',
    ticketNumber: 'TKT-2026-101',
    subject: 'সীতাকুণ্ড ট্যুরে প্রবীণ ব্যক্তির পাহাড় আরোহণে ডুলি/পালকি ব্যবস্থা',
    customerName: 'রমেশ সেন',
    customerMobile: '01733445566',
    customerEmail: 'ramesh.sen@example.com',
    bookingId: 'TBTT-2026-00001',
    status: 'Resolved',
    messages: [
      {
        sender: 'customer',
        senderName: 'রমেশ সেন',
        text: 'আমার অশীতিপর বাবার জন্য চন্দ্রনাথ পাহাড়ে ওঠার পালকি বা ডুলির আগাম ব্যবস্থা করা যাবে কি?',
        timestamp: '2026-09-13 10:15'
      },
      {
        sender: 'admin',
        senderName: 'Sri Suronjit Chandra Das (Coordinator)',
        text: 'নমস্কার। হ্যাঁ, পাহাড়ের পাদদেশে বিশ্বস্ত স্থানীয় বাহক ডুলি সমিতি রয়েছে। আমাদের গাইড ব্যক্তিগতভাবে উপস্থিত থেকে নিরাপদে ব্যবস্থা করে দেবেন।',
        timestamp: '2026-09-13 11:40'
      }
    ],
    createdAt: '2026-09-13 10:15'
  }
];

export const FAQS = [
  {
    qBn: 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলসের মাধ্যমে তীর্থযাত্রার বিশেষত্ব কী?',
    qEn: 'What makes pilgrimage with Tirthobondhu Tour & Travels special?',
    aBn: 'আমরা কেবল পর্যটন নয়, ভক্তবৃন্দের ভাবগাম্ভীর্য, ধর্মীয় আচার ও স্বাচ্ছন্দ্যকে সর্বোচ্চ অগ্রাধিকার দিই। ১০০% বিশুদ্ধ নিরামিষ/সাত্ত্বিক আহার, প্রবীণদের বিশেষ যত্ন, অভিজ্ঞ তীর্থ সমন্বয়ক এবং স্পষ্ট ও স্বচ্ছ হিসাব আমাদের প্রধান অঙ্গীকার।',
    aEn: 'We prioritize spiritual sanctity, devotional atmosphere, and personal comfort. With 100% pure vegetarian/sattvic meals, elderly assistance, verified itineraries, and zero hidden costs.'
  },
  {
    qBn: 'বিকাশ বা নগদে পেমেন্ট করার পর বুকিং কীভাবে নিশ্চিত হবে?',
    qEn: 'How is booking confirmed after bKash or Nagad payment?',
    aBn: 'আমাদের অফিশিয়াল নম্বরে Send Money করার পর ট্রানজেকশন আইডি (TrxID) দিয়ে বুকিং সাবমিট করুন। আমাদের অ্যাকাউন্টস টিম ট্রানজেকশন ভেরিফাই করার সাথে সাথেই আপনার স্ট্যাটাস "Confirmed" হয়ে যাবে এবং আপনি ডিজিটাল ট্রাভেল পাস ও ইনভয়েস ডাউনলোড করতে পারবেন।',
    aEn: 'Send Money to our official number, enter your TrxID during checkout. Our finance team verifies it, confirming your booking immediately with Digital Travel Pass & QR receipt.'
  },
  {
    qBn: 'যাত্রীদের আসন (Seat) কীভাবে নির্ধারণ করা হয়?',
    qEn: 'How are bus seats selected and reserved?',
    aBn: 'বুকিং করার সময়ই আপনি বাসের লাইভ সিট প্ল্যান থেকে আপনার এবং আপনার পরিবারের পছন্দসই আসন নির্বাচন করতে পারবেন। প্রবীণ ও নারীদের জন্য সামনের সারির আসন অগ্রাধিকার দেওয়া হয়।',
    aEn: 'During booking, you can choose specific seats from our interactive coach layout. Front rows are prioritized for elderly and women pilgrims.'
  },
  {
    qBn: 'ট্যুর বাতিল করলে রিফান্ড নীতি কী?',
    qEn: 'What is the tour cancellation and refund policy?',
    aBn: 'যাত্রা শুরুর ১৫+ দিন আগে বাতিলে ৯০% পর্যন্ত রিফান্ড, ৭-১৪ দিন আগে ৭৫% পর্যন্ত, ৩-৬ দিন আগে ৫০% পর্যন্ত। ৩ দিনের কম সময়ে সাধারণত কোনো রিফান্ড প্রযোজ্য নয়। সংস্থা কর্তৃক ট্যুর বাতিল হলে ১০০% সম্পূর্ণ রিফান্ড অথবা বিকল্প ট্যুর প্রদান করা হয়।',
    aEn: '15+ days before departure: up to 90% refund; 7-14 days: up to 75%; 3-6 days: up to 50%; under 3 days: no refund. If cancelled by the company, 100% full refund or alternative tour is guaranteed.'
  },
  {
    qBn: 'ভারতের কাশী বা আন্তর্জাতিক তীর্থযাত্রার ক্ষেত্রে ভিসা কীভাবে করা হয়?',
    qEn: 'How is visa handled for India Kashi or international pilgrimage?',
    aBn: 'আমরা যাত্রীদের ভিসা আবেদনের সঠিক কাগজপত্র, রুট ও ইনভাইটেশন গাইডলাইন প্রদান করি। তবে মনে রাখবেন ভিসা মঞ্জুর সম্পূর্ণ সংশ্লিষ্ট দূতাবাসের নিজস্ব এখতিয়ার, কোনো অবস্থাতেই মিথ্যা প্রতিশ্রুতি প্রদান করা হয় না।',
    aEn: 'We provide authentic visa documentation guidance and tour itinerary support. Visa approval remains solely at the discretion of the respective High Commission/Embassy.'
  }
];

export const BLOG_POSTS = [
  {
    id: 'blog-001',
    titleBn: 'চন্দ্রনাথ তীর্থযাত্রায় যাওয়ার প্রস্তুতি ও পুণ্যার্থীদের প্রয়োজনীয় সতর্কতা',
    titleEn: 'Preparation & Sacred Guidelines for Chandranath Dham Pilgrimage',
    category: 'Pilgrimage',
    date: '2026-09-14',
    readTimeBn: '৪ মিনিট পাঠ',
    readTimeEn: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    summaryBn: 'পাহাড়ে ওঠার আগে সঠিক জুতা নির্বাচন, হালকা পোশাক, পানির বোতল ও মানসিক প্রস্তুতির বিশদ গাইড।',
    summaryEn: 'Detailed guide on trekking shoes, light luggage, hydration, and devotional decorum for Chandranath hill.'
  },
  {
    id: 'blog-002',
    titleBn: 'দ্বাদশ জ্যোতির্লিঙ্গ শ্রী কাশী বিশ্বনাথ দর্শনের তাৎপর্য ও মাহাত্ম্য',
    titleEn: 'Spiritual Glory of Kashi Vishwanath Jyotirlinga & Ganga Aarti',
    category: 'Religious Travel',
    date: '2026-09-11',
    readTimeBn: '৬ মিনিট পাঠ',
    readTimeEn: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    summaryBn: 'বারাণসীতে মা গঙ্গার তীরবর্তী কাশী বিশ্বনাথ ধামের আধ্যাত্মিক ঐতিহ্য ও ভক্তিভাবের ইতিহাস।',
    summaryEn: 'The eternal spiritual heritage of holy Varanasi, sacred Ghats, and the grand Jyotirlinga shrine.'
  }
];
