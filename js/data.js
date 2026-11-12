/* ==========================================================================
   EmberBite — Catalog & Menu Data
   Pure Vanilla ES6 Module • Zero External Dependencies
   ========================================================================== */

const EMBER_DATA = {
  categories: [
    { id: 'all', name: 'Full Menu' },
    { id: 'burgers', name: 'Flame Burgers' },
    { id: 'chicken', name: 'Crispy Fried Chicken' },
    { id: 'pizzas', name: 'Wood-Fired Pizzas' },
    { id: 'sides', name: 'Loaded Fries & Sides' },
    { id: 'shakes', name: 'Shakes & Drinks' }
  ],

  items: [
    {
      id: 'flame-craft-burger',
      name: 'Smoky Ember Double Smash Burger',
      category: 'burgers',
      categoryLabel: 'Flame Burgers',
      basePrice: 15.50,
      description: 'Two 100% Angus patties smashed with caramelized onions, double American cheddar melt, crispy bacon, dill pickles, and house secret Ember sauce on a toasted brioche bun.',
      image: 'assets/images/burger-flame-double.png',
      badge: 'Bestseller',
      badgeType: 'ember',
      spicy: false,
      vegetarian: false,
      rating: 4.9,
      calories: '890 cal',
      allergens: ['Wheat', 'Dairy', 'Eggs'],
      sizes: [
        { id: 'single', name: 'Single 1/4 lb', extra: 0 },
        { id: 'double', name: 'Double Stack 1/2 lb', extra: 3.50 },
        { id: 'triple', name: 'Triple Monster 3/4 lb', extra: 6.50 }
      ],
      crusts: [
        'Artisan Toasted Brioche Bun',
        'Golden Toasted Potato Bun',
        'Gluten-Free Seeded Bun',
        'Crisp Lettuce Wrap'
      ],
      toppings: [
        { id: 'extra-cheese', name: 'Extra Liquid Cheddar Melt', price: 1.50 },
        { id: 'extra-bacon', name: 'Crispy Applewood Bacon Strips', price: 2.50 },
        { id: 'jalapeno', name: 'Charred Pickled Jalapeños', price: 1.25 },
        { id: 'fried-egg', name: 'Sunny Organic Farm Egg', price: 1.75 },
        { id: 'grilled-onions', name: 'Extra Caramelized Butter Onions', price: 1.25 }
      ]
    },
    {
      id: 'crispy-fire-chicken',
      name: 'Nashville Hot & Crispy Fried Chicken',
      category: 'chicken',
      categoryLabel: 'Crispy Fried Chicken',
      basePrice: 14.50,
      description: 'Buttermilk-brined fresh chicken fried to golden shatter-crunch, dusted with cayenne hot honey spices, served with dill pickles, house garlic ranch, and smoky glaze.',
      image: 'assets/images/fried-chicken-crispy.png',
      badge: 'Crowd Favorite',
      badgeType: 'ember',
      spicy: true,
      vegetarian: false,
      rating: 4.9,
      calories: '790 cal',
      allergens: ['Wheat', 'Dairy'],
      sizes: [
        { id: '4piece', name: '4-Piece Box (Tenders & Drumsticks)', extra: 0 },
        { id: '8piece', name: '8-Piece Family Box', extra: 9.00 },
        { id: '12piece', name: '12-Piece Party Bucket', extra: 16.00 }
      ],
      crusts: [
        'Southern Golden Crunch (Mild)',
        'Nashville Hot Cayenne (Spicy)',
        'Ember Ghost Fire (Extra Hot)'
      ],
      toppings: [
        { id: 'ranch-dip', name: 'House Smoky Garlic Ranch Dip', price: 1.25 },
        { id: 'hot-honey-glaze', name: 'Warm Hot Honey Drizzle Cup', price: 1.50 },
        { id: 'honey-mustard', name: 'Tangy Fire Honey Mustard', price: 1.00 },
        { id: 'extra-pickles', name: 'Side of Thick Crinkle Pickles', price: 1.00 }
      ]
    },
    {
      id: 'combo-feast-box',
      name: 'The Ultimate Ember Fast Combo',
      category: 'burgers',
      categoryLabel: 'Combo Deals',
      basePrice: 19.50,
      description: 'Double Flame Smash Burger, 2 Jumbo Crispy Chicken Tenders, seasoned golden french fries, house dipping sauces, and a chilled beverage or thick craft shake.',
      image: 'assets/images/combo-feast-box.png',
      badge: 'Best Value',
      badgeType: 'olive',
      spicy: false,
      vegetarian: false,
      rating: 5.0,
      calories: '1,280 cal',
      allergens: ['Wheat', 'Dairy', 'Eggs'],
      sizes: [
        { id: 'standard', name: 'Standard Combo (Fries + Soda)', extra: 0 },
        { id: 'monster', name: 'Monster Combo (Loaded Fries + Shake)', extra: 4.50 }
      ],
      crusts: [
        'Includes Seasoned Crinkle Fries & Chilled Soda',
        'Upgrade to Loaded Cheese Fries & Craft Shake'
      ],
      toppings: [
        { id: 'add-bacon', name: 'Add Applewood Bacon to Burger', price: 2.50 },
        { id: 'extra-tender', name: 'Add Extra Crispy Tender', price: 2.75 },
        { id: 'sauce-duo', name: 'Extra Dipping Sauce Duo', price: 1.50 }
      ]
    },
    {
      id: 'loaded-ember-fries',
      name: 'Smoky Loaded Cheese & Bacon Fries',
      category: 'sides',
      categoryLabel: 'Loaded Fries & Sides',
      basePrice: 8.50,
      description: 'Crisp seasoned skin-on french fries blanketed with warm melted cheddar sauce, applewood bacon crumbles, scallions, and signature smoky ember drizzle.',
      image: 'assets/images/loaded-ember-fries.png',
      badge: 'Must Try',
      badgeType: 'honey',
      spicy: false,
      vegetarian: false,
      rating: 4.9,
      calories: '580 cal',
      allergens: ['Dairy'],
      sizes: [
        { id: 'regular', name: 'Regular Share Basket', extra: 0 },
        { id: 'mega', name: 'Mega Skillet Feast', extra: 4.50 }
      ],
      crusts: [
        'Signature Seasoned Salt',
        'Cajun Fire Pepper Dust',
        'Truffle Parmesan Dust'
      ],
      toppings: [
        { id: 'extra-cheese-melt', name: 'Extra Warm Cheddar Melt', price: 1.75 },
        { id: 'extra-bacon-bits', name: 'Double Bacon Crumbles', price: 2.00 },
        { id: 'sliced-jalapenos', name: 'Charred Sliced Jalapeños', price: 1.25 },
        { id: 'ember-aioli', name: 'Smoky Chipotle Ember Aioli', price: 1.00 }
      ]
    },
    {
      id: 'hot-honey-amore',
      name: 'Charred Pepperoni Hot Honey Pizza',
      category: 'pizzas',
      categoryLabel: 'Wood-Fired Pizza',
      basePrice: 21.00,
      description: 'Crispy cupped pepperoni, San Marzano tomato sauce, fresh smoked mozzarella, and our signature charred chili hot honey drizzle on 48h sourdough crust.',
      image: 'assets/images/pizza-hot-honey-card.png',
      badge: 'Flame Baked',
      badgeType: 'ember',
      spicy: true,
      vegetarian: false,
      rating: 4.9,
      calories: '980 cal',
      allergens: ['Wheat', 'Dairy'],
      sizes: [
        { id: 'personal', name: 'Personal 10"', extra: 0 },
        { id: 'medium', name: 'Medium 12"', extra: 4.00 },
        { id: 'large', name: 'Large 14"', extra: 8.00 }
      ],
      crusts: [
        'Classic Wood-Fired Neapolitan',
        'Thin & Charred Crispy',
        'Garlic Butter Stuffed Crust'
      ],
      toppings: [
        { id: 'extra-cheese', name: 'Smoked Buffalo Mozzarella', price: 2.50 },
        { id: 'extra-honey', name: 'Extra Hot Honey Drizzle Cup', price: 1.50 },
        { id: 'calabrian-chili', name: 'Charred Calabrian Chilies', price: 1.75 },
        { id: 'crispy-pepperoni', name: 'Double Cupped Pepperoni', price: 3.00 }
      ]
    },
    {
      id: 'shake-thick-oreo',
      name: 'Velvet Oreo & Fudge Thick Shake',
      category: 'shakes',
      categoryLabel: 'Shakes & Drinks',
      basePrice: 7.50,
      description: 'Hand-spun rich vanilla custard blended with real Oreo cookies, dark chocolate fudge drizzle, fluffy whipped cream, and cookie crumbles.',
      image: 'assets/images/shake-thick-oreo.png',
      badge: 'Sweet Finish',
      badgeType: 'honey',
      spicy: false,
      vegetarian: true,
      rating: 4.9,
      calories: '520 cal',
      allergens: ['Dairy', 'Wheat'],
      sizes: [
        { id: 'regular', name: 'Regular 16oz', extra: 0 },
        { id: 'mega', name: 'Mega 24oz', extra: 2.50 }
      ],
      crusts: [
        'Classic Oreo & Dark Fudge',
        'Salted Caramel Pretzel',
        'Wild Strawberry Cream'
      ],
      toppings: [
        { id: 'extra-whipped', name: 'Extra Whipped Cream & Cherry', price: 0.75 },
        { id: 'extra-oreo', name: 'Double Oreo Cookie Crumbs', price: 1.00 },
        { id: 'espresso-shot', name: 'Fresh Espresso Shot Booster', price: 1.50 }
      ]
    },
    {
      id: 'margherita-classica',
      name: 'Classica Margherita DOP Pizza',
      category: 'pizzas',
      categoryLabel: 'Wood-Fired Pizza',
      basePrice: 18.50,
      description: 'Crushed San Marzano tomatoes, fresh fior di latte mozzarella, fresh fragrant basil, flaked sea salt, and extra virgin olive oil.',
      image: 'assets/images/pizza-margherita-card.png',
      badge: 'Heritage',
      badgeType: 'olive',
      spicy: false,
      vegetarian: true,
      rating: 4.8,
      calories: '820 cal',
      allergens: ['Wheat', 'Dairy'],
      sizes: [
        { id: 'personal', name: 'Personal 10"', extra: 0 },
        { id: 'medium', name: 'Medium 12"', extra: 4.00 },
        { id: 'large', name: 'Large 14"', extra: 8.00 }
      ],
      crusts: [
        'Classic Wood-Fired Neapolitan',
        'Thin & Charred Crispy',
        'Garlic Butter Stuffed Crust'
      ],
      toppings: [
        { id: 'extra-basil', name: 'Extra Fresh Basil & Burrata', price: 3.50 },
        { id: 'truffle-oil', name: 'White Truffle Oil Drizzle', price: 2.50 },
        { id: 'roasted-garlic', name: 'Confit Roasted Garlic', price: 1.50 }
      ]
    },
    {
      id: 'charred-garlic-knots',
      name: 'Charred Herb Garlic Knots',
      category: 'sides',
      categoryLabel: 'Loaded Fries & Sides',
      basePrice: 8.50,
      description: 'Hand-tied dough baked in high heat, tossed in garlic confit butter, Parmigiano Reggiano, and fresh parsley with warm marinara dip.',
      image: 'assets/images/pairing-garlic-knots.png',
      badge: 'Snack Bites',
      badgeType: 'ember',
      spicy: false,
      vegetarian: true,
      rating: 4.9,
      calories: '420 cal',
      allergens: ['Wheat', 'Dairy'],
      sizes: [
        { id: 'regular', name: 'Half Dozen (6)', extra: 0 },
        { id: 'bakers-dozen', name: 'Baker\'s Dozen (13)', extra: 5.00 }
      ],
      crusts: ['Fresh Baked Daily'],
      toppings: [
        { id: 'extra-marinara', name: 'Extra San Marzano Marinara', price: 1.50 },
        { id: 'spicy-ranch', name: 'Smoky Calabrian Ranch', price: 1.75 }
      ]
    }
  ],

  deals: [
    {
      code: 'EMBER20',
      title: '20% Off Weekend Feast',
      discount: 20,
      minOrder: 35,
      desc: 'Get 20% off your entire order on orders over $35. Valid on flame smash burgers, fried chicken, loaded fries & pizzas.',
      badge: 'Trending Deal'
    },
    {
      code: 'COMBO15',
      title: '$15 Burger & Chicken Duo',
      discount: 15,
      minOrder: 25,
      desc: 'Pair our Double Smash Burger with Crispy Chicken Tenders for an exclusive fast-food duo price.',
      badge: 'Fast Combo'
    },
    {
      code: 'FREEFRIES',
      title: 'Free Loaded Fries on $25+',
      discount: 8.50,
      minOrder: 25,
      desc: 'Add a full order of Smoky Loaded Cheese & Bacon Fries to any order above $25 completely free.',
      badge: 'House Special'
    }
  ],

  reviews: [
    {
      name: 'Rachel Kim',
      role: 'Carroll Gardens Regular',
      rating: 5,
      text: 'The double smash burger has the crispiest lacy edges in the neighborhood, and the hot honey tenders hold their crunch even on delivery.',
      date: '2 days ago'
    },
    {
      name: 'David Thorne',
      role: 'Verified Order',
      rating: 5,
      text: 'Our Friday family go-to. The loaded bacon fries and tenders arrived hot within 25 minutes, and the wood-fired pepperoni slice is top tier.',
      date: '1 week ago'
    },
    {
      name: 'Julian Rossi',
      role: 'Dine-in Customer',
      rating: 5,
      text: 'Having proper high-heat smash burgers and blistered sourdough pizza coming out of the same kitchen makes Friday dinner easy for everyone.',
      date: '2 weeks ago'
    }
  ],

  locations: [
    {
      name: 'Carroll Gardens Flagship',
      address: '182 DeGraw Street, Brooklyn, NY 11231',
      phone: '(718) 555-0192',
      hours: 'Mon–Sun: 11:30 AM – 11:00 PM',
      status: 'Open for Dine-In, Takeout & Express Delivery'
    },
    {
      name: 'West Village Outpost',
      address: '414 Hudson Street, New York, NY 10014',
      phone: '(212) 555-0148',
      hours: 'Tue–Sun: 11:30 AM – 11:30 PM',
      status: 'Open for Counter Pickup & Takeout'
    }
  ]
};

// Export to window for vanilla JS accessibility
window.EMBER_DATA = EMBER_DATA;
